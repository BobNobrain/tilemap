import { CANVAS_ZERO } from '../coords';
import { OffsetedObject } from '../object/OffsetedObject';
import { WorldObject } from '../object/types';
import { BROWN, GREEN } from '../palette/samples';
import { createTexturePalette } from '../texture';
import { TREE1_TXDATA } from '../textures/trees';

export const tree1: WorldObject = new OffsetedObject(
    createTexturePalette({
        primary: GREEN,
        secondary: BROWN,
    }),
    TREE1_TXDATA,
    CANVAS_ZERO,
    9,
);
