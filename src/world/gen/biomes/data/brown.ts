import { RandomWheel } from '../../../../lib/math/RandomWheel';
import { BiomeType } from '../../../data/BiomeType';
import { TileMaterial } from '../../../data/TileMaterial';
import { BiomeGenerationData, MaterialGenerationData, ResourcesGenerationData } from '../types';

export const brownBiomeGenData: BiomeGenerationData = {
    biome: BiomeType.Brown,

    materials: new RandomWheel<MaterialGenerationData>()
        .sector({ material: TileMaterial.BrownRock }, 7)
        .sector({ material: TileMaterial.GrayRock }, 2)
        .sector({ material: TileMaterial.Ice }, 1),

    resources: new RandomWheel<ResourcesGenerationData>(),
};
