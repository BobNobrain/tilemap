import { Coords2D, WorldCoords } from './types';

export const TILE_WIDTH_PX = 16;
export const TILE_HEIGHT_PX = 9;
export const TILE_ELEVATION_PX = 8;

export const WORLD_ZERO: Readonly<WorldCoords> = { x: 0, y: 0, z: 0 };
export const CANVAS_ZERO: Readonly<Coords2D> = { left: 0, top: 0 };
