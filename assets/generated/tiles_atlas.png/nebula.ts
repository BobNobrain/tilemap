import { RandomNumberGenerator } from '../../../src/lib/math/rng';
import { remapLinear } from '../../../src/lib/math/linear';
import { AtlasConstants } from '../../../src/renderer/tiles/atlas';
import { ImageGenerator } from '../../generator/image';

export type NebulaTilePalette = {
    primary: string[];
};

export type NebulaTileOptions = {
    adjacentLeftTop: boolean;
    adjacentLeftBottom: boolean;
    adjacentRightTop: boolean;
    adjacentRightBottom: boolean;
};

// const T = -1;
// prettier-ignore
// const TOP_TXDATA: number[] = [
//     T, 1,
//     1, T, T, T, 3, 1,
//     1, 1, 2, 1, 3, 3, T, 1, T, T,
//     1, 2, T, 1, T, 2, T, T, 1, T, 3, T, 1, T,
//     T, T, T, 1, 2, T, 3, 4, T, T, 1, T, 3, 3, 1, T,
// ];

enum TileZone { Dead, Top, LeftSide, RightSide }
const TILE_ZONES = ((): TileZone[][] => {
    const D = TileZone.Dead;
    const T = TileZone.Top;
    const L = TileZone.LeftSide;
    const R = TileZone.RightSide;
    return [
        [D, D, D, D, D, D, D, T, T, D, D, D, D, D, D, D],
        [D, D, D, D, D, T, T, T, T, T, T, D, D, D, D, D],
        [D, D, D, T, T, T, T, T, T, T, T, T, T, D, D, D],
        [D, T, T, T, T, T, T, T, T, T, T, T, T, T, T, D],
        [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
        [L, T, T, T, T, T, T, T, T, T, T, T, T, T, T, R],
        [L, L, L, T, T, T, T, T, T, T, T, T, T, R, R, R],
        [L, L, L, L, L, T, T, T, T, T, T, R, R, R, R, R],
        [L, L, L, L, L, L, L, T, T, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [D, L, L, L, L, L, L, L, R, R, R, R, R, R, R, D],
        [D, D, D, L, L, L, L, L, R, R, R, R, R, D, D, D],
        [D, D, D, D, D, L, L, L, R, R, R, D, D, D, D, D],
        [D, D, D, D, D, D, D, L, R, D, D, D, D, D, D, D],
    ];
})();

const MASS_CENTER_X = AtlasConstants.TILE_WIDTH / 2 - 0.5;
const MASS_CENTER_Y = (AtlasConstants.TOP_SIDE_HEIGHT * 2) / 3 - 0.5;
const EMPTY_PIXELS_SHARE = 0.2;

export function createNebulaTile(palette: NebulaTilePalette, opts: NebulaTileOptions): ImageGenerator {
    const rng = new RandomNumberGenerator('pretty-nebula');
    const nColors = palette.primary.length;
    const maxNoise = Math.floor(nColors / 3);

    return {
        getSize: () => ({
            width: AtlasConstants.TILE_WIDTH,
            height:
                opts.adjacentLeftBottom && opts.adjacentRightBottom
                    ? AtlasConstants.TOP_SIDE_HEIGHT
                    : AtlasConstants.TILE_FULL_HEIGHT,
        }),
        draw: (canvas) => {
            const ctx = canvas.getContext('2d');

            for (let x = 0; x < AtlasConstants.TILE_WIDTH; ++x) {
                for (let y = 0; y < AtlasConstants.TILE_FULL_HEIGHT; ++y) {
                    const zone = TILE_ZONES[y][x];

                    if (
                        zone === TileZone.Dead ||
                        (zone === TileZone.LeftSide && opts.adjacentLeftBottom) ||
                        (zone === TileZone.RightSide && opts.adjacentRightBottom)
                    ) {
                        continue;
                    }

                    const rand = rng.forInts([x, y]);
                    if (rand() < EMPTY_PIXELS_SHARE) {
                        continue;
                    }

                    const xZone = x < MASS_CENTER_X ? 0 : 1;
                    const yZone = y < MASS_CENTER_Y ? 0 : 2;

                    const hasAdjacent = [
                        opts.adjacentLeftTop,
                        opts.adjacentRightTop,
                        opts.adjacentLeftBottom,
                        opts.adjacentRightBottom,
                    ][xZone + yZone];

                    let fadeFactor = 0;
                    if (!hasAdjacent) {
                        const dx = MASS_CENTER_X - x;
                        const dy = MASS_CENTER_Y - y; // should fade out ~twice as fast, due to view angle
                        fadeFactor = Math.sqrt(dx * dx + dy * dy) / AtlasConstants.TILE_SIDE_WIDTH;
                    }

                    const colorIndex = remapLinear(fadeFactor, { start: 1.3, end: 0 }, { start: 0, end: nColors });
                    const noise = remapLinear(rand(), { start: 0, end: 1 }, { start: -maxNoise, end: maxNoise });

                    const noisedColorIndex = Math.floor(Math.max(0, Math.min(colorIndex + noise, nColors)));

                    if (noisedColorIndex < 0) {
                        continue;
                    } else if (noisedColorIndex < nColors) {
                        ctx.fillStyle = palette.primary[noisedColorIndex];
                    } else {
                        ctx.fillStyle = palette.primary[nColors - 1];
                    }

                    ctx.fillRect(x, y, 1, 1);
                }
            }
        },
    };
}
