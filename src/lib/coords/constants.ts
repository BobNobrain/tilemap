import { WorldCoords } from './types';

export const WORLD_ZERO: Readonly<WorldCoords> = { x: 0, y: 0, z: 0 };

export const NORTH: Readonly<WorldCoords> = { x: 0, y: 0, z: 1 };
export const SOUTH: Readonly<WorldCoords> = { x: 0, y: 0, z: -1 };
export const EAST: Readonly<WorldCoords> = { x: 1, y: 0, z: 0 };
export const WEST: Readonly<WorldCoords> = { x: -1, y: 0, z: 0 };

export const NORTH_EAST: Readonly<WorldCoords> = { x: 1, y: 0, z: 1 };
export const SOUTH_EAST: Readonly<WorldCoords> = { x: 1, y: 0, z: -1 };
export const NORTH_WEST: Readonly<WorldCoords> = { x: -1, y: 0, z: 1 };
export const SOUTH_WEST: Readonly<WorldCoords> = { x: -1, y: 0, z: -1 };
