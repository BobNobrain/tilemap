import { RenderContext } from '../../ui/ctx';
import { TextureColors } from './types';
import {
    P0, P1, P2, P3, P4, P5, P6,
    S0, S1, S2, S3, S4, S5, S6,
} from './constants';
import { Coords2D } from '../coords';

type Coord = [x: number, y: number]

const COORDS: Coord[] = [
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

export interface TopTextureRenderOptions {
    leftBorder: boolean;
    rightBorder: boolean;
}

export class TopTexture {
    private colors: string[];
    private borderColors: Record<'l' | 'r', string>;

    constructor(
        colors: TextureColors,
        data: number[],
    ) {
        if (data.length !== COORDS.length) {
            throw new Error('Invalid texture data length');
        }

        const repMap: Record<number, string> = {
            [P0]: colors.primary.darkest,
            [P1]: colors.primary.darker,
            [P2]: colors.primary.dark,
            [P3]: colors.primary.color,
            [P4]: colors.primary.light,
            [P5]: colors.primary.lighter,
            [P6]: colors.primary.lightest,

            [S0]: colors.secondary.darkest,
            [S1]: colors.secondary.darker,
            [S2]: colors.secondary.dark,
            [S3]: colors.secondary.color,
            [S4]: colors.secondary.light,
            [S5]: colors.secondary.lighter,
            [S6]: colors.secondary.lightest,
        };

        this.colors = data.map((n) => repMap[n]);
        this.borderColors = {
            l: colors.primary.light,
            r: colors.primary.dark,
        };
    }

    render(
        ctx: RenderContext,
        { left, top }: Coords2D,
        { leftBorder, rightBorder }: TopTextureRenderOptions,
    ): void {
        for (let i = 0; i < this.colors.length; i++) {
            let color = this.colors[i];
            const offset = COORDS[i];
            const borderType = borderTypesByIndex[i];
            if (borderType && (borderType === 'l' && leftBorder || borderType == 'r' && rightBorder)) {
                color = this.borderColors[borderType];
            }

            ctx.putPixel(
                color,
                left + offset[0],
                top + offset[1],
            );
        }
    }
}
