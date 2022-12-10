import { Coords2D, HALF_TILE_HEIGHT } from '../coords';

function createTileRowLengths(): number[] {
    const result: number[] = [];

    let n = 2;
    for (let i = 0; i < HALF_TILE_HEIGHT - 1; i++) {
        result.push(n);
        n += 4;
    }
    result.push(n + 2);
    for (let i = 0; i < HALF_TILE_HEIGHT - 1; i++) {
        result.push(n);
        n -= 4;
    }

    return result;
}
function createTileColLengths(): number[] {
    const result: number[] = [];

    let n = 1;
    // TODO
    // for (let i = 0; i < HALF_TILE_HEIGHT - 1; i++) {
    //     result.push(n);
    //     n += 4;
    // }
    // result.push(n + 2);
    // for (let i = 0; i < HALF_TILE_HEIGHT - 1; i++) {
    //     result.push(n);
    //     n -= 4;
    // }

    return result;
}

const TILE_ROW_LENGTHS = createTileRowLengths();
const TILE_COL_LENGTHS = createTileColLengths();
export const TILE_PIXEL_COUNT = TILE_ROW_LENGTHS.reduce((sum, n) => sum + n, 0);

export function tilePixelNumberToCoords(pixelNumber: number): Coords2D | null {
    if (pixelNumber < 0 || pixelNumber >= TILE_PIXEL_COUNT) {
        return null;
    }

    let n = pixelNumber;

    for (let y = 0; y < TILE_ROW_LENGTHS.length; y++) {
        const rowLength = TILE_ROW_LENGTHS[y];

        if (n < rowLength) {
            return {
                left: n,
                top: y,
            };
        }

        n -= rowLength;
    }

    return null;
}
// export function coordsToTilePixelNumber({ left, top }: Readonly<Coords2D>): number | undefined {}

interface Dimensions2D {
    width: number;
    height: number;
}
export function getRandomRectLocationInTile(dims: Dimensions2D): Coords2D {
    // TODO
}
