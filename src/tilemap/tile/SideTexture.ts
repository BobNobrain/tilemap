import { TextureColors } from './types';
import {
    P0, P1, P2, P3, P4, P5, P6,
    S0, S1, S2, S3, S4, S5, S6,
} from './constants';
import { TILE_WIDTH_PX } from '../coords/constants';
import { RenderContext } from '../../ui/ctx';
import { Coords2D, HALF_TILE_WIDTH } from '../coords';

const OFFSETS = {
    l: [0, 1, 1, 2, 2, 3, 3, 4],
    r: [4, 3, 3, 2, 2, 1, 1, 0],
};

if (OFFSETS.l.length !== HALF_TILE_WIDTH || OFFSETS.r.length !== HALF_TILE_WIDTH) {
    throw new Error('OFFSETS became inactual');
}

interface RenderOptions {
    sideHeight: number;
    side: 'l' | 'r';
}

export class SideTexture {
    private colors: string[];

    constructor(
        colors: TextureColors,
        data: number[],
    ) {
        if (data.length % HALF_TILE_WIDTH !== 0) {
            throw new Error('Invalid texture data length');
        }

        const repMap: Record<number, string> = {
            [P0]: colors.primary.darkest,
            [P1]: colors.primary.darker,
            [P2]: colors.primary.dark,
            [P3]: colors.primary.color,
            [P4]: colors.primary.light,
            [P5]: colors.primary.lighter,
            [P6]: colors.primary.lightest,

            [S0]: colors.secondary.darkest,
            [S1]: colors.secondary.darker,
            [S2]: colors.secondary.dark,
            [S3]: colors.secondary.color,
            [S4]: colors.secondary.light,
            [S5]: colors.secondary.lighter,
            [S6]: colors.secondary.lightest,
        };

        this.colors = data.map((n) => repMap[n]);
    }

    render(ctx: RenderContext, at: Coords2D, { sideHeight, side }: RenderOptions) {
        const offsets = OFFSETS[side];

        for (let i = 0; i < this.colors.length; i++) {
            const left = i % HALF_TILE_WIDTH;
            const topWithoutOffset = ((i - left) / HALF_TILE_WIDTH) | 0;
            const top = topWithoutOffset + offsets[left];
            const color = this.colors[i];

            if (topWithoutOffset >= sideHeight) {
                return;
            }

            ctx.putPixel(color, at.left + left, at.top + top);
        }
    }
}
