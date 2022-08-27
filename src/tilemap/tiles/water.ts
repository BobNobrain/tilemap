import { BLUE } from '../palette/samples';
import { WAVE_FRAMES_TXDATA, WAVE_FRAME_HEIGHT, WAVE_FRAME_WIDTH } from '../textures/wave';
import { EmptySideTexture } from '../tile/empty';
import { SimpleTile } from '../tile/SimpleTile';
import { createTextureColors } from '../tile/texture';
import { TileTextures } from '../tile/types';
import { WaveTopTexture } from '../tile/WaveTopTexture';

const waterTileTextures: TileTextures = {
    top: new WaveTopTexture(
        createTextureColors({
            primary: BLUE,
        }),
        {
            txDataFrames: WAVE_FRAMES_TXDATA,
            frameWidth: WAVE_FRAME_WIDTH,
            frameHeight: WAVE_FRAME_HEIGHT,
            animationLengthTicks: 150,
            frameDurationTicks: 5,
            nWaves: 3,
        },
    ),
    left: new EmptySideTexture(),
    right: new EmptySideTexture(),
};

export const waterTile = new SimpleTile(waterTileTextures);
