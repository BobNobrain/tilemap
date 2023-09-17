import { TILE_ELEVATION_PX } from './constants';
import type { Coords2D } from './types';

export function round2DCoords(canvas: Readonly<Coords2D>): Coords2D {
    return { left: Math.round(canvas.left), top: Math.round(canvas.top) };
}

export function getElevationPx(dy: number): number {
    return Math.ceil(dy * TILE_ELEVATION_PX);
}
export function getElevationDifferencePx(topY: number, bottomY: number): number {
    if (bottomY >= topY) {
        return 0;
    }

    return Math.ceil((topY - bottomY) * TILE_ELEVATION_PX);
}

export function add(c1: Readonly<Coords2D>, c2: Readonly<Coords2D>): Coords2D {
    return {
        left: c1.left + c2.left,
        top: c1.top + c2.top,
    };
}
