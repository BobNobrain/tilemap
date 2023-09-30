import { NoiseGrid, NoiseLayerConfig } from './types';

export function generateLayerValue(
    x: number,
    z: number,
    layer: NoiseLayerConfig,
    grid: NoiseGrid,
    gridValuesCache: Record<string, number>,
) {
    const gridPoints = grid.getNearestGridPoints(x, z, layer);
    let sum = 0;
    let denom = 0;
    const maxD = grid.getMaxDistanceToGridPoint(layer);
    for (const gp of gridPoints) {
        const dx = gp.x - x;
        const dz = gp.z - z;
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d > maxD) {
            continue;
        }

        const cacheKey = [gp.x, gp.z].join(':');
        if (!(cacheKey in gridValuesCache)) {
            gridValuesCache[cacheKey] = grid.generateForGridPoint(gp, layer) * layer.amplitude;
        }

        const value = gridValuesCache[cacheKey];

        sum += value * (maxD - d);
        denom += maxD - d;
    }

    return sum / denom;
}
