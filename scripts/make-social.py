#!/usr/bin/env python3
"""Compose social PNGs from the locked sheets / hero. No AI redraw."""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image

from export_lib import (
    CROPS,
    PORTRAIT,
    ROOT,
    SOCIAL,
    box,
    contain,
    save_png,
)

IG_PORTRAIT = (1080, 1350)  # 4:5
IG_SQUARE = (1080, 1080)
IG_STORY = (1080, 1920)  # 9:16


def main() -> None:
    SOCIAL.mkdir(parents=True, exist_ok=True)
    shaoye = Image.open(ROOT / "shaoye-sheet.png")
    keli = Image.open(ROOT / "keli-sheet.png")
    duo = Image.open(ROOT / "duo-hero.png")

    cut_s = contain(box(shaoye, 0.392, 0.060, 0.662, 0.490), PORTRAIT, pad=0.04, y_bias=0.38)
    cut_k = contain(box(keli, 0.400, 0.058, 0.638, 0.490), PORTRAIT, pad=0.04, y_bias=0.38)
    pair = box(duo, 0.248, 0.088, 0.718, 0.428)

    save_png(cut_s, SOCIAL / "cutout-shaoye-3x4.png")
    save_png(cut_k, SOCIAL / "cutout-keli-3x4.png")
    save_png(cut_s, CROPS / "shaoye-portrait.png")
    save_png(cut_k, CROPS / "keli-portrait.png")

    save_png(contain(cut_s, IG_PORTRAIT, pad=0.04, y_bias=0.35), SOCIAL / "ig-portrait-shaoye.png")
    save_png(contain(cut_k, IG_PORTRAIT, pad=0.04, y_bias=0.35), SOCIAL / "ig-portrait-keli.png")
    save_png(contain(pair, IG_SQUARE, pad=0.04, y_bias=0.48), SOCIAL / "ig-square-duo.png")
    save_png(contain(pair, IG_STORY, pad=0.06, y_bias=0.38), SOCIAL / "ig-story-duo.png")
    print("done")


if __name__ == "__main__":
    main()
