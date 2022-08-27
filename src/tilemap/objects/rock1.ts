import { CANVAS_ZERO } from '../coords';
import { OffsetedObject, WorldObject } from '../object';
import { GRAY } from '../palette/samples';
import { createTexturePalette } from '../texture';
import { ROCK1_TXDATA } from '../textures/rocks';

export const rock1: WorldObject = new OffsetedObject(
    createTexturePalette({
        primary: GRAY,
    }),
    ROCK1_TXDATA,
    CANVAS_ZERO,
    3,
);
