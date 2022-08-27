import { RenderContext } from '../../ui/ctx';
import { Coords2D, WorldCoords } from '../coords';
import type { Palette } from '../palette/types';

export interface TileTextures {
    top: TopTexture;
    left: SideTexture;
    right: SideTexture;
}

export interface TextureColors {
    primary: Palette;
    secondary: Palette;
    ternary: Palette;

    white: string;
    black: string;
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
