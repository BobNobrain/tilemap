import { RandomWheel } from '../../../../lib/math/RandomWheel';
import { BiomeType } from '../../../data/BiomeType';
import { TileMaterial } from '../../../data/TileMaterial';
import { BiomeGenerationData, MaterialGenerationData, ResourcesGenerationData } from '../types';

export const grayBiomeGenData: BiomeGenerationData = {
    biome: BiomeType.Gray,

    materials: new RandomWheel<MaterialGenerationData>()
        .sector({ material: TileMaterial.GrayRock }, 7)
        .sector({ material: TileMaterial.BrownRock }, 2)
        .sector({ material: TileMaterial.Ice }, 1),

    resources: new RandomWheel<ResourcesGenerationData>(),
};
