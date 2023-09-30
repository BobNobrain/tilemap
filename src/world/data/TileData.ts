import { ResourceType } from './ResourceType';
import { TileMaterial } from './TileMaterial';

export interface TileResource {
    type: ResourceType;
    /** 0-255 */
    amount: number;
}

export interface TileData {
    material: TileMaterial;
    elevation: number;

    resources: TileResource[];
}
