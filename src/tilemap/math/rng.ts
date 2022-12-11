// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

import { WorldCoords } from '../coords';

function cyrb128(str: string): [number, number, number, number] {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

function sfc32(a: number, b: number, c: number, d: number) {
    return () => {
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        let t = (a + b) | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        d = d + 1 | 0;
        t = t + d | 0;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

export class RandomNumberGenerator {
    private coeffs: [number, number, number, number];

    constructor(
        private seed: string,
    ) {
        this.coeffs = cyrb128(seed);
    }

    forInt(int: number): () => number {
        const [ia, ib, ic, id] = cyrb128(int.toString(16));
        const [sa, sb, sc, sd] = this.coeffs;

        return sfc32(ia ^ sa, ib ^ sb, ic ^ sc, id ^ sd);
    }

    forCoords(coords: Readonly<WorldCoords>): () => number {
        const [ca, cb, cc, cd] = cyrb128([coords.x, coords.y, coords.z].join(':'));
        const [sa, sb, sc, sd] = this.coeffs;

        return sfc32(ca ^ sa, cb ^ sb, cc ^ sc, cd ^ sd);
    }
}
