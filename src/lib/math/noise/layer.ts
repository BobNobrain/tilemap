import { distance, WorldCoords } from '../../coords';
import type { RandomNumberGenerator } from '../rng';

export interface NoiseLayerConfig {
    rng: RandomNumberGenerator;
    gridSize: number;
    amplitude: number;
}

export abstract class NoiseLayer {
    protected gridSize: number;
    protected ampl: number;

    protected rng: RandomNumberGenerator;

    private gridValuesCache: Record<string, number> = {};

    constructor({
        rng,
        gridSize,
        amplitude,
    }: NoiseLayerConfig) {
        this.gridSize = gridSize;
        this.ampl = amplitude;

        this.rng = rng;
    }

    public generateAt(coords: WorldCoords): number {
        const grid = this.getNearestGridPoints(coords);
        let sum = 0;
        let denom = 0;
        const maxD = this.getMaxDistanceToGridPoint();
        for (const gp of grid) {
            // if (coords.x === gp.x && coords.z === gp.z) {
            //     return 1;
            // }
            const d = distance(coords, gp);
            if (d > maxD) {
                continue;
            }
            const value = this.getRndForGridPoint(gp);
            sum += value * (maxD - d);
            denom += maxD - d;
        }
        // return 0;
        return sum / denom;
    }

    protected getRndForGridPoint(gp: WorldCoords): number {
        const key = [gp.x, gp.z].join(':');
        if (!(key in this.gridValuesCache)) {
            this.gridValuesCache[key] = this.inRange(this.generateForGridPoint(gp));
        }

        return this.gridValuesCache[key];
    }

    protected abstract getNearestGridPoints(to: WorldCoords): WorldCoords[];
    protected abstract generateForGridPoint(gp: WorldCoords): number;
    protected abstract getMaxDistanceToGridPoint(): number;

    private inRange(input: number): number {
        return input * this.ampl;
    }
}
