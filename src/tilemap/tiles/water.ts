import { BLUE } from '../palette/samples';
import { createTexturePalette } from '../texture';
import { WAVE_FRAMES_TXDATA } from '../textures/wave';
import { EmptySideTexture } from '../tile/empty';
import { SimpleTile } from '../tile/SimpleTile';
import { TileTextures } from '../tile/types';
import { WaveTopTexture } from '../tile/WaveTopTexture';

const waterTileTextures: TileTextures = {
    top: new WaveTopTexture(
        createTexturePalette({
            primary: BLUE,
        }),
        WAVE_FRAMES_TXDATA,
        {
            animationLengthTicks: 150,
            frameDurationTicks: 5,
            nWaves: 3,
        },
    ),
    left: new EmptySideTexture(),
    right: new EmptySideTexture(),
};

export const waterTile = new SimpleTile(waterTileTextures);
