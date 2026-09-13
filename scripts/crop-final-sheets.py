#!/usr/bin/env python3
"""Crop tiles from the locked final art set. No new cat faces."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/public/assets")
OUT = ROOT / "crops"
CREAM = (245, 239, 230)


def box(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def save(im: Image.Image, name: str) -> None:
    dest = OUT / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert("RGB")
    rgb.save(dest, "JPEG", quality=90, optimize=True)
    print(f"  {name:28} {rgb.size[0]}x{rgb.size[1]}")


def square_pad(im: Image.Image, fill: tuple[int, int, int] = CREAM) -> Image.Image:
    w, h = im.size
    side = max(w, h)
    canvas = Image.new("RGB", (side, side), fill)
    canvas.paste(im, ((side - w) // 2, (side - h) // 2))
    return canvas


def crop_row(im: Image.Image, y0: float, y1: float, count: int, names: list[str], x0=0.04, x1=0.96) -> None:
    span = x1 - x0
    for i, name in enumerate(names):
        l = x0 + span * (i / count)
        r = x0 + span * ((i + 1) / count)
        cell = box(im, l + 0.006, y0, r - 0.006, y1)
        save(square_pad(cell), name)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    shaoye = Image.open(ROOT / "shaoye-sheet.png")
    keli = Image.open(ROOT / "keli-sheet.png")
    duo = Image.open(ROOT / "duo-hero.png")

    # 少爷 — large sit, side, back
    save(box(shaoye, 0.32, 0.02, 0.74, 0.50), "shaoye-portrait.jpg")
    save(square_pad(box(shaoye, 0.78, 0.08, 0.99, 0.28)), "shaoye-side.jpg")
    save(square_pad(box(shaoye, 0.78, 0.30, 0.99, 0.48)), "shaoye-back.jpg")
    crop_row(
        shaoye,
        0.515,
        0.665,
        5,
        [
            "expr-shaoye-aloof.jpg",
            "expr-shaoye-wonder.jpg",
            "expr-shaoye-blank.jpg",
            "expr-shaoye-happy.jpg",
            "expr-shaoye-glance.jpg",
        ],
    )
    crop_row(
        shaoye,
        0.68,
        0.825,
        4,
        [
            "pose-shaoye-stand.jpg",
            "pose-shaoye-walk.jpg",
            "pose-shaoye-loaf.jpg",
            "pose-shaoye-sleep.jpg",
        ],
    )

    # 可丽 — large sit, side, back
    save(box(keli, 0.32, 0.02, 0.74, 0.50), "keli-portrait.jpg")
    save(square_pad(box(keli, 0.78, 0.08, 0.99, 0.28)), "keli-side.jpg")
    save(square_pad(box(keli, 0.78, 0.30, 0.99, 0.48)), "keli-back.jpg")
    crop_row(
        keli,
        0.515,
        0.665,
        5,
        [
            "expr-keli-curious.jpg",
            "expr-keli-shy.jpg",
            "expr-keli-joy.jpg",
            "expr-keli-wink.jpg",
            "expr-keli-soft.jpg",
        ],
    )
    crop_row(
        keli,
        0.68,
        0.825,
        5,
        [
            "pose-keli-loaf.jpg",
            "pose-keli-belly.jpg",
            "pose-keli-sit.jpg",
            "pose-keli-play.jpg",
            "pose-keli-sleep.jpg",
        ],
    )

    # Duo poster — pair + bottom interaction gallery
    save(box(duo, 0.22, 0.02, 0.82, 0.44), "duo-pair.jpg")
    crop_row(
        duo,
        0.635,
        0.785,
        5,
        [
            "story-aloof.jpg",
            "story-shy.jpg",
            "story-loaf.jpg",
            "story-glance.jpg",
            "story-happy.jpg",
        ],
        x0=0.02,
        x1=0.98,
    )
    crop_row(
        duo,
        0.80,
        0.96,
        4,
        [
            "story-sleep.jpg",
            "story-hide.jpg",
            "story-bed.jpg",
            "story-world.jpg",
        ],
        x0=0.02,
        x1=0.78,
    )
    print("done")


if __name__ == "__main__":
    main()
