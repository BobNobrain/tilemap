import { RandomWheel } from '../../../../lib/math/RandomWheel';
import { BiomeType } from '../../../data/BiomeType';
import { BiomeGenerationData } from '../types';

export const voidBiomeGenData: BiomeGenerationData = {
    biome: BiomeType.Void,
    materials: new RandomWheel(),
    resources: new RandomWheel(),
};
