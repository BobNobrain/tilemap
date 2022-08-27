import type { RenderContext } from '../../ui/ctx';
import type { WorldCoords } from '../coords';

export interface WorldObject {
    render(ctx: RenderContext, coords: Readonly<WorldCoords>): void;
}
