#!/usr/bin/env python3
"""Crop tiles from the locked final art set. No new cat faces.

Portraits are tight PNG cutouts, never downscaled, LANCZOS-upscaled so the
long side is at least 1400px. Squares sit on cream with the subject centered.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/public/assets")
OUT = ROOT / "crops"
CREAM = (245, 238, 230)
MIN_LONG = 1400
MIN_SQUARE = 1200


def box(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def upscale_min_long(im: Image.Image, minimum: int = MIN_LONG) -> Image.Image:
    w, h = im.size
    long = max(w, h)
    if long >= minimum:
        return im
    scale = minimum / long
    return im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.Resampling.LANCZOS)


def save_png(im: Image.Image, name: str) -> None:
    dest = OUT / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert("RGB")
    rgb.save(dest, "PNG", optimize=True)
    print(f"  {name:28} {rgb.size[0]}x{rgb.size[1]} png")


def save_jpg(im: Image.Image, name: str) -> None:
    dest = OUT / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert("RGB")
    rgb.save(dest, "JPEG", quality=95, subsampling=0, optimize=True)
    print(f"  {name:28} {rgb.size[0]}x{rgb.size[1]} jpg95")


def portrait_34(im: Image.Image, fill: tuple[int, int, int] = CREAM) -> Image.Image:
    """Bake a 3:4 frame: full cat visible, face toward the top, cream sides."""
    subject = upscale_min_long(im, MIN_LONG)
    sw, sh = subject.size
    height = 1400
    width = int(height * 3 / 4)
    canvas = Image.new("RGB", (width, height), fill)
    pad_x, pad_y = int(width * 0.07), int(height * 0.05)
    scale = min((width - pad_x * 2) / sw, (height - pad_y * 2) / sh)
    nw, nh = max(1, round(sw * scale)), max(1, round(sh * scale))
    subject = subject.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (width - nw) // 2
    y = pad_y
    if y + nh > height - pad_y:
        y = height - nh - pad_y
    canvas.paste(subject, (x, y))
    return canvas


def square_pad(im: Image.Image, fill: tuple[int, int, int] = CREAM, face_bias: float = 0.12) -> Image.Image:
    """Center the subject on cream. Extra headroom so ears stay inside a square tile."""
    w, h = im.size
    pad = int(max(w, h) * 0.10)
    inner_w, inner_h = w + pad * 2, h + pad * 2
    side = max(inner_w, inner_h)
    canvas = Image.new("RGB", (side, side), fill)
    x = (side - w) // 2
    y = max(pad, int((side - h) * (0.5 - face_bias)))
    y = min(y, side - h - pad) if side - h > pad * 2 else (side - h) // 2
    canvas.paste(im, (x, y))
    return upscale_min_long(canvas, MIN_SQUARE)


def crop_row(
    im: Image.Image,
    y0: float,
    y1: float,
    count: int,
    names: list[str],
    x0: float = 0.04,
    x1: float = 0.96,
    inset: float = 0.012,
    face_bias: float = 0.12,
) -> None:
    span = x1 - x0
    for i, name in enumerate(names):
        l = x0 + span * (i / count)
        r = x0 + span * ((i + 1) / count)
        cell = box(im, l + inset, y0, r - inset, y1)
        tile = square_pad(cell, face_bias=face_bias)
        if name.endswith(".png"):
            save_png(tile, name)
        else:
            save_jpg(tile, name)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    shaoye = Image.open(ROOT / "shaoye-sheet.png")
    keli = Image.open(ROOT / "keli-sheet.png")
    duo = Image.open(ROOT / "duo-hero.png")

    # Tight sitting-cat windows, then bake true 3:4 PNGs so CSS cover cannot clip faces.
    save_png(portrait_34(box(shaoye, 0.392, 0.060, 0.662, 0.490)), "shaoye-portrait.png")
    save_png(portrait_34(box(keli, 0.400, 0.058, 0.638, 0.490)), "keli-portrait.png")
    save_png(upscale_min_long(box(duo, 0.248, 0.088, 0.718, 0.428)), "duo-pair.png")

    save_jpg(square_pad(box(shaoye, 0.80, 0.085, 0.985, 0.275), face_bias=0.08), "shaoye-side.jpg")
    save_jpg(square_pad(box(shaoye, 0.80, 0.305, 0.985, 0.475), face_bias=0.04), "shaoye-back.jpg")
    save_jpg(square_pad(box(keli, 0.80, 0.085, 0.985, 0.275), face_bias=0.08), "keli-side.jpg")
    save_jpg(square_pad(box(keli, 0.80, 0.305, 0.985, 0.475), face_bias=0.04), "keli-back.jpg")

    crop_row(
        shaoye,
        0.518,
        0.648,
        5,
        [
            "expr-shaoye-aloof.jpg",
            "expr-shaoye-wonder.jpg",
            "expr-shaoye-blank.jpg",
            "expr-shaoye-happy.jpg",
            "expr-shaoye-glance.jpg",
        ],
        inset=0.014,
        face_bias=0.16,
    )
    crop_row(
        shaoye,
        0.698,
        0.820,
        4,
        [
            "pose-shaoye-stand.jpg",
            "pose-shaoye-walk.jpg",
            "pose-shaoye-loaf.jpg",
            "pose-shaoye-sleep.jpg",
        ],
        inset=0.010,
        face_bias=0.10,
    )

    crop_row(
        keli,
        0.518,
        0.648,
        5,
        [
            "expr-keli-curious.jpg",
            "expr-keli-shy.jpg",
            "expr-keli-joy.jpg",
            "expr-keli-wink.jpg",
            "expr-keli-soft.jpg",
        ],
        inset=0.014,
        face_bias=0.16,
    )
    crop_row(
        keli,
        0.698,
        0.820,
        5,
        [
            "pose-keli-loaf.jpg",
            "pose-keli-belly.jpg",
            "pose-keli-sit.jpg",
            "pose-keli-play.jpg",
            "pose-keli-sleep.jpg",
        ],
        inset=0.010,
        face_bias=0.10,
    )

    crop_row(
        duo,
        0.638,
        0.778,
        5,
        [
            "story-aloof.png",
            "story-shy.png",
            "story-loaf.png",
            "story-glance.png",
            "story-happy.png",
        ],
        x0=0.015,
        x1=0.985,
        inset=0.004,
        face_bias=0.10,
    )
    crop_row(
        duo,
        0.805,
        0.955,
        4,
        [
            "story-sleep.png",
            "story-hide.png",
            "story-bed.png",
            "story-world.png",
        ],
        x0=0.015,
        x1=0.785,
        inset=0.004,
        face_bias=0.08,
    )
    print("done")


if __name__ == "__main__":
    main()
