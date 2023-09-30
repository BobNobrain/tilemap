import { RANDOM_INPUT_MAX, RandomInput } from '../../../lib/math/RandomInput';
import { BiomeType } from '../../data/BiomeType';
import { TileData } from '../../data/TileData';
import { TileMaterial } from '../../data/TileMaterial';
import { genDataPerBiome } from '../biomes';

export interface TileGeneratorInput {
    biome: BiomeType;
    elevation: RandomInput;
    variation: RandomInput;

    resourceDensity: RandomInput;
    resourceVariation: RandomInput;
}

const EMPTINESS_HEIGHT_BOUNDARY = Math.floor(0.6 * RANDOM_INPUT_MAX);
const ROCKS_HEIGHT_SPAN = RANDOM_INPUT_MAX - EMPTINESS_HEIGHT_BOUNDARY;

export function generateChunkTile(input: TileGeneratorInput): TileData {
    const result: TileData = {
        material: TileMaterial.Void,
        elevation: 0,
        resources: [],
    };

    if (input.biome === BiomeType.Void) {
        return result;
    }

    if (input.elevation <= EMPTINESS_HEIGHT_BOUNDARY) {
        return result;
    }

    const elevation = (input.elevation - EMPTINESS_HEIGHT_BOUNDARY) / ROCKS_HEIGHT_SPAN + 1;

    const genData = genDataPerBiome[input.biome];

    result.material = genData.materials.pick(input.variation).material;
    result.elevation = elevation;

    return result;
}
