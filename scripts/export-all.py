#!/usr/bin/env python3
"""Regenerate every site crop + social export from locked masters."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def main() -> None:
    for name in ("crop-final-sheets.py", "crop-new-boards.py", "make-social.py"):
        print(name)
        subprocess.check_call([sys.executable, str(HERE / name)], cwd=str(HERE))


if __name__ == "__main__":
    main()
