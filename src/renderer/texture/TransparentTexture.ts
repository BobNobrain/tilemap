import type { RenderContext } from '../../ui/ctx';
import { CANVAS_ZERO, Coords2D } from '../coords';
import { renderTxColors } from './texture';
import { TexturePalette, TxColors, TxData } from './types';

export class TransparentTexture {
    private colors: TxColors;
    private anchor: Readonly<Coords2D>;

    constructor(
        colors: TexturePalette,
        data: TxData,
        anchor = CANVAS_ZERO,
    ) {
        this.colors = renderTxColors(colors, data);
        this.anchor = anchor;
    }

    render(ctx: RenderContext, coords: Readonly<Coords2D>) {
        let i = 0;
        for (let y = 0; y < this.colors.height; y++) {
            for (let x = 0; x < this.colors.width; x++) {
                const c = this.colors.colors[i];

                if (c) {
                    ctx.putPixel(
                        c,
                        coords.left + x - this.anchor.left,
                        coords.top + y - this.anchor.top,
                    );
                }

                ++i;
            }
        }
    }
}
