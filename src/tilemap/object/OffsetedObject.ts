import { RenderContext } from '../../ui/ctx';
import { CANVAS_ZERO, HALF_TILE_HEIGHT, HALF_TILE_WIDTH, Rect2D, WorldCoords, worldToCanvas } from '../coords';
import { CongruentGenerator, createCongruentGenerator } from '../math/random';
import { TexturePalette, TxData } from '../texture';
import { TransparentTexture } from '../texture/TransparentTexture';
import { WorldObject } from './types';

export class OffsetedObject implements WorldObject {
    private texture: TransparentTexture;
    private rndLeft: CongruentGenerator;
    private rndTop: CongruentGenerator;

    private leftBound: number;
    private rightBound: number;
    private topBound: number;
    private bottomBound: number;

    constructor(
        colors: TexturePalette,
        txData: TxData,
        anchor = CANVAS_ZERO,
        baseStartsAtY = 0,
    ) {
        this.texture = new TransparentTexture(colors, txData, anchor);

        this.rndLeft = createCongruentGenerator({
            nDimensions: 2,
        });
        this.rndTop = createCongruentGenerator({
            nDimensions: 2,
        });

        const { width, height } = txData;
        const { left, top } = anchor;

        this.topBound = -HALF_TILE_HEIGHT + top - baseStartsAtY;
        this.bottomBound = HALF_TILE_HEIGHT - height + top;
        this.leftBound = -HALF_TILE_WIDTH + left;
        this.rightBound = HALF_TILE_WIDTH - width + left;
    }

    render(ctx: RenderContext, coords: Readonly<WorldCoords>): void {
        const shiftLeft = this.rndLeft([coords.x, coords.z], { low: this.leftBound, high: this.rightBound });
        const shiftTop = this.rndTop([coords.x, coords.z], { low: this.topBound, high: this.bottomBound });

        const { left, top } = worldToCanvas(coords);
        this.texture.render(ctx, {
            left: Math.floor(left + shiftLeft),
            top: Math.floor(top + shiftTop),
        });
    }
}
