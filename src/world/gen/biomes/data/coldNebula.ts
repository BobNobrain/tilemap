import { RandomWheel } from '../../../../lib/math/RandomWheel';
import { BiomeType } from '../../../data/BiomeType';
import { TileMaterial } from '../../../data/TileMaterial';
import { BiomeGenerationData, MaterialGenerationData, ResourcesGenerationData } from '../types';

export const coldNebulaBiomeGenData: BiomeGenerationData = {
    biome: BiomeType.ColdNebula,

    materials: new RandomWheel<MaterialGenerationData>().sector({ material: TileMaterial.BlueNebula }, 1),

    resources: new RandomWheel<ResourcesGenerationData>(),
};
