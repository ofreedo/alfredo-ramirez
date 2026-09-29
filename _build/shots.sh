#!/bin/bash
# Re-take portfolio screenshots: bash _build/shots.sh (run from the repo root)
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p /tmp/arshots
shot() {
  "$C" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,900 --virtual-time-budget=9000 --screenshot="/tmp/arshots/$1.png" "$2" 2>/dev/null
  sips -s format jpeg -s formatOptions 80 "/tmp/arshots/$1.png" --out "assets/work/$1.jpg" >/dev/null
  sips -Z 800 -s format jpeg -s formatOptions 78 "/tmp/arshots/$1.png" --out "assets/work/$1-800.jpg" >/dev/null
}
shot los-freseros https://paleterialosfreseros.com/
shot primeline https://primelinepc.com/
shot jxr https://jxrconstructors.com/
ls assets/work
