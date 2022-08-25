import { WorldCoords, WORLD_ZERO } from '../tilemap/coords';
import { grassTile } from '../tilemap/tiles/grass';
import { sandTile } from '../tilemap/tiles/sand';
import { connectToDom } from '../ui/dom';

connectToDom({
    pixelSize: 8,
    render(ui) {
        grassTile.renderAt(ui.ctx, WORLD_ZERO, {
            leftElevationPx: 4,
            rightElevationPx: 2,
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


