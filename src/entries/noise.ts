import { WorldCoords } from '../tilemap/coords';
import { NoiseGenerator } from '../tilemap/math/noise';
import { connectToDom } from '../ui/dom';

const gen = new NoiseGenerator({
    seed: '1337',
    octaves: 3,
    gridSize: 20,
    min: 0,
    max: 255,
});

const SIZE = 50;

connectToDom({
    pixelSize: 4,
    tickTimeMs: 0,
    render: (ui) => {
        for (let x = -SIZE; x <= SIZE; x++) {
            for (let z = -SIZE; z <= SIZE; z++) {
                const point: WorldCoords = { x, y: 0, z };
                const r = Math.max(0, Math.min(Math.floor(gen.generateAt(point)), 255));
                const clr = `rgb(${r},${r},${r})`;
                ui.ctx.putPixel(clr, x, z);
            }
        }

        gen.dbg();
    }
})
