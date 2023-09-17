import { Color } from './types';

export interface HSLColor extends Color {
    readonly h: number;
    readonly s: number;
    readonly l: number;
}

export function hsl(h: number, s: number, l: number): HSLColor {
    return {h, s, l, color: `hsl(${h}, ${s}, ${l})`};
}

export function hslOverride(base: HSLColor, patch: {h?: number; s?: number; l?: number}): HSLColor {
    return hsl(patch.h ?? base.h, patch.s ?? base.s, patch.l ?? base.l);
}