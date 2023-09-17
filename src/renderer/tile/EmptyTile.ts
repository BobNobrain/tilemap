// import { RenderContext } from '../../ui/ctx';
// import { HALF_TILE_WIDTH, round2DCoords, WorldCoords, worldToCanvas } from '../coords';
// import { TileNeighbourhood, TileTextures } from './types';
import {Tile} from './types';

export class EmptyTile implements Tile {
    constructor() {}

    renderAt(
        // ctx: RenderContext,
        // coords: WorldCoords,
        // { eastElevationPx, southElevationPx, isNorthOverhang, isWestOverhang }: TileNeighbourhood,
    ): void {
        // nothing
    }
}
