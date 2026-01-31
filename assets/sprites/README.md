# Dragon Sprites Setup

## Recommended Sprite Pack

**Free Pixel Art Dragons by Magicae! Games**
- URL: https://magicae-games.itch.io/free-pixel-art-dragons
- License: Free for commercial & non-commercial use

## How to Add Sprites

1. Download the sprite pack from itch.io
2. Extract the PNG files to this folder (`assets/sprites/`)
3. Rename files as follows:

```
assets/sprites/
  dragon-fire.png      (Fire dragon sprite sheet)
  dragon-water.png     (Water dragon sprite sheet)
  dragon-earth.png     (Earth dragon sprite sheet)
  dragon-air.png       (Air dragon - map to 'wind' type)
  egg.png              (Optional: egg sprite)
```

## Type Mapping

The game has 14 dragon types. Map the 4 available sprites as follows:

| Game Type | Sprite File | Notes |
|-----------|-------------|-------|
| fire | dragon-fire.png | Direct match |
| water | dragon-water.png | Direct match |
| earth | dragon-earth.png | Direct match |
| wind | dragon-air.png | Air sprite |
| electric | dragon-fire.png | Use fire (yellow tint via CSS) |
| ice | dragon-water.png | Use water (light blue tint) |
| grass | dragon-earth.png | Use earth (green tint) |
| dark | dragon-earth.png | Use earth (purple tint) |
| light | dragon-air.png | Use air (golden tint) |
| psychic | dragon-water.png | Use water (pink tint) |
| rock | dragon-earth.png | Use earth (gray tint) |
| speed | dragon-air.png | Use air (cyan tint) |
| poison | dragon-water.png | Use water (purple tint) |
| metal | dragon-earth.png | Use earth (silver tint) |

## Sprite Sheet Format

Expected format (from Magicae! pack):
- 11 animations per dragon
- Works with 32x32 tilesets
- PNG with transparency

The game will automatically detect if sprites are available and fall back to CSS pixel art if not.
