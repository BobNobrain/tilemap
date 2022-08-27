import { Rect2D } from '../tilemap/coords';
import { World } from '../tilemap/world/world';
import { connectToDom } from '../ui/dom';

const world = new World();

connectToDom({
    render(ui) {
        const w2 = Math.floor(ui.ctx.width / 2);
        const h2 = Math.floor(ui.ctx.height / 2);
        const viewport: Rect2D = {
            topLeft: { top: -h2 + 10, left: -w2 + 10 },
            bottomRight: { top: h2 - 10, left: w2 - 10 },
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
    tickTimeMs: 33,
});

