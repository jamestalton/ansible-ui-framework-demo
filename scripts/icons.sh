#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR/..

# icon-192.png
convert -density 1920 -background "#00000000" -resize 192x192 \
  src/assets/favicon.svg public/icon-192.png 
optipng -o7 public/icon-192.png

# icon-512.png
convert -density 5120 -background "#00000000" -resize 512x512 \
  src/assets/favicon.svg public/icon-512.png 
optipng -o7 public/icon-512.png

# maskable-192.png
convert -density 1920 -background "#00000000" -resize 150x150 -border 21 -bordercolor "#00000000" \
  src/assets/favicon.svg public/maskable-192.png 
convert -size 192x192 xc:#00000000 -fill black -draw "circle 96,96 96,0" public/circle.png
convert -set colorspace sRGB public/circle.png public/maskable-192.png -gravity center -compose over -composite public/maskable-192.png
rm -f public/circle.png
optipng -o7 public/maskable-192.png

# maskable-512.png
convert -density 5120 -background "#00000000" -resize 400x400 -border 56 -bordercolor "#00000000" \
  src/assets/favicon.svg public/maskable-512.png
convert -size 512x512 xc:#00000000 -fill black -draw "circle 256,256 256,0" public/circle.png
convert -set colorspace sRGB public/circle.png public/maskable-512.png -gravity center -compose over -composite public/maskable-512.png
rm -f public/circle.png
optipng -o7 public/maskable-512.png

# favicon.ico
# convert -density 1920 -background "#00000000" -resize 192x192 ansible.svg ansible.png
convert -density 160 -background "#00000000" -resize 16x16 \
  src/assets/favicon.svg src/assets/favicon-16.png
convert -density 240 -background "#00000000" -resize 24x24 \
  src/assets/favicon.svg src/assets/favicon-24.png
convert -density 320 -background "#00000000" -resize 32x32 \
  src/assets/favicon.svg src/assets/favicon-32.png
convert -density 480 -background "#00000000" -resize 48x48 \
  src/assets/favicon.svg src/assets/favicon-48.png
convert -density 640 -background "#00000000" -resize 64x64 \
  src/assets/favicon.svg src/assets/favicon-64.png
convert src/assets/favicon-16.png src/assets/favicon-24.png src/assets/favicon-32.png src/assets/favicon-48.png src/assets/favicon-64.png src/assets/favicon.ico
rm -f src/assets/favicon-*.png

# apple-touch.png - iOS requires an 'apple-touch-icon' non-transparent 192px
convert -density 1920 -background "#000000" -resize 192x192 \
  src/assets/favicon.svg src/assets/apple-touch.png
optipng -o7 src/assets/apple-touch.png


