import { RenderContext } from '../../ui/ctx';
import { HALF_TILE_HEIGHT, HALF_TILE_WIDTH, round2DCoords, WorldCoords, worldToCanvas } from '../coords';
import { TileTextures } from './types';

interface Elevations {
    leftElevationPx: number;
    rightElevationPx: number;
}

export class SimpleTile {
    constructor(
        private textures: TileTextures,
    ) {}

    renderAt(
        ctx: RenderContext,
        coords: WorldCoords,
        { leftElevationPx, rightElevationPx }: Elevations,
    ): void {
        const { left, top } = round2DCoords(worldToCanvas(coords));

        this.textures.top.render(ctx, { left, top });
        this.textures.left.render(
            ctx,
            { left: left - HALF_TILE_WIDTH + 1, top: top + 1 },
            { sideHeight: leftElevationPx, side: 'l' },
        );
        this.textures.right.render(
            ctx,
            { left: left + 1, top: top + 1 },
            { sideHeight: rightElevationPx, side: 'r' },
        );
    }
}
