#!/usr/bin/env python3
"""Build favicon and apple-touch icons from a face-centered crop of logo.png."""

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/public")
LOGO = ROOT / "assets" / "logo.png"
CREAM = (247, 238, 228, 255)


def main() -> None:
    logo = Image.open(LOGO).convert("RGBA")
    face = logo.crop((150, 10, 1120, 820))
    w, h = face.size
    side = max(w, h)
    square = Image.new("RGBA", (side, side), CREAM)
    square.paste(face, ((side - w) // 2, (side - h) // 2), face)
    flat = Image.new("RGB", square.size, CREAM[:3])
    flat.paste(square, mask=square.split()[-1])

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
