import { BROWN, GRAY, ORANGE } from '../palette/samples';
import { createTexturePalette } from '../../renderer/texture';
import { GRASS_LEFT_TXDATA, GRASS_RIGHT_TXDATA, GRASS_TOP_TXDATA } from '../textures/grass';
import { SimpleSideTexture } from '../tile/SimpleSideTexture';
import { SimpleTile } from '../tile/SimpleTile';
import { SimpleTopTexture } from '../tile/SimpleTopTexture';
import { TileTextures } from '../tile/types';

const sandTileTextures: TileTextures = {
    top: new SimpleTopTexture(
        createTexturePalette({
            primary: ORANGE,
            secondary: BROWN,
            ternary: GRAY,
        }),
        GRASS_TOP_TXDATA,
    ),
    left: new SimpleSideTexture(
        createTexturePalette({
            primary: ORANGE,
            ternary: GRAY,
        }),
        GRASS_LEFT_TXDATA,
    ),
    right: new SimpleSideTexture(
        createTexturePalette({
            primary: ORANGE,
            ternary: GRAY,
        }),
        GRASS_RIGHT_TXDATA,
    ),
};

export const sandTile = new SimpleTile(sandTileTextures);
