#!/usr/bin/env python3
"""Crop stylized brand assets from setting-sheet / pose-sheet extracts.

Does not copy real-life cat photos onto the site.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

ART = Path("/opt/cursor/artifacts/assets")
OUT = Path("/workspace/public/assets")
CROPS = OUT / "crops"
SOURCE = OUT / "source"


def ensure_dirs() -> None:
    for p in (CROPS, SOURCE):
        p.mkdir(parents=True, exist_ok=True)


def save(im: Image.Image, dest: Path, quality: int = 90) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    im = im.convert("RGB")
    if dest.suffix.lower() in {".jpg", ".jpeg"}:
        im.save(dest, "JPEG", quality=quality, optimize=True)
    else:
        im.save(dest, "PNG", optimize=True)
    print(f"  {dest.relative_to(OUT)}  {im.size[0]}x{im.size[1]}")


def frac_box(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def trim_near_bg(im: Image.Image, pad: float = 0.10, threshold: int = 18) -> Image.Image:
    """Trim near-uniform light background, keep padding around the subject."""
    rgb = im.convert("RGB")
    corners = [
        rgb.getpixel((2, 2)),
        rgb.getpixel((rgb.size[0] - 3, 2)),
        rgb.getpixel((2, rgb.size[1] - 3)),
        rgb.getpixel((rgb.size[0] - 3, rgb.size[1] - 3)),
    ]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
    mask = Image.new("L", rgb.size, 0)
    px = rgb.load()
    mx = mask.load()
    w, h = rgb.size
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            dist = abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2])
            if dist > threshold * 3:
                mx[x, y] = 255
    bbox = mask.getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    pw = int((x1 - x0) * pad)
    ph = int((y1 - y0) * pad)
    x0 = max(0, x0 - pw)
    y0 = max(0, y0 - ph)
    x1 = min(w, x1 + pw)
    y1 = min(h, y1 + ph)
    return im.crop((x0, y0, x1, y1))


def square_on_cream(im: Image.Image, size: int = 900, cream: tuple[int, int, int] = (247, 241, 232)) -> Image.Image:
    subject = trim_near_bg(im, pad=0.08, threshold=14)
    sw, sh = subject.size
    scale = min((size - 36) / max(sw, 1), (size - 36) / max(sh, 1))
    subject = subject.resize((max(1, int(sw * scale)), max(1, int(sh * scale))), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (size, size), cream)
    x = (size - subject.size[0]) // 2
    y = (size - subject.size[1]) // 2
    canvas.paste(subject, (x, y))
    return canvas


def split_row(im: Image.Image, count: int, y0: float, y1: float, inset: float = 0.012) -> list[Image.Image]:
    w, h = im.size
    band = im.crop((0, int(h * y0), w, int(h * y1)))
    bw, bh = band.size
    out: list[Image.Image] = []
    for i in range(count):
        x0 = int(bw * (i / count + inset))
        x1 = int(bw * ((i + 1) / count - inset))
        cell = band.crop((x0, 0, x1, bh))
        out.append(cell)
    return out


def copy_source(name: str, dest_name: str | None = None) -> None:
    src = ART / name
    dest = SOURCE / (dest_name or name)
    dest.write_bytes(src.read_bytes())
    print(f"  source/{dest.name}  {dest.stat().st_size} bytes")


def crop_pose_sheet(filename: str, prefix: str) -> None:
    im = Image.open(ART / filename)
    w, h = im.size
    # inset each quadrant so neighboring poses do not leak in
    quads = {
        "sit": (int(w * 0.04), int(h * 0.02), int(w * 0.46), int(h * 0.48)),
        "stand": (int(w * 0.50), int(h * 0.04), int(w * 0.98), int(h * 0.48)),
        "sit34": (int(w * 0.04), int(h * 0.52), int(w * 0.46), int(h * 0.98)),
        "walk": (int(w * 0.50), int(h * 0.52), int(w * 0.98), int(h * 0.98)),
    }
    for key, box in quads.items():
        cell = im.crop(box)
        save(square_on_cream(cell), CROPS / f"{prefix}-{key}.jpg")
        fw, fh = cell.size
        head = cell.crop((int(fw * 0.18), int(fh * 0.00), int(fw * 0.82), int(fh * 0.58)))
        save(square_on_cream(head, 720), CROPS / f"{prefix}-face-{key}.jpg")


def crop_hero() -> None:
    im = Image.open(ART / "crop-hero-duo.png")
    save(im, CROPS / "hero-duo.jpg", quality=92)
    # split the pair for interactive hero / easter egg
    save(square_on_cream(frac_box(im, 0.00, 0.12, 0.55, 0.98)), CROPS / "hero-shaoye.jpg")
    save(square_on_cream(frac_box(im, 0.45, 0.22, 1.00, 0.98)), CROPS / "hero-keli.jpg")


def crop_expressions() -> None:
    im = Image.open(ART / "crop-expr-row.png")
    names = [
        "shaoye-aloof",
        "shaoye-tsundere",
        "shaoye-happy",
        "keli-together",
        "keli-joy",
        "keli-shy",
    ]
    for name, cell in zip(names, split_row(im, 6, 0.08, 0.96, 0.008)):
        save(square_on_cream(cell, 720), CROPS / f"expr-{name}.jpg")


def crop_stories() -> None:
    im = Image.open(ART / "crop-stories-row.png")
    names = ["work", "glance", "sleep", "home"]
    for name, cell in zip(names, split_row(im, 4, 0.10, 0.96, 0.01)):
        save(cell, CROPS / f"story-{name}.jpg")


def crop_merch() -> None:
    im = Image.open(ART / "crop-merch-row.png")
    # products sit in the vertical middle; x ranges from the generated row
    regions = {
        "plush": (0.00, 0.18, 0.24, 0.88),
        "stand": (0.22, 0.16, 0.44, 0.88),
        "mug": (0.42, 0.22, 0.62, 0.86),
        "tote": (0.60, 0.12, 0.80, 0.90),
        "phone": (0.78, 0.16, 1.00, 0.88),
    }
    for name, box in regions.items():
        save(square_on_cream(frac_box(im, *box), 900), CROPS / f"merch-{name}.jpg")


def composite_together() -> None:
    """Place the two hero crops close together for the easter-egg moment."""
    left = Image.open(CROPS / "hero-shaoye.jpg")
    right = Image.open(CROPS / "hero-keli.jpg")
    cream = (247, 241, 232)
    canvas = Image.new("RGB", (1400, 900), cream)
    left = left.resize((720, 720), Image.Resampling.LANCZOS)
    right = right.resize((640, 640), Image.Resampling.LANCZOS)
    canvas.paste(left, (40, 120))
    canvas.paste(right, (700, 200))
    canvas = canvas.filter(ImageFilter.SMOOTH_MORE)
    save(canvas, CROPS / "together.jpg", quality=92)


def main() -> None:
    ensure_dirs()
    print("source")
    for name in (
        "crop-hero-duo.png",
        "crop-expr-row.png",
        "crop-stories-row.png",
        "crop-merch-row.png",
        "ref-poses-1.png",
        "ref-poses-2.png",
    ):
        copy_source(name)

    print("pose sheets")
    crop_pose_sheet("ref-poses-2.png", "shaoye")
    crop_pose_sheet("ref-poses-1.png", "keli")

    print("hero / expressions / stories / merch")
    crop_hero()
    crop_expressions()
    crop_stories()
    crop_merch()

    print("together composite")
    composite_together()
    print("done")


if __name__ == "__main__":
    main()
