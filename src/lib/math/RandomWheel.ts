import { RandomInput, scaleRandomInput } from './RandomInput';

export type WeightedPickOptions<T> = {
    /** 0-255 */
    rnd: number;
    items: {
        /** 0-1; sum of all probabilities must be 1 */
        probability: number;
        value: T;
    }[];
};

export type RandomWheelSector<T> = {
    value: T;
    width: number;
};

export class RandomWheel<T> {
    private sectors: RandomWheelSector<T>[] = [];
    private totalWidth = 0;

    sector(value: T, width: number): RandomWheel<T> {
        this.sectors.push({ value, width });
        this.totalWidth += width;
        return this;
    }

    /**
     * Picks a sector from a wheel at random (randomness is provided from outside
     * via `input` parameter).
     * @param input A random number in range 0-255
     */
    pick(input: RandomInput): T {
        const pos = scaleRandomInput(input, 0, this.totalWidth);
        let w = 0;
        for (const sector of this.sectors) {
            w += sector.width;
            if (pos < w) {
                return sector.value;
            }
        }

        if (this.sectors.length === 0) {
            throw new RangeError('This wheel is empty');
        }

        throw new RangeError(`Cannot pick a sector for ${input}`);
    }
}
