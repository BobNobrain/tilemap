import { WorldCoords, WORLD_ZERO } from '../lib/coords';
import { grassTile } from '../renderer/tiles/grass';
import { sandTile } from '../renderer/tiles/sand';
import { connectToDom } from '../ui/dom';

connectToDom({
    pixelSize: 8,
    tickTimeMs: 33,
    render(ui) {
        grassTile.renderAt(ui.ctx, WORLD_ZERO, {
            southElevationPx: 4,
            eastElevationPx: 2,
            isNorthOverhang: false,
            isWestOverhang: false,
         });

        // const N = 5;
        // for (let x = -N; x <= N; x++) {
        //     for (let z = -N; z <= N; z++) {
        //         const coords: WorldCoords = { x, y: 0, z };
        //         const h = z === -N || x === N ? 8 : 0;
        //         if (Math.random() < 0.5) {
        //             grassTile.renderAt(ui.ctx, coords, h);
        //         } else {
        //             sandTile.renderAt(ui.ctx, coords, h);
        //         }
        //     }
        // }
    },
});


