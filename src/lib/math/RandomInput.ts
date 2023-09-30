/** 0-255 */
export type RandomInput = number & { __tag__?: 'RandomInput' };

/** Inclusive */
export const RANDOM_INPUT_MIN = 0;

/** Exclusive */
export const RANDOM_INPUT_MAX = 256;

export function scaleRandomInput(input: RandomInput, min: number, max: number): number {
    return min + (input * (max - min)) / (RANDOM_INPUT_MAX - RANDOM_INPUT_MIN);
}
