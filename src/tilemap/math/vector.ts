export type Vector = number[];

export function dotProduct(v1: Vector, v2: Vector): number {
    const n = Math.min(v1.length, v2.length);
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += v1[i] * v2[i];
    }
    return result;
}
