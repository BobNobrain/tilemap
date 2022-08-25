// import { RenderContext } from '../../ui/ctx';
// import type { CanvasCoords } from '../coords';
import type { Palette } from '../palette/types';
import type { SideTexture } from './SideTexture';
import type { TopTexture } from './TopSideTexture';

export interface TileTextures {
    top: TopTexture;
    left: SideTexture;
    right: SideTexture;
}

export interface TextureColors {
    primary: Palette;
    secondary: Palette;
    ternary: Palette;
}
