export enum BiomeType {
    Void = 0,
    Gray,
    Brown,
    Icy,
    ColdNebula,
    HotNebula,
}

export interface BiomeInfo {
    isVoid?: boolean;
    isSolid?: boolean;
    isNebula?: boolean;
}

export const BIOMES: Record<BiomeType, BiomeInfo> = {
    [BiomeType.Void]: {
        isVoid: true,
    },
    [BiomeType.Gray]: {
        isSolid: true,
    },
    [BiomeType.Brown]: {
        isSolid: true,
    },
    [BiomeType.Icy]: {
        isSolid: true,
    },
    [BiomeType.ColdNebula]: {
        isNebula: true,
    },
    [BiomeType.HotNebula]: {
        isNebula: true,
    },
};
