import { Coords2D, round2DCoords } from '../coords';

export interface Line {
    start: Coords2D;
    end: Coords2D;
}

export function* linePixels({start, end}: Line): Generator<Coords2D> {
    const intStart = round2DCoords(start);
    const intEnd = round2DCoords(end);

    const dHor = intEnd.left - intStart.left;
    const dVer = intEnd.top - intStart.top;
    const n = Math.max(dVer, dHor);

    const stepHor = dHor / n;
    const stepVer = dVer / n;

    for (let i = 0; i < n; i++) {
        const nextPixel: Coords2D = {
            left: intStart.left + Math.round(i * stepHor),
            top: intStart.top + Math.round(i * stepVer),
        }
        yield nextPixel;
    }
}