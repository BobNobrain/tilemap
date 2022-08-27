import { RenderContext } from '../../ui/ctx';
import { TopTexture, TopTextureRenderOptions } from './types';
import { Coords2D } from '../coords';
import { createColorsTranslationMap, darker, lighter, TexturePalette } from '../texture';

type Coord = [x: number, y: number]

export const COORDS: Coord[] = [
    [0, -4], [1, -4],
    [-2, -3], [-1, -3], [0, -3], [1, -3], [2, -3], [3, -3],
    [-4, -2], [-3, -2], [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2], [4, -2], [5, -2],
    [-6, -1], [-5, -1], [-4, -1], [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [5, -1], [6, -1], [7, -1],
    [-7, 0], [-6, 0], [-5, 0], [-4, 0], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
    [-6, 1], [-5, 1], [-4, 1], [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    [-4, 2], [-3, 2], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
    [-2, 3], [-1, 3], [0, 3], [1, 3], [2, 3], [3, 3],
    [0, 4], [1, 4],
];

const borderTypesByIndex: Record<number, 'l' | 'r' | undefined> = {
    0: 'l', 1: 'r',
    2: 'l', 3: 'l', 6: 'r', 7: 'r',
    8: 'l', 9: 'l', 16: 'r', 17: 'r',
    18: 'l', 19: 'l', 30: 'r', 31: 'r',
    32: 'l', 47: 'r',
};

export class SimpleTopTexture implements TopTexture {
    private colorsMap: Record<number, string>;

    constructor(
        private colors: TexturePalette,
        private txData: number[],
    ) {
        if (txData.length !== COORDS.length) {
            throw new Error('Invalid texture data length');
        }

        this.colorsMap = createColorsTranslationMap(colors);
    }

    render(
        ctx: RenderContext,
        { left, top }: Coords2D,
        { leftBorder, rightBorder }: TopTextureRenderOptions,
    ): void {
        for (let i = 0; i < this.txData.length; i++) {
            let txd = this.txData[i];
            const offset = COORDS[i];
            const borderType = borderTypesByIndex[i];
            if (borderType) {
                if (borderType === 'l' && leftBorder) {
                    txd = lighter(txd);
                } else if (borderType == 'r' && rightBorder) {
                    txd = darker(txd);
                }
            }

            ctx.putPixel(
                this.colorsMap[txd],
                left + offset[0],
                top + offset[1],
            );
        }
    }
}
