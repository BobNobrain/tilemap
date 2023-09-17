import { RenderContext } from '../../ui/ctx';
import { WorldCoords } from '../coords';
import { Tile, TileNeighbourhood } from './types';

export interface ColumnTileProps {
    coords: WorldCoords;
    /** 0 = no height, 1 = normal height (makes a cube) */
    height: number;

    /** All values in 0..1, `lit` will be adjusted for lighting emulation */
    color: {
        hue: number;
        sat: number;
        lit: number;
    };
}

export class ColumnTile implements Tile {
    renderAt(ctx: RenderContext, coords: WorldCoords, nbh: TileNeighbourhood): void {
        throw new Error('Method not implemented.');
    }
}