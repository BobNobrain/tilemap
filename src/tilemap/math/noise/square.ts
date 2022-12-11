import { add, div, roundWorldCoords, WorldCoords } from '../../coords';
import { EAST, NORTH, NORTH_EAST, NORTH_WEST, SOUTH, SOUTH_EAST, SOUTH_WEST, WEST } from '../../coords/constants';
import { mul } from '../../coords/world';
import { NoiseLayer } from './layer';

export class SquareLayer extends NoiseLayer {
    private readonly maxD = Math.SQRT2 * this.gridSize;

    protected getNearestGridPoints(to: WorldCoords): WorldCoords[] {
        const scaled = div(to, this.gridSize);
        const nearest = roundWorldCoords(scaled);
        return [
            nearest,
            add(nearest, NORTH),
            add(nearest, SOUTH),
            add(nearest, WEST),
            add(nearest, EAST),
            add(nearest, NORTH_EAST),
            add(nearest, NORTH_WEST),
            add(nearest, SOUTH_EAST),
            add(nearest, SOUTH_WEST),
        ].map((c) => mul(c, this.gridSize));

        // return [
        //     floorWorldCoords(to),
        //     ceilWorldCoords(to),
        //     { ...to, x: Math.floor(to.x), z: Math.ceil(to.z), },
        //     { ...to, x: Math.ceil(to.x), z: Math.floor(to.z), },
        // ];
    }

    protected generateForGridPoint(gp: WorldCoords): number {
        return this.rng.forInt(this.getGridPointNumber(gp))()
    }

    private getGridPointNumber(gp: Readonly<WorldCoords>): number {
        if (gp.x === 0 && gp.z === 0) {
            return 0;
        }

        const ringN = Math.abs(gp.x) + Math.abs(gp.z);
        // ringSize(0) = 1
        // ringSize(1) = 4
        // ringSize(2) = 4 + 4 * 1
        // ringSize(3) = 4 + 4 * 2
        // ringSize(n) = 4n
        // ringOffset(n) = sum(from=0, to=n-1, i => ringSize(i)) = 1 + 4(n-2)(n-1)/2 = 1 + 2(n-1)(n-2)
        const ringOffset = 1 + 2 * (ringN - 1) * (ringN);
        let posInRing = 0;
        if (gp.x > 0 && gp.z >= 0) {
            // quarter I (+, +)
            posInRing = gp.z;
        } else if (gp.x <= 0 && gp.z > 0) {
            // quarter II (-, +)
            posInRing = -gp.x + ringN;
        } else if (gp.x < 0 && gp.z <= 0) {
            // quarter III (-, -)
            posInRing = -gp.z + ringN + ringN;
        } else {
            // quarter IV (+, -)
            posInRing = gp.x + ringN + ringN + ringN;
        }

        return ringOffset + posInRing;
    }

    protected getMaxDistanceToGripPoint(): number {
        return this.maxD;
    }
}
