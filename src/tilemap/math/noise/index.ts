import { WorldCoords } from '../../coords';
import { RandomNumberGenerator } from '../rng';
import type { NoiseLayer } from './layer';
import { SquareLayer } from './square';
import { TriangularLayer } from './triangle';

export interface NoiseGeneratorConfig {
    seed?: string;
    octaves?: number;
    damping?: number;
    gridSize?: number;
    min: number;
    max: number;
}

export class NoiseGenerator {
    private seed: string;
    private min: number;
    private max: number;

    private gridValuesCache: Record<string, number> = {};
    private rng: RandomNumberGenerator;
    private layers: NoiseLayer[] = [];

    constructor({
        seed = String(Date.now()),
        octaves = 4,
        damping = 0.5,
        gridSize = 10,
        min,
        max,
    }: NoiseGeneratorConfig) {
        this.seed = seed;
        this.min = min;
        this.max = max;

        this.rng = new RandomNumberGenerator(seed);

        let amplSum = 0;
        let ampl = 1;
        const amplitudes: number[] = [];
        for (let i = 0; i < octaves; i++) {
            amplitudes.push(ampl);
            amplSum += ampl;
            ampl *= damping;
        }

        let size = gridSize;
        for (let i = 0; i < octaves; i++) {
            const amplitude = amplitudes[i] / amplSum;
            this.layers.push(new TriangularLayer({
                rng: this.rng,
                gridSize: size,
                amplitude,
            }));
            size = Math.round(size / 2);
        }
    }

    getSeed(): string {
        return this.seed;
    }
    dbg() {
        console.log(this.gridValuesCache);
        console.log(this.rng);
    }

    generateAt(coords: WorldCoords): number {
        let result = 0;
        for (const l of this.layers) {
            result += l.generateAt(coords);
        }
        return Math.floor(this.min + (this.max - this.min) * result);
    }
}
