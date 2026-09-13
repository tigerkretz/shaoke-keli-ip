#!/usr/bin/env python3
"""Build favicon and apple-touch icons from a centered square crop of logo.png."""

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/public")
LOGO = ROOT / "assets" / "logo.png"
CREAM = (247, 238, 228)


def centered_square(logo: Image.Image) -> Image.Image:
    bbox = logo.split()[-1].getbbox()
    if not bbox:
        raise SystemExit("logo.png has no visible pixels")
    x0, y0, x1, y1 = bbox
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    side = int(max(x1 - x0, y1 - y0) * 1.04)
    left = int(round(cx - side / 2))
    top = int(round(cy - side / 2))
    crop = logo.crop((left, top, left + side, top + side))
    flat = Image.new("RGB", crop.size, CREAM)
    flat.paste(crop, mask=crop.split()[-1])
    return flat


def main() -> None:
    logo = Image.open(LOGO).convert("RGBA")
    flat = centered_square(logo)
    sizes = {
        ROOT / "assets" / "favicon-32.png": 32,
        ROOT / "assets" / "favicon-192.png": 192,
        ROOT / "apple-touch-icon.png": 180,
    }
    for path, size in sizes.items():
        flat.resize((size, size), Image.Resampling.LANCZOS).save(path, "PNG")
        print(path.name, size)
    flat.resize((32, 32), Image.Resampling.LANCZOS).save(
        ROOT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    print("favicon.ico")


if __name__ == "__main__":
    main()
