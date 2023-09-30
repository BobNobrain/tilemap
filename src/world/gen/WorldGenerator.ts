import { WorldCoords } from '../../lib/coords';
import { RANDOM_INPUT_MAX, RANDOM_INPUT_MIN } from '../../lib/math/RandomInput';
import { NoiseGenerator } from '../../lib/math/noise';
import { BiomeType } from '../data/BiomeType';
import { ChunkData } from '../data/ChunkData';
import { TileMaterial } from '../data/TileMaterial';
import { ChunkCoords, getChunkBoundaries } from '../data/coords';
import { generateBiomeType } from './biomes';

export interface WorldGeneratorOptions {
    seed: string;
}

export class WorldGenerator {
    // private biomeTemp: NoiseGenerator;
    // private biomeVariation: NoiseGenerator;
    private biomeNoise: NoiseGenerator;
    private elevationNoise: NoiseGenerator;

    constructor(private options: WorldGeneratorOptions) {
        this.biomeNoise = new NoiseGenerator({
            seed: options.seed,
            min: RANDOM_INPUT_MIN,
            max: RANDOM_INPUT_MAX,
            octaves: 2,
            gridSize: 32,
        });

        this.elevationNoise = new NoiseGenerator({
            seed: options.seed,
            min: RANDOM_INPUT_MIN,
            max: RANDOM_INPUT_MAX,
            octaves: 3,
            gridSize: 16,
        });
    }

    generateChunk(at: Readonly<ChunkCoords>): ChunkData {
        const chunk: ChunkData = {
            biome: this.generateBiome(at),
            tiles: [],
        };

        // const bounds = getChunkBoundaries(at);
        // for (let x = bounds.minX; x < bounds.maxX; x++) {
        //     for (let z = bounds.minZ; z < bounds.maxZ; z++) {
        //         const tileCoords: WorldCoords = { x, y: 0, z };
        //         const elevation = this.generateElevation(tileCoords);

        //         if (elevation === 0) {
        //             chunk.tiles.push({
        //                 material: TileMaterial.Void,
        //                 resources: [],
        //             });
        //             continue;
        //         }

        //         chunk.tiles.push({
        //             material: this.generateTileMaterial(tileCoords),
        //             resources: [],
        //         });
        //     }
        // }

        return chunk;
    }

    private generateBiome(at: Readonly<ChunkCoords>): BiomeType {
        return generateBiomeType({
            solidity: 0,
            temp: 0,
            variation: 0,
        });
    }

    private generateTileMaterial(at: Readonly<WorldCoords>): TileMaterial {
        const biome = this.generateBiome({ chunkX: 0, chunkZ: 0 });
        switch (biome) {
            case BiomeType.Brown:
                return TileMaterial.BrownRock;
            case BiomeType.Gray:
                return TileMaterial.GrayRock;
            case BiomeType.Icy:
                return TileMaterial.Ice;

            default:
                return TileMaterial.Void;
        }
    }
}
