import { SideTexture, SideTextureRenderOptions, TextureColors } from './types';
import { RenderContext } from '../../ui/ctx';
import { Coords2D, HALF_TILE_WIDTH } from '../coords';
import { renderColors } from './texture';

const OFFSETS = {
    l: [0, 1, 1, 2, 2, 3, 3, 4],
    r: [4, 3, 3, 2, 2, 1, 1, 0],
};

if (OFFSETS.l.length !== HALF_TILE_WIDTH || OFFSETS.r.length !== HALF_TILE_WIDTH) {
    throw new Error('OFFSETS became inactual');
}

export class SimpleSideTexture implements SideTexture {
    private colors: string[];

    constructor(
        colors: TextureColors,
        data: number[],
    ) {
        if (data.length % HALF_TILE_WIDTH !== 0) {
            throw new Error('Invalid texture data length');
        }

        this.colors = renderColors(colors, data);
    }

    render(ctx: RenderContext, at: Coords2D, { sideHeight, side }: SideTextureRenderOptions) {
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
