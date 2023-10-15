import { RANDOM_INPUT_MAX, RANDOM_INPUT_SPAN, RandomInput, scaleRandomInput } from '../../../lib/math/RandomInput';
import { LinearSpan, remapLinear } from '../../../lib/math/linear';
import { BIOMES, BiomeType } from '../../data/BiomeType';
import { TileData } from '../../data/TileData';
import { TileMaterial } from '../../data/TileMaterial';
import { genDataPerBiome } from '../biomes';

export interface TileGeneratorInput {
    biome: BiomeType;
    solidity: RandomInput;
    elevation: RandomInput;
    variation: RandomInput;

    resourceDensity: RandomInput;
    resourceVariation: RandomInput;
}

// const EMPTINESS_HEIGHT_BOUNDARY = Math.floor(0.6 * RANDOM_INPUT_MAX);
// const ROCKS_HEIGHT_SPAN = RANDOM_INPUT_MAX - EMPTINESS_HEIGHT_BOUNDARY;

export function generateChunkTile(input: TileGeneratorInput): TileData {
    const result: TileData = {
        material: TileMaterial.Void,
        elevation: 0,
        resources: [],
    };

    if (BIOMES[input.biome].isVoid) {
        return result;
    }

    const elevationSpan = getElevationSpan(input);

    if (input.elevation <= elevationSpan.start) {
        return result;
    }

    const elevation = remapLinear(input.elevation, RANDOM_INPUT_SPAN, elevationSpan);

    const genData = genDataPerBiome[input.biome];

    result.material = genData.materials.pick(input.variation).material;
    result.elevation = elevation;

    return result;
}

const NEBULA_DITHER_ROUGHNESS = 4;
const NEBULA_DITHER_SCALE = 64;
const NEBULA_DITHER_MULTIPLIER = NEBULA_DITHER_SCALE / NEBULA_DITHER_ROUGHNESS;

function getElevationSpan(input: TileGeneratorInput): LinearSpan {
    if (BIOMES[input.biome].isNebula) {
        const dither = input.variation % NEBULA_DITHER_ROUGHNESS;

        const start =
            scaleRandomInput(
                RANDOM_INPUT_MAX - input.solidity,
                32 + NEBULA_DITHER_SCALE,
                RANDOM_INPUT_MAX - NEBULA_DITHER_SCALE,
            ) +
            dither * NEBULA_DITHER_MULTIPLIER;
        return { start, end: RANDOM_INPUT_MAX };
    }

    // solid
    const start = scaleRandomInput(RANDOM_INPUT_MAX - input.solidity, 128, 215);
    return { start, end: RANDOM_INPUT_MAX };
}
