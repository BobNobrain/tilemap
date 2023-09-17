import { RenderContext } from '../../ui/ctx';
import { HALF_TILE_WIDTH, round2DCoords, WorldCoords, worldToCanvas } from '../coords';
import { Tile, TileNeighbourhood, TileTextures } from './types';

export class SimpleTile implements Tile {
    constructor(
        private textures: TileTextures,
    ) {}

    renderAt(
        ctx: RenderContext,
        coords: WorldCoords,
        { eastElevationPx, southElevationPx, isNorthOverhang, isWestOverhang }: TileNeighbourhood,
    ): void {
        const { left, top } = round2DCoords(worldToCanvas(coords));

        this.textures.top.render(ctx, { left, top }, {
            leftBorder: isWestOverhang,
            rightBorder: isNorthOverhang,
            worldPosition: coords,
        });
        this.textures.left.render(
            ctx,
            { left: left - HALF_TILE_WIDTH + 1, top: top + 1 },
            { sideHeight: southElevationPx, side: 'l' },
        );
        this.textures.right.render(
            ctx,
            { left: left + 1, top: top + 1 },
            { sideHeight: eastElevationPx, side: 'r' },
        );
    }
}
