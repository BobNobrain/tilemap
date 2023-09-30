import { RenderContext } from '../../ui/ctx';
import { WorldCoords } from '../../lib/coords';
import { Coords2D } from '../coords';

export interface TileTextures {
    top: TopTexture;
    left: SideTexture;
    right: SideTexture;
}

export interface TileNeighbourhood {
    southElevationPx: number;
    eastElevationPx: number;
    isNorthOverhang: boolean;
    isWestOverhang: boolean;
}

export interface TopTextureRenderOptions {
    leftBorder: boolean;
    rightBorder: boolean;
    worldPosition: WorldCoords;
}
export interface TopTexture {
    render(ctx: RenderContext, where: Coords2D, opts: TopTextureRenderOptions): void;
}

export interface SideTextureRenderOptions {
    sideHeight: number;
    side: 'l' | 'r';
}
export interface SideTexture {
    render(ctx: RenderContext, where: Coords2D, opts: SideTextureRenderOptions): void;
}

export interface Tile {
    renderAt(ctx: RenderContext, coords: WorldCoords, nbh: TileNeighbourhood): void;
}
