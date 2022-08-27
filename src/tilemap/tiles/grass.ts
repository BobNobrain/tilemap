import { BROWN, GRAY, GREEN } from '../palette/samples';
import { GRASS_LEFT_TXDATA, GRASS_RIGHT_TXDATA, GRASS_TOP_TXDATA } from '../textures/grass';
import { SimpleSideTexture } from '../tile/SimpleSideTexture';
import { SimpleTile } from '../tile/SimpleTile';
import { SimpleTopTexture } from '../tile/SimpleTopTexture';
import { createTextureColors } from '../tile/texture';
import { TileTextures } from '../tile/types';

const grassTileTextures: TileTextures = {
    top: new SimpleTopTexture(
        createTextureColors({
            primary: GREEN,
            secondary: BROWN,
            ternary: GRAY,
        }),
        GRASS_TOP_TXDATA,
    ),
    left: new SimpleSideTexture(
        createTextureColors({
            primary: BROWN,
            secondary: GREEN,
            ternary: GRAY,
        }),
        GRASS_LEFT_TXDATA,
    ),
    right: new SimpleSideTexture(
        createTextureColors({
            primary: BROWN,
            secondary: GREEN,
            ternary: GRAY,
        }),
        GRASS_RIGHT_TXDATA,
    ),
};

export const grassTile = new SimpleTile(grassTileTextures);
