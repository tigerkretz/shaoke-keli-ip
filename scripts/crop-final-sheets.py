#!/usr/bin/env python3
"""Crop tiles from the locked final art set. No new cat faces."""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from export_lib import (
    CROPS,
    PORTRAIT,
    ROOT,
    SQUARE,
    box,
    contain,
    long_side,
    save_jpg,
    save_png,
)


def crop_row(
    im,
    y0: float,
    y1: float,
    count: int,
    names: list[str],
    x0: float = 0.04,
    x1: float = 0.96,
    inset: float = 0.012,
    y_bias: float = 0.38,
) -> None:
    span = x1 - x0
    for i, name in enumerate(names):
        left = x0 + span * (i / count)
        right = x0 + span * ((i + 1) / count)
        cell = box(im, left + inset, y0, right - inset, y1)
        tile = contain(cell, SQUARE, pad=0.06, y_bias=y_bias)
        dest = CROPS / name
        if name.endswith(".png"):
            save_png(tile, dest)
        else:
            save_jpg(tile, dest)


def main() -> None:
    CROPS.mkdir(parents=True, exist_ok=True)
    from PIL import Image

    shaoye = Image.open(ROOT / "shaoye-sheet.png")
    keli = Image.open(ROOT / "keli-sheet.png")
    duo = Image.open(ROOT / "duo-hero.png")

    save_png(contain(box(shaoye, 0.392, 0.060, 0.662, 0.490), PORTRAIT, pad=0.04, y_bias=0.38), CROPS / "shaoye-portrait.png")
    save_png(contain(box(keli, 0.400, 0.058, 0.638, 0.490), PORTRAIT, pad=0.04, y_bias=0.38), CROPS / "keli-portrait.png")
    save_png(long_side(box(duo, 0.248, 0.088, 0.718, 0.428)), CROPS / "duo-pair.png")

    save_jpg(contain(box(shaoye, 0.80, 0.085, 0.985, 0.275), SQUARE, y_bias=0.40), CROPS / "shaoye-side.jpg")
    save_jpg(contain(box(shaoye, 0.80, 0.305, 0.985, 0.475), SQUARE, y_bias=0.45), CROPS / "shaoye-back.jpg")
    save_jpg(contain(box(keli, 0.80, 0.085, 0.985, 0.275), SQUARE, y_bias=0.40), CROPS / "keli-side.jpg")
    save_jpg(contain(box(keli, 0.80, 0.305, 0.985, 0.475), SQUARE, y_bias=0.45), CROPS / "keli-back.jpg")

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
        y_bias=0.34,
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
        y_bias=0.40,
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
        y_bias=0.34,
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
        y_bias=0.40,
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
        y_bias=0.40,
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
        y_bias=0.42,
    )
    print("done")


if __name__ == "__main__":
    main()
