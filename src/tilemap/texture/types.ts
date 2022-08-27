import { Palette } from '../palette/types';

export interface TxData {
    width: number;
    height: number;
    data: number[];
}
export interface TxColors {
    width: number;
    height: number;
    colors: string[];
}
export interface TxDataAnimated {
    width: number;
    height: number;
    frames: number[][];
}
export interface TxColorsAnimated {
    width: number;
    height: number;
    frames: string[][];
}

export interface TexturePalette {
    primary: Palette;
    secondary: Palette;
    ternary: Palette;

    white: string;
    black: string;
}
