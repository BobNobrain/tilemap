import { NoiseGenerator } from '../../lib/math/noise';
// import { BiomeType } from '../data/BiomeType';
import { ChunkData } from '../data/ChunkData';
import { ChunkCoords, getChunkBoundaries } from '../data/coords';
import { generateBiomeType } from './biomes';
import { generateChunkTile } from './tiles';

export interface WorldGeneratorOptions {
    seed: string;
}

export class WorldGenerator {
    private biomeSolidity: NoiseGenerator;
    private biomeTemp: NoiseGenerator;
    private biomeVariation: NoiseGenerator;
    private elevation: NoiseGenerator;
    private tileVariation: NoiseGenerator;

    constructor(private options: WorldGeneratorOptions) {
        this.biomeSolidity = new NoiseGenerator({
            seed: options.seed + ':bs',
            octaves: 2,
            gridSize: 64,
        });

        this.biomeTemp = new NoiseGenerator({
            seed: options.seed + ':bt',
            octaves: 3,
            gridSize: 128,
        });

        this.biomeVariation = new NoiseGenerator({
            seed: options.seed + ':bv',
            octaves: 2,
            gridSize: 64,
        });

        this.elevation = new NoiseGenerator({
            seed: options.seed + ':ev',
            octaves: 4,
            gridSize: 32,
            damping: 0.7,
        });

        this.tileVariation = new NoiseGenerator({
            seed: options.seed + ':tv',
            octaves: 2,
            gridSize: 16,
        });
    }

    generateChunk(at: Readonly<ChunkCoords>, opts: { debug?: boolean } = {}): ChunkData {
        const chunk: ChunkData = {
            // biome: this.generateBiome(at),
            tiles: [],
        };

        const bounds = getChunkBoundaries(at);
        for (let x = bounds.minX; x < bounds.maxX; x++) {
            for (let z = bounds.minZ; z < bounds.maxZ; z++) {
                const temp = this.biomeTemp.generate(x, z);
                const biomeVariation = this.biomeVariation.generate(x, z);

                const biome = generateBiomeType({
                    solidity: this.biomeSolidity.generate(x, z),
                    temp,
                    variation: biomeVariation,
                });

                const elevation = this.elevation.generate(x, z);
                const tileVariation = this.tileVariation.generate(x, z);

                const tile = generateChunkTile({
                    biome: biome.type,
                    elevation,
                    solidity: biome.solidity,
                    resourceDensity: 0,
                    resourceVariation: 0,
                    variation: tileVariation,
                });

                if (opts.debug) {
                    tile.debug = {
                        solidity: biome.solidity,
                        temp,
                        biomeVariation: biomeVariation,
                        tileVariation,
                        elevation,
                        biome: biome.type,
                    };
                }

                chunk.tiles.push(tile);
            }
        }

        return chunk;
    }
}
