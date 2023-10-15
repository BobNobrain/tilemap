import { LinearSpan } from './linear';

/** 0-255 */
export type RandomInput = number & { __tag__?: 'RandomInput' };

/** Inclusive */
export const RANDOM_INPUT_MIN = 0;

/** Exclusive */
export const RANDOM_INPUT_MAX = 256;

export const RANDOM_INPUT_SPAN: LinearSpan = { start: RANDOM_INPUT_MIN, end: RANDOM_INPUT_MAX };

export function scaleRandomInput(input: RandomInput, min: number, max: number): number {
    return min + (input * (max - min)) / (RANDOM_INPUT_MAX - RANDOM_INPUT_MIN);
}
