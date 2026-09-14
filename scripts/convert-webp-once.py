"""One-off: convert site-facing PNGs in public/assets (crops/social + top-level) to WebP.

Keeps originals (social IG exports are referenced outside the site; sheets stay as
high-res sources). Only rewrites the files the site actually serves, then prints
a size report. Quality 82 + method 6 is the sweet spot for flat illustration.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public" / "assets"

TOP_LEVEL = [
    "duo-hero.png",
    "relationship-cards.png",
    "merch-board.png",
    "og-banner.png",
    "logo.png",
    "logo-ribbon.png",
]
# Sheets are 2MB each and only used as Lightbox blow-ups + thumbs; convert too.
SHEETS = ["shaoye-sheet.png", "keli-sheet.png"]
SUBDIRS = ["crops", "social"]

total_before = 0
total_after = 0
report: list[tuple[str, int, int]] = []


def convert(path: Path, quality: int) -> None:
    global total_before, total_after
    out = path.with_suffix(".webp")
    im = Image.open(path)
    before = path.stat().st_size
    kwargs: dict = {"quality": quality, "method": 6}
    # Keep alpha where it exists (cutouts/logos), else drop to opaque for size.
    has_alpha = im.mode in ("RGBA", "LA", "P") and "A" in im.convert("RGBA").getbands()
    if not has_alpha:
        im = im.convert("RGB")
    im.save(out, "WEBP", **kwargs)
    after = out.stat().st_size
    total_before += before
    total_after += after
    report.append((str(out.relative_to(ROOT)), before, after))


for name in TOP_LEVEL:
    p = ROOT / name
    if p.exists():
        # Logos/OG need alpha or max fidelity; use higher quality.
        convert(p, 90 if name.startswith(("logo", "og-")) else 82)

for name in SHEETS:
    p = ROOT / name
    if p.exists():
        convert(p, 85)  # blow-up detail matters here

for sub in SUBDIRS:
    d = ROOT / sub
    if not d.is_dir():
        continue
    for p in sorted(d.glob("*.png")):
        convert(p, 82)

w = max(len(r[0]) for r in report)
for name, b, a in report:
    print(f"{name:<{w}}  {b/1024:>8.0f}K -> {a/1024:>7.0f}K   ({b/max(a,1):.1f}x)")
print("-" * (w + 40))
print(f"{'TOTAL':<{w}}  {total_before/1e6:>7.1f}M -> {total_after/1e6:>6.1f}M   ({total_before/max(total_after,1):.1f}x smaller)")
