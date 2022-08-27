import { RenderContext } from '../../ui/ctx';
import { Coords2D } from '../coords';
import { SideTexture, SideTextureRenderOptions } from './types';

export class EmptySideTexture implements SideTexture {
    render(ctx: RenderContext, where: Coords2D, opts: SideTextureRenderOptions): void { }
}
