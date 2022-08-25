import { BROWN, GRAY, ORANGE } from '../palette/samples';
import { GRASS_LEFT_TXDATA, GRASS_RIGHT_TXDATA, GRASS_TOP_TXDATA } from '../textures/grass';
import { SideTexture } from '../tile/SideTexture';
import { SimpleTile } from '../tile/SimpleTile';
import { TopTexture } from '../tile/TopSideTexture';
import { TileTextures } from '../tile/types';

const sandTileTextures: TileTextures = {
    top: new TopTexture(
        {
            primary: ORANGE,
            secondary: BROWN,
            ternary: GRAY,
        },
        GRASS_TOP_TXDATA,
    ),
    left: new SideTexture(
        {
            primary: ORANGE,
            secondary: ORANGE,
            ternary: GRAY,
        },
        GRASS_LEFT_TXDATA,
    ),
    right: new SideTexture(
        {
            primary: ORANGE,
            secondary: ORANGE,
            ternary: GRAY,
        },
        GRASS_RIGHT_TXDATA,
    ),
};

export const sandTile = new SimpleTile(sandTileTextures);
