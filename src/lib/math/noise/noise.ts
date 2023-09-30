import { RANDOM_INPUT_MAX, RANDOM_INPUT_MIN } from '../RandomInput';
import { RandomNumberGenerator } from '../rng';
import {
    NoiseGrid,
    NoiseLayerConfig,
    displacedSquareGrid,
    generateLayerValue,
    squareGrid,
    triangularGrid,
} from './layers';

export type NoiseGeneratorConfig = {
    seed: string;
    gridSize?: number;
    min?: number;
    max?: number;
    octaves?: number;
    damping?: number;
    layerType?: NoiseLayerType;
};

export enum NoiseLayerType {
    Square,
    DisplacedSquare,
    Triangular,
}

const DEFAULT_OPTS: Required<NoiseGeneratorConfig> = {
    seed: '',
    gridSize: 32,
    min: RANDOM_INPUT_MIN,
    max: RANDOM_INPUT_MAX,
    octaves: 3,
    damping: 0.5,
    layerType: NoiseLayerType.Triangular,
};

export class NoiseGenerator {
    private config: Required<NoiseGeneratorConfig>;

    private gridValuesCaches: Record<string, number>[] = [];
    private rng: RandomNumberGenerator;
    private layers: NoiseLayerConfig[] = [];
    private grid: NoiseGrid;

    constructor(config: NoiseGeneratorConfig) {
        this.config = Object.assign(DEFAULT_OPTS, config);
        console.log(this.config);

        this.rng = new RandomNumberGenerator(this.config.seed);

        let amplSum = 0;
        let ampl = 1;
        const amplitudes: number[] = [];
        for (let i = 0; i < this.config.octaves; i++) {
            amplitudes.push(ampl);
            amplSum += ampl;
            ampl *= this.config.damping;
        }

        let size = this.config.gridSize;
        for (let i = 0; i < this.config.octaves; i++) {
            const amplitude = amplitudes[i] / amplSum;
            this.layers.push({
                amplitude,
                gridSize: size,
                rng: this.rng,
            });
            this.gridValuesCaches.push({});
            size = Math.round(size / 2);
        }

        switch (this.config.layerType) {
            case NoiseLayerType.DisplacedSquare:
                this.grid = displacedSquareGrid;
                break;

            case NoiseLayerType.Square:
                this.grid = squareGrid;
                break;

            case NoiseLayerType.Triangular:
                this.grid = triangularGrid;
                break;
        }
    }

    getSeed(): string {
        return this.config.seed;
    }

    generate(x: number, z: number): number {
        let result = 0;
        for (let i = 0; i < this.layers.length; i++) {
            result += generateLayerValue(x, z, this.layers[i], this.grid, this.gridValuesCaches[i]);
        }
        const { min, max } = this.config;
        return Math.floor(min + (max - min) * result);
    }
}
