#!/bin/bash
# Render the two social cards (1200x630) from _build/og.html: bash _build/og.sh
# Needs the local preview server running on port 8856 (launch.json entry "alfredo-ramirez").
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd "$(dirname "$0")/.."
for v in home hosp; do
  "$C" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=4000 \
    --screenshot="/tmp/og-$v.png" "http://localhost:8856/_build/og.html?$v" 2>/dev/null
done
sips -s format jpeg -s formatOptions 85 /tmp/og-home.png --out assets/og-image.jpg >/dev/null
sips -s format jpeg -s formatOptions 85 /tmp/og-hosp.png --out assets/og-hospitality.jpg >/dev/null
ls -la assets/og-*.jpg
