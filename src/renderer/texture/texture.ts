import { BLACK, WHITE } from '../palette/samples';
import {
    P0, P1, P2, P3, P4, P5, P6,
    S0, S1, S2, S3, S4, S5, S6,
    T0, T1, T2, T3, T4, T5, T6,
    WH, BL,
} from './constants';
import { TexturePalette, TxColors, TxData } from './types';

export function createTexturePalette(
    partialColors: Partial<TexturePalette> & Pick<TexturePalette, 'primary'>,
): TexturePalette {
    return {
        primary: partialColors.primary,
        secondary: partialColors.secondary ?? partialColors.primary,
        ternary: partialColors.ternary ?? partialColors.primary,
        white: partialColors.white ?? WHITE,
        black: partialColors.black ?? BLACK,
    };
}

export function createColorsTranslationMap(colors: TexturePalette): Record<number, string> {
    return {
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

        [T0]: colors.ternary.darkest,
        [T1]: colors.ternary.darker,
        [T2]: colors.ternary.dark,
        [T3]: colors.ternary.color,
        [T4]: colors.ternary.light,
        [T5]: colors.ternary.lighter,
        [T6]: colors.ternary.lightest,

        [WH]: colors.white,
        [BL]: colors.black,
    };
}

export function renderColors(colors: TexturePalette, txData: number[]): string[] {
    const map = createColorsTranslationMap(colors);
    return txData.map((txd) => map[txd]);
}
export function renderTxColors(colors: TexturePalette, txData: TxData): TxColors {
    return {
        width: txData.width,
        height: txData.height,
        colors: renderColors(colors, txData.data),
    };
}

const MIN_TONE_NUMBER = 0;
const MAX_TONE_NUMBER = 6;
export function darker(txDataItem: number, step = 1): number {
    if (txDataItem < 0) {
        return txDataItem;
    }
    const tone = txDataItem & 0x0F;
    const palette = txDataItem & 0xF0;
    return palette | Math.max(MIN_TONE_NUMBER, tone - step);
}
export function lighter(txDataItem: number, step = 1): number {
    if (txDataItem < 0) {
        return txDataItem;
    }
    const tone = txDataItem & 0x0F;
    const palette = txDataItem & 0xF0;
    return palette | Math.min(tone + step, MAX_TONE_NUMBER);
}
