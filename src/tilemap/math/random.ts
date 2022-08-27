import { dotProduct, Vector } from './vector';

export interface CongruentGeneratorLimits {
    low: number;
    high: number;
}

export type CongruentGenerator = (vals: Vector, limits: CongruentGeneratorLimits) => number;

export interface CongruentGeneratorOptions {
    nDimensions: number;
    outputScale?: number;
}

const rnd = () => (Math.random() + 0.2) * Math.sign(Math.random() - 0.5);

export function createCongruentGenerator({
    nDimensions,
    outputScale = 1000,
}: CongruentGeneratorOptions): CongruentGenerator {
    const coeffs: Vector = [];
    for (let i = 0; i < nDimensions; i++) {
        coeffs.push(rnd() * outputScale);
    }
    const bias = rnd() * outputScale;
    return (vals, limits) => limits.low + Math.abs(dotProduct(vals, coeffs) + bias) % (limits.high - limits.low);
}
