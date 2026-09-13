#!/usr/bin/env python3
"""Compose social PNGs from the locked sheets / hero. No AI redraw."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/public/assets")
SOCIAL = ROOT / "social"
CROPS = ROOT / "crops"
CREAM = (245, 238, 230)

# Instagram export sizes
IG_PORTRAIT = (1080, 1350)  # 4:5
IG_SQUARE = (1080, 1080)
IG_STORY = (1080, 1920)  # 9:16
CUTOUT = (1050, 1400)  # 3:4


def box(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def fit_on_cream(im: Image.Image, size: tuple[int, int], y_bias: float = 0.5) -> Image.Image:
    canvas = Image.new("RGB", size, CREAM)
    tw, th = size
    sw, sh = im.size
    scale = min((tw * 0.90) / sw, (th * 0.90) / sh)
    nw, nh = max(1, round(sw * scale)), max(1, round(sh * scale))
    placed = im.convert("RGB").resize((nw, nh), Image.Resampling.LANCZOS)
    x = (tw - nw) // 2
    y = int((th - nh) * y_bias)
    y = max(int(th * 0.04), min(y, th - nh - int(th * 0.04)))
    canvas.paste(placed, (x, y))
    return canvas


def portrait_34(im: Image.Image) -> Image.Image:
    subject = im.convert("RGB")
    sw, sh = subject.size
    tw, th = CUTOUT
    if max(sw, sh) < th:
        scale = th / max(sw, sh)
        subject = subject.resize((max(1, round(sw * scale)), max(1, round(sh * scale))), Image.Resampling.LANCZOS)
        sw, sh = subject.size
    canvas = Image.new("RGB", (tw, th), CREAM)
    pad_x, pad_y = int(tw * 0.07), int(th * 0.05)
    scale = min((tw - pad_x * 2) / sw, (th - pad_y * 2) / sh)
    nw, nh = max(1, round(sw * scale)), max(1, round(sh * scale))
    subject = subject.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (tw - nw) // 2
    y = pad_y
    if y + nh > th - pad_y:
        y = th - nh - pad_y
    canvas.paste(subject, (x, y))
    return canvas


def save(im: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert("RGB")
    rgb.save(dest, "PNG", optimize=True)
    print(f"  {dest.relative_to(ROOT)}  {rgb.size[0]}x{rgb.size[1]}")


def main() -> None:
    SOCIAL.mkdir(parents=True, exist_ok=True)
    shaoye = Image.open(ROOT / "shaoye-sheet.png")
    keli = Image.open(ROOT / "keli-sheet.png")
    duo = Image.open(ROOT / "duo-hero.png")

    cut_s = portrait_34(box(shaoye, 0.392, 0.060, 0.662, 0.490))
    cut_k = portrait_34(box(keli, 0.400, 0.058, 0.638, 0.490))
    pair = box(duo, 0.248, 0.088, 0.718, 0.428)

    save(cut_s, SOCIAL / "cutout-shaoye-3x4.png")
    save(cut_k, SOCIAL / "cutout-keli-3x4.png")
    # Web portraits are the same 3:4 cutouts.
    save(cut_s, CROPS / "shaoye-portrait.png")
    save(cut_k, CROPS / "keli-portrait.png")

    save(fit_on_cream(cut_s, IG_PORTRAIT, y_bias=0.35), SOCIAL / "ig-portrait-shaoye.png")
    save(fit_on_cream(cut_k, IG_PORTRAIT, y_bias=0.35), SOCIAL / "ig-portrait-keli.png")
    save(fit_on_cream(pair, IG_SQUARE, y_bias=0.48), SOCIAL / "ig-square-duo.png")
    save(fit_on_cream(pair, IG_STORY, y_bias=0.38), SOCIAL / "ig-story-duo.png")
    print("done")


if __name__ == "__main__":
    main()
