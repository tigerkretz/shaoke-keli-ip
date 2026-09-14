#!/usr/bin/env python3
"""Crop merch tiles and relationship panels from locked boards. No new faces."""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image

from export_lib import CROPS, MERCH, REL, ROOT, contain, cover, crop_px, save_jpg, save_png


def main() -> None:
    CROPS.mkdir(parents=True, exist_ok=True)
    rel = Image.open(ROOT / "relationship-cards.png")
    # 2x2 board 1536x1024. Cover into 1200x960 (5:4) around the cats.
    save_jpg(cover(crop_px(rel, (8, 8, 758, 498)), REL, (0.48, 0.46)), CROPS / "rel-cuddle.jpg")
    save_jpg(cover(crop_px(rel, (778, 8, 1528, 498)), REL, (0.50, 0.42)), CROPS / "rel-protect.jpg")
    save_jpg(cover(crop_px(rel, (8, 514, 758, 1016)), REL, (0.48, 0.50)), CROPS / "rel-sleep.jpg")
    save_jpg(cover(crop_px(rel, (778, 514, 1528, 1016)), REL, (0.50, 0.52)), CROPS / "rel-sunset.jpg")

    merch = Image.open(ROOT / "merch-board.png")
    # Contain each product on 800x1000 cream — never clip pins / tall goods.
    save_png(contain(crop_px(merch, (24, 90, 690, 540)), MERCH, pad=0.07, y_bias=0.48), CROPS / "merch-pillow.png")
    save_png(contain(crop_px(merch, (720, 90, 1260, 540)), MERCH, pad=0.07, y_bias=0.48), CROPS / "merch-standee.png")
    save_png(contain(crop_px(merch, (1272, 70, 1528, 540)), MERCH, pad=0.10, y_bias=0.48), CROPS / "merch-pins.png")
    save_png(contain(crop_px(merch, (16, 560, 610, 1012)), MERCH, pad=0.07, y_bias=0.50), CROPS / "merch-mug.png")
    save_png(contain(crop_px(merch, (628, 560, 1240, 1012)), MERCH, pad=0.07, y_bias=0.48), CROPS / "merch-tote.png")
    save_png(contain(crop_px(merch, (1256, 560, 1528, 1012)), MERCH, pad=0.10, y_bias=0.48), CROPS / "merch-goods.png")
    print("done")


if __name__ == "__main__":
    main()
