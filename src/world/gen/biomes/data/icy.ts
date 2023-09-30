import { RandomWheel } from '../../../../lib/math/RandomWheel';
import { BiomeType } from '../../../data/BiomeType';
import { TileMaterial } from '../../../data/TileMaterial';
import { BiomeGenerationData, MaterialGenerationData, ResourcesGenerationData } from '../types';

export const icyBiomeGenData: BiomeGenerationData = {
    biome: BiomeType.Icy,

    materials: new RandomWheel<MaterialGenerationData>()
        .sector({ material: TileMaterial.Ice }, 80)
        .sector({ material: TileMaterial.GrayRock }, 15)
        .sector({ material: TileMaterial.BrownRock }, 5),

    resources: new RandomWheel<ResourcesGenerationData>(),
};
