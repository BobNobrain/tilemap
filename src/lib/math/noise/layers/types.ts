import { RandomNumberGenerator } from '../../rng';

export type GridPoint = {
    x: number;
    z: number;
};

export interface NoiseLayerConfig {
    rng: RandomNumberGenerator;
    gridSize: number;
    amplitude: number;
}

export interface NoiseGrid {
    getMaxDistanceToGridPoint: (cfg: NoiseLayerConfig) => number;
    getNearestGridPoints: (x: number, z: number, cfg: NoiseLayerConfig) => GridPoint[];
    generateForGridPoint: (gp: GridPoint, cfg: NoiseLayerConfig) => number;
}
