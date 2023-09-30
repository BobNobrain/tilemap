import { RandomWheel } from '../../../../lib/math/RandomWheel';
import { BiomeType } from '../../../data/BiomeType';
import { TileMaterial } from '../../../data/TileMaterial';
import { BiomeGenerationData, MaterialGenerationData, ResourcesGenerationData } from '../types';

export const hotNebulaBiomeGenData: BiomeGenerationData = {
    biome: BiomeType.HotNebula,

    materials: new RandomWheel<MaterialGenerationData>().sector({ material: TileMaterial.RedNebula }, 1),

    resources: new RandomWheel<ResourcesGenerationData>(),
};
