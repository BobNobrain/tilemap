import { BiomeType } from '../../data/BiomeType';

export interface BiomeGeneratorInput {
    /** Biome temperature, 0-255 */
    temp: number;
    /** 0-255 */
    solidity: number;
    /** 0-255 */
    variation: number;
}

export function generateBiomeType(input: BiomeGeneratorInput): BiomeType {
    if (input.solidity < 32) {
        // nebulas
        if (input.temp < 128) {
            return BiomeType.ColdNebula;
        }

        return BiomeType.HotNebula;
    }

    if (input.solidity < 40) {
        return BiomeType.Void;
    }

    // rocks
    if (input.temp < 80) {
        return BiomeType.Icy;
    }

    if (input.variation < 128) {
        return BiomeType.Brown;
    }

    return BiomeType.Gray;
}
