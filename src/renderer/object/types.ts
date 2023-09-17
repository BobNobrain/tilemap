import type { WorldCoords } from '../../lib/coords';
import type { RenderContext } from '../../ui/ctx';

export interface WorldObject {
    render(ctx: RenderContext, coords: Readonly<WorldCoords>): void;
}
