import { Coords2D, WorldCoords } from './types';

export const TILE_WIDTH_PX = 16;
export const TILE_HEIGHT_PX = 9;
export const TILE_ELEVATION_PX = 8;

export const HALF_TILE_WIDTH = TILE_WIDTH_PX / 2;
export const HALF_TILE_HEIGHT = Math.ceil(TILE_HEIGHT_PX / 2);

export const WORLD_ZERO: Readonly<WorldCoords> = { x: 0, y: 0, z: 0 };
export const CANVAS_ZERO: Readonly<Coords2D> = { left: 0, top: 0 };

export const NORTH: Readonly<WorldCoords> = { x: 0, y: 0, z: 1 };
export const SOUTH: Readonly<WorldCoords> = { x: 0, y: 0, z: -1 };
export const EAST: Readonly<WorldCoords> = { x: 1, y: 0, z: 0 };
export const WEST: Readonly<WorldCoords> = { x: -1, y: 0, z: 0 };

export const NORTH_EAST: Readonly<WorldCoords> = { x: 1, y: 0, z: 1 };
export const SOUTH_EAST: Readonly<WorldCoords> = { x: 1, y: 0, z: -1 };
export const NORTH_WEST: Readonly<WorldCoords> = { x: -1, y: 0, z: 1 };
export const SOUTH_WEST: Readonly<WorldCoords> = { x: -1, y: 0, z: -1 };
