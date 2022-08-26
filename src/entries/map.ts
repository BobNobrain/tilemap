import { Rect2D } from '../tilemap/coords';
import { World } from '../tilemap/world/world';
import { connectToDom } from '../ui/dom';

const world = new World();

connectToDom({
    render(ui) {
        const w4 = Math.floor(ui.ctx.width / 4);
        const h4 = Math.floor(ui.ctx.height / 4);
        const viewport: Rect2D = {
            topLeft: { top: -h4, left: -w4 },
            bottomRight: { top: h4, left: w4 },
        };

        const tiles = world.getTilesToRender(viewport);
        for (const t of tiles) {
            t.tile.renderAt(ui.ctx, t.position, t.neighbours);
        }

        ui.ctxRaw.strokeStyle = 'red';
        ui.ctxRaw.strokeRect(
            viewport.topLeft.left,
            viewport.topLeft.top,
            viewport.bottomRight.left - viewport.topLeft.left,
            viewport.bottomRight.top - viewport.topLeft.top,
        );
    },
    pixelSize: 6,
});

