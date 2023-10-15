import { RandomNumberGenerator } from '../../../src/lib/math/rng';
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
        [D, T, T, T, T, T, T, T, T, T, T, T, T, T, T, D],
        [D, D, D, T, T, T, T, T, T, T, T, T, T, D, D, D],
        [D, D, D, D, D, T, T, T, T, T, T, D, D, D, D, D],
        [D, D, D, D, D, D, D, T, T, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
        [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D],
    ];
})();

export function createNebulaTile(palette: NebulaTilePalette, opts: NebulaTileOptions): ImageGenerator {
    const rng = new RandomNumberGenerator('nebula').detached();

    return {
        getSize: () => ({
            width: AtlasConstants.TILE_WIDTH,
            height: AtlasConstants.TILE_FULL_HEIGHT,
        }),
        draw: (canvas) => {},
    };
}
