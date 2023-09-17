import { Coords2D } from './types';

export const TILE_WIDTH_PX = 16;
export const TILE_HEIGHT_PX = 9;
export const TILE_ELEVATION_PX = 8;

export const HALF_TILE_WIDTH = TILE_WIDTH_PX / 2;
export const HALF_TILE_HEIGHT = Math.ceil(TILE_HEIGHT_PX / 2);

export const CANVAS_ZERO: Readonly<Coords2D> = { left: 0, top: 0 };
