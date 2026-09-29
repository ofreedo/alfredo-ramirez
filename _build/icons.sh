#!/bin/bash
# Render favicon.ico (16/32/48, round) and apple-touch-icon.png (180, square) from _build/icon.html in the site font.
# Needs the local preview server on port 8856, and Pillow in /tmp/fontenv (python3 -m venv /tmp/fontenv && /tmp/fontenv/bin/pip install pillow).
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd "$(dirname "$0")/.."
"$C" --headless=new --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 --window-size=512,512 --virtual-time-budget=4000 --screenshot=/tmp/icon-round.png "http://localhost:8856/_build/icon.html?round" 2>/dev/null
"$C" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=512,512 --virtual-time-budget=4000 --screenshot=/tmp/icon-square.png "http://localhost:8856/_build/icon.html" 2>/dev/null
/tmp/fontenv/bin/python - <<'PY'
from PIL import Image
Image.open('/tmp/icon-round.png').convert('RGBA').save('favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
Image.open('/tmp/icon-square.png').convert('RGB').resize((180, 180), Image.LANCZOS).save('apple-touch-icon.png', optimize=True)
PY
ls -la favicon.ico apple-touch-icon.png
