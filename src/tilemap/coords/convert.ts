import { HALF_TILE_HEIGHT, HALF_TILE_WIDTH, TILE_ELEVATION_PX, TILE_HEIGHT_PX } from './constants';
import { Coords2D, WorldCoords } from './types';

const HEIGHT_TO_WIDTH_RATIO = HALF_TILE_HEIGHT / HALF_TILE_WIDTH;

export function worldToCanvas(world: Readonly<WorldCoords>): Coords2D {
    return {
        left: world.x * HALF_TILE_WIDTH + world.z * HALF_TILE_WIDTH,
        top: world.x * HALF_TILE_HEIGHT - world.z * HALF_TILE_HEIGHT - world.y * TILE_ELEVATION_PX,
    };
}

// TODO: check again
export function canvasToWorld(canvas: Readonly<Coords2D>, worldY: number): WorldCoords {
    const elevation = worldY * TILE_ELEVATION_PX;
    const x = (canvas.top - elevation + canvas.left * HEIGHT_TO_WIDTH_RATIO) / TILE_HEIGHT_PX;
    return {
        x,
        y: worldY,
        z: canvas.left / HALF_TILE_WIDTH - x,
    };
}
