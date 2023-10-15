import { RANDOM_INPUT_MAX, RANDOM_INPUT_MIN, RANDOM_INPUT_SPAN, RandomInput } from '../../../lib/math/RandomInput';
import { LinearSpan, invert, remapLinear } from '../../../lib/math/linear';
import { BiomeType } from '../../data/BiomeType';

export interface BiomeGeneratorInput {
    temp: RandomInput;
    solidity: RandomInput;
    variation: RandomInput;
}

export interface BiomeGeneratorOutput {
    type: BiomeType;
    solidity: RandomInput;
}

const NEBULA_SOLIDITY_SPAN: LinearSpan = { start: RANDOM_INPUT_MIN, end: 32 };
const ROCKS_SOLIDITY_SPAN: LinearSpan = { start: 52, end: RANDOM_INPUT_MAX };

const ICY_ROCKS_TEMP = 80;
const COLD_NEBULA_TEMP = 126 - 16;
const HOT_NEBULA_TEMP = 128 + 16;

const BROWN_ROCKS_CHANCE = 64;

const VOID: BiomeGeneratorOutput = {
    type: BiomeType.Void,
    solidity: 0,
};

export function generateBiomeType(input: BiomeGeneratorInput): BiomeGeneratorOutput {
    if (input.solidity < NEBULA_SOLIDITY_SPAN.end) {
        return generateNebula(input);
    }

    if (input.solidity < ROCKS_SOLIDITY_SPAN.start) {
        return VOID;
    }

    // rocks
    return generateRocks(input);
}

function generateNebula(input: BiomeGeneratorInput): BiomeGeneratorOutput {
    if (input.temp > COLD_NEBULA_TEMP && input.temp <= HOT_NEBULA_TEMP) {
        return VOID;
    }

    const result: BiomeGeneratorOutput = {
        type: input.temp <= COLD_NEBULA_TEMP ? BiomeType.ColdNebula : BiomeType.HotNebula,
        solidity: Math.floor(remapLinear(input.solidity, invert(NEBULA_SOLIDITY_SPAN), RANDOM_INPUT_SPAN)),
    };

    return result;
}

function generateRocks(input: BiomeGeneratorInput): BiomeGeneratorOutput {
    const solidity = Math.floor(remapLinear(input.solidity, ROCKS_SOLIDITY_SPAN, RANDOM_INPUT_SPAN));

    if (input.temp < ICY_ROCKS_TEMP) {
        return {
            type: BiomeType.Icy,
            solidity,
        };
    }

    if (input.variation < BROWN_ROCKS_CHANCE) {
        return {
            type: BiomeType.Brown,
            solidity,
        };
    }

    return {
        type: BiomeType.Gray,
        solidity,
    };
}
