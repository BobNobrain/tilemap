import { Coords2D, Rect2D } from '../renderer/coords';
import { World } from '../world/world';
import { connectToDom } from '../ui/dom';

const seed = new URLSearchParams(document.location.search.substring(1)).get('seed') ?? 'deadmouse';
const world = new World(seed);
let skyViewport: Rect2D | null = null;
let stars: Coords2D[] = [];

connectToDom({
    render(ui) {
        const w2 = Math.floor(ui.ctx.width / 2);
        const h2 = Math.floor(ui.ctx.height / 2);
        const viewport: Rect2D = {
            topLeft: { top: -h2 + 10, left: -w2 + 10 },
            bottomRight: { top: h2 - 10, left: w2 - 10 },
        };

        ui.ctxRaw.fillStyle = 'black';
        ui.ctxRaw.fillRect(-w2, -h2, ui.ctx.width, ui.ctx.height);

        if (
            !skyViewport ||
            skyViewport.topLeft.top !== viewport.topLeft.top ||
            skyViewport.topLeft.left !== viewport.topLeft.left ||
            skyViewport.bottomRight.left !== viewport.bottomRight.left ||
            skyViewport.bottomRight.top !== viewport.bottomRight.top
        ) {
            skyViewport = viewport;
            stars = world.getStars(skyViewport);
        }

        for (const star of stars) {
            ui.ctx.putPixel('#fff', star.left, star.top);
        }

        const renderTasks = world.getTilesToRender(viewport);
        for (const t of renderTasks) {
            t(ui.ctx);
        }

        ui.ctxRaw.strokeStyle = 'red';
        ui.ctxRaw.strokeRect(
            viewport.topLeft.left,
            viewport.topLeft.top,
            viewport.bottomRight.left - viewport.topLeft.left,
            viewport.bottomRight.top - viewport.topLeft.top,
        );
    },
    pixelSize: 2,
    tickTimeMs: 1000,
});
