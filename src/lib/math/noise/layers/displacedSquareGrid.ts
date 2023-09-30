import { squareGrid } from './squareGrid';
import { NoiseGrid } from './types';

export const displacedSquareGrid: NoiseGrid = {
    generateForGridPoint: squareGrid.generateForGridPoint,

    getMaxDistanceToGridPoint: squareGrid.getMaxDistanceToGridPoint,

    getNearestGridPoints(x, z, cfg) {
        return squareGrid.getNearestGridPoints(x, z, cfg).map((c) => {
            const r = cfg.rng.forInts([x, z]);
            const dx = r() - 0.5;
            const dz = r() - 0.5;
            return {
                x: c.x + dx * cfg.gridSize,
                z: c.z + dz * cfg.gridSize,
            };
        });
    },
};
