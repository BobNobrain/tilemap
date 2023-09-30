import { BiomeType } from '../../../data/BiomeType';
import { BiomeGenerationData } from '../types';
import { coldNebulaBiomeGenData } from './coldNebula';
import { brownBiomeGenData } from './brown';
import { grayBiomeGenData } from './gray';
import { hotNebulaBiomeGenData } from './hotNebula';
import { icyBiomeGenData } from './icy';
import { voidBiomeGenData } from './void';

export const allBiomesGenData = [
    voidBiomeGenData,
    grayBiomeGenData,
    brownBiomeGenData,
    icyBiomeGenData,
    coldNebulaBiomeGenData,
    hotNebulaBiomeGenData,
];

export const genDataPerBiome = Object.fromEntries(allBiomesGenData.map((data) => [data.biome, data])) as Record<
    BiomeType,
    BiomeGenerationData
>;
