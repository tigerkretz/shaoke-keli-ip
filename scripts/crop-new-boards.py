#!/usr/bin/env python3
"""Crop merch tiles and relationship panels from user-delivered boards."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/public/assets")
OUT = ROOT / "crops"


def save(im: Image.Image, name: str) -> None:
    dest = OUT / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert("RGB")
    rgb.save(dest, "JPEG", quality=92, optimize=True)
    print(f"  {name:32} {rgb.size[0]}x{rgb.size[1]}")


def crop_px(im: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    return im.crop(box)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    rel = Image.open(ROOT / "relationship-cards.png")
    # 2x2 with a cream gutter around the center.
    save(crop_px(rel, (0, 0, 762, 502)), "rel-cuddle.jpg")
    save(crop_px(rel, (774, 0, 1536, 502)), "rel-protect.jpg")
    save(crop_px(rel, (0, 506, 762, 1024)), "rel-sleep.jpg")
    save(crop_px(rel, (774, 506, 1536, 1024)), "rel-sunset.jpg")

    merch = Image.open(ROOT / "merch-board.png")
    save(crop_px(merch, (8, 118, 704, 548)), "merch-pillow.jpg")
    save(crop_px(merch, (712, 118, 1264, 548)), "merch-standee.jpg")
    save(crop_px(merch, (1288, 70, 1530, 548)), "merch-pins.jpg")
    save(crop_px(merch, (8, 558, 620, 1018)), "merch-mug.jpg")
    save(crop_px(merch, (620, 558, 1244, 1018)), "merch-tote.jpg")
    save(crop_px(merch, (1266, 558, 1530, 1018)), "merch-goods.jpg")
    print("done")


if __name__ == "__main__":
    main()
