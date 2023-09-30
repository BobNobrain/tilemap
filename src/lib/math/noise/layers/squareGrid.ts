import { GridPoint, NoiseGrid } from './types';

function getGridPointNumber(gp: Readonly<GridPoint>): number {
    if (gp.x === 0 && gp.z === 0) {
        return 0;
    }

    const ringN = Math.abs(gp.x) + Math.abs(gp.z);
    // ringSize(0) = 1
    // ringSize(1) = 4
    // ringSize(2) = 4 + 4 * 1
    // ringSize(3) = 4 + 4 * 2
    // ringSize(n) = 4n
    // ringOffset(n) = sum(from=0, to=n-1, i => ringSize(i)) = 1 + 4(n-2)(n-1)/2 = 1 + 2(n-1)(n-2)
    const ringOffset = 1 + 2 * (ringN - 1) * ringN;
    let posInRing = 0;
    if (gp.x > 0 && gp.z >= 0) {
        // quarter I (+, +)
        posInRing = gp.z;
    } else if (gp.x <= 0 && gp.z > 0) {
        // quarter II (-, +)
        posInRing = -gp.x + ringN;
    } else if (gp.x < 0 && gp.z <= 0) {
        // quarter III (-, -)
        posInRing = -gp.z + ringN + ringN;
    } else {
        // quarter IV (+, -)
        posInRing = gp.x + ringN + ringN + ringN;
    }

    return ringOffset + posInRing;
}

export const squareGrid: NoiseGrid = {
    generateForGridPoint: (gp, cfg) => {
        return cfg.rng.forInt(getGridPointNumber(gp))();
    },

    getMaxDistanceToGridPoint: (cfg) => {
        return Math.SQRT2 * cfg.gridSize;
    },

    getNearestGridPoints(x, z, cfg) {
        const scaledX = Math.round(x / cfg.gridSize);
        const scaledZ = Math.round(z / cfg.gridSize);
        return [
            { x: scaledX, z: scaledZ },
            { x: scaledX + 1, z: scaledZ },
            { x: scaledX - 1, z: scaledZ },
            { x: scaledX, z: scaledZ + 1 },
            { x: scaledX, z: scaledZ - 1 },
            { x: scaledX + 1, z: scaledZ + 1 },
            { x: scaledX - 1, z: scaledZ + 1 },
            { x: scaledX + 1, z: scaledZ - 1 },
            { x: scaledX - 1, z: scaledZ - 1 },
        ].map(({ x, z }) => ({ x: x * cfg.gridSize, z: z * cfg.gridSize }));
    },
};
