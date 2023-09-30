import { GridPoint, NoiseGrid } from './types';

export const triangularGrid: NoiseGrid = {
    generateForGridPoint(gp, cfg) {
        return cfg.rng.forInts([gp.x, gp.z])();
    },
    getMaxDistanceToGridPoint(cfg) {
        // i have no idea why this cannot be just gridSize
        return cfg.gridSize * 0.75;
    },
    getNearestGridPoints(x, z, cfg) {
        const h = Math.floor(cfg.gridSize * Math.sin(Math.PI / 3));
        const halfGridSize = Math.floor(cfg.gridSize / 2);

        const gridRow = Math.round(z / h);
        let gridCol = Math.round(x / cfg.gridSize);
        if (Math.abs(gridRow) % 2 === 1) {
            gridCol -= 0.5;
        }

        const gridCenter: GridPoint = {
            x: Math.floor(gridCol * cfg.gridSize),
            z: gridRow * h,
        };

        return [
            gridCenter,
            { ...gridCenter, x: gridCenter.x + cfg.gridSize },
            { ...gridCenter, x: gridCenter.x - cfg.gridSize },
            { x: gridCenter.x - halfGridSize, y: 0, z: gridCenter.z - h },
            { x: gridCenter.x + halfGridSize, y: 0, z: gridCenter.z - h },
            { x: gridCenter.x - halfGridSize, y: 0, z: gridCenter.z + h },
            { x: gridCenter.x + halfGridSize, y: 0, z: gridCenter.z + h },
            { ...gridCenter, z: gridCenter.z + h + h },
            { ...gridCenter, z: gridCenter.z - h - h },
        ];
    },
};
