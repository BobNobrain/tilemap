import type { RandomWheel } from '../../../lib/math/RandomWheel';
import { BiomeType } from '../../data/BiomeType';
import { ResourceType } from '../../data/ResourceType';
import { TileMaterial } from '../../data/TileMaterial';

export type MaterialGenerationData = {
    material: TileMaterial;
};

export type ResourcesGenerationData = {
    resource: ResourceType;
    minAmount: number;
    maxAmount: number;
};

export interface BiomeGenerationData {
    biome: BiomeType;

    materials: RandomWheel<MaterialGenerationData>;
    resources: RandomWheel<ResourcesGenerationData>;
}
