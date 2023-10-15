import { createAtlas } from '../../generator/atlas';
import { runImageGenerator } from '../../generator/image';
import type { AssetGenerator } from '../../generator/types';
import { ICY_BLUE_SHADES, ROCKY_BROWN_SHADES, ROCKY_GRAY_SHADES } from './colors';
import { SolidTilePalette, createSolidTile } from './solid';

function getTileCombinations(palette: SolidTilePalette) {
    return [
        createSolidTile(palette, { leftSide: false, rightSide: false, leftBorder: false, rightBorder: false }),
        createSolidTile(palette, { leftSide: true, rightSide: true, leftBorder: true, rightBorder: true }),
    ];
}

function transpose<T>(tss: T[][]): T[][] {
    const transposed = new Array<T[]>(tss.reduce((acc, next) => Math.max(acc, next.length), 0));
    for (let i = 0; i < transposed.length; i++) {
        transposed[i] = tss.map((ts) => ts[i]);
    }
    return transposed;
}

const GRAY_ROCK_PALETTE: SolidTilePalette = { primary: ROCKY_GRAY_SHADES };
const BROWN_ROCK_PALETTE: SolidTilePalette = { primary: ROCKY_BROWN_SHADES, secondary: ROCKY_GRAY_SHADES };
const ICE_PALETTE: SolidTilePalette = { primary: ICY_BLUE_SHADES };

export const generate: AssetGenerator = () => {
    const atlas = createAtlas(transpose([GRAY_ROCK_PALETTE, BROWN_ROCK_PALETTE, ICE_PALETTE].map(getTileCombinations)));
    return runImageGenerator(atlas, { format: 'png' });
};
