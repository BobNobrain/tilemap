import { TILE_ELEVATION_PX, TILE_HEIGHT_PX, TILE_WIDTH_PX } from './constants';
import type { Coords2D, Rect2D, WorldCoords } from './types';

export type { Coords2D, Rect2D, WorldCoords };
export { WORLD_ZERO, CANVAS_ZERO } from './constants';

export const HALF_TILE_WIDTH = TILE_WIDTH_PX / 2;
export const HALF_TILE_HEIGHT = Math.ceil(TILE_HEIGHT_PX / 2);
const HEIGHT_TO_WIDTH_RATIO = HALF_TILE_HEIGHT / HALF_TILE_WIDTH;

export function worldToCanvas(world: Readonly<WorldCoords>): Coords2D {
    return {
        left: world.x * HALF_TILE_WIDTH + world.z * HALF_TILE_WIDTH,
        top: world.x * HALF_TILE_HEIGHT - world.z * HALF_TILE_HEIGHT - world.y * TILE_ELEVATION_PX,
    };
}

export function canvasToWorld(canvas: Readonly<Coords2D>, worldY: number): WorldCoords {
    const elevation = worldY * TILE_ELEVATION_PX;
    const x = (canvas.top - elevation + canvas.left * HEIGHT_TO_WIDTH_RATIO) / TILE_HEIGHT_PX;
    return {
        x,
        y: worldY,
        z: canvas.left / HALF_TILE_WIDTH - x,
    };
}

export function floorWorldCoords(world: Readonly<WorldCoords>): WorldCoords {
    return { x: Math.floor(world.x), y: Math.floor(world.y), z: Math.floor(world.z) };
}
export function ceilWorldCoords(world: Readonly<WorldCoords>): WorldCoords {
    return { x: Math.ceil(world.x), y: Math.ceil(world.y), z: Math.ceil(world.z) };
}
export function roundWorldCoords(world: Readonly<WorldCoords>): WorldCoords {
    return { x: Math.round(world.x), y: Math.round(world.y), z: Math.round(world.z) };
}

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
