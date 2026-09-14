"""Shared crop/resize helpers. No new cat faces — only locked sheets."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/public/assets")
CROPS = ROOT / "crops"
SOCIAL = ROOT / "social"
CREAM = (245, 238, 230)

PORTRAIT = (1080, 1440)  # 3:4
SQUARE = (1200, 1200)
REL = (1200, 960)  # 5:4
MERCH = (800, 1000)  # 4:5
DUO_LONG = 1600
JPEG_Q = 95


def box(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def crop_px(im: Image.Image, region: tuple[int, int, int, int]) -> Image.Image:
    return im.crop(region)


def contain(
    im: Image.Image,
    size: tuple[int, int],
    fill: tuple[int, int, int] = CREAM,
    pad: float = 0.05,
    y_bias: float = 0.42,
) -> Image.Image:
    """Fit the whole subject on an exact canvas. Never clips."""
    canvas = Image.new("RGB", size, fill)
    tw, th = size
    sw, sh = im.size
    inner_w = tw * (1 - 2 * pad)
    inner_h = th * (1 - 2 * pad)
    scale = min(inner_w / max(sw, 1), inner_h / max(sh, 1))
    nw, nh = max(1, round(sw * scale)), max(1, round(sh * scale))
    placed = im.convert("RGB").resize((nw, nh), Image.Resampling.LANCZOS)
    x = (tw - nw) // 2
    y = int((th - nh) * y_bias)
    y = max(int(th * pad), min(y, th - nh - int(th * pad)))
    canvas.paste(placed, (x, y))
    return canvas


def cover(
    im: Image.Image,
    size: tuple[int, int],
    focus: tuple[float, float] = (0.5, 0.42),
) -> Image.Image:
    """Scale to fill an exact canvas, then crop around a focus point."""
    tw, th = size
    rgb = im.convert("RGB")
    sw, sh = rgb.size
    scale = max(tw / max(sw, 1), th / max(sh, 1))
    nw, nh = max(tw, round(sw * scale)), max(th, round(sh * scale))
    resized = rgb.resize((nw, nh), Image.Resampling.LANCZOS)
    fx, fy = focus
    left = int(fx * nw - tw / 2)
    top = int(fy * nh - th / 2)
    left = max(0, min(left, nw - tw))
    top = max(0, min(top, nh - th))
    return resized.crop((left, top, left + tw, top + th))


def long_side(im: Image.Image, target: int = DUO_LONG) -> Image.Image:
    rgb = im.convert("RGB")
    w, h = rgb.size
    long = max(w, h)
    if long == target:
        return rgb
    scale = target / long
    return rgb.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.Resampling.LANCZOS)


def save_png(im: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert("RGB")
    rgb.save(dest, "PNG", optimize=True)
    print(f"  {dest.relative_to(ROOT)}  {rgb.size[0]}x{rgb.size[1]} png")


def save_jpg(im: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert("RGB")
    rgb.save(dest, "JPEG", quality=JPEG_Q, subsampling=0, optimize=True)
    print(f"  {dest.relative_to(ROOT)}  {rgb.size[0]}x{rgb.size[1]} jpg{JPEG_Q}")
