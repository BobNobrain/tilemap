import { canvasToWorld, ceilWorldCoords, floorWorldCoords } from '.';
import { Rect2D, WorldCoords } from './types';

export function* iterateWorldCoordsInViewport(viewport: Readonly<Rect2D>): Generator<WorldCoords> {
    const start = floorWorldCoords(canvasToWorld(viewport.topLeft, 0));
    const end = ceilWorldCoords(canvasToWorld(viewport.bottomRight, 0));

    const diagTop = start.x - start.z + 1;
    const diagBottom = end.x - end.z - 1;
    const diagLeft = start.x + start.z;
    const diagRight = end.x + end.z;

    for (let v = diagTop; v <= diagBottom; v += 1) {
        for (let h = diagLeft; h <= diagRight; h += 1) {
            if (Math.abs(v + h) % 2 !== 0) {
                continue;
            }
            // h = x + z
            // v = x - z
            // =>
            // x = (h + v) / 2
            // z = (h - v) / 2
            yield {
                x: (h + v) / 2,
                y: 0,
                z: (h - v) / 2,
            };
        }
    }
}
