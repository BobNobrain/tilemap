import { BROWN, GRAY, GREEN } from '../palette/samples';
import { GRASS_LEFT_TXDATA, GRASS_RIGHT_TXDATA, GRASS_TOP_TXDATA } from '../textures/grass';
import { SideTexture } from '../tile/SideTexture';
import { SimpleTile } from '../tile/SimpleTile';
import { TopTexture } from '../tile/TopSideTexture';
import { TileTextures } from '../tile/types';

const grassTileTextures: TileTextures = {
    top: new TopTexture(
        {
            primary: GREEN,
            secondary: BROWN,
            ternary: GRAY,
        },
        GRASS_TOP_TXDATA,
    ),
    left: new SideTexture(
        {
            primary: BROWN,
            secondary: GREEN,
            ternary: GRAY,
        },
        GRASS_LEFT_TXDATA,
    ),
    right: new SideTexture(
        {
            primary: BROWN,
            secondary: GREEN,
            ternary: GRAY,
        },
        GRASS_RIGHT_TXDATA,
    ),
};

export const grassTile = new SimpleTile(grassTileTextures);
