import { add, div, roundWorldCoords, WorldCoords } from '../../coords';
import { EAST, NORTH, NORTH_EAST, NORTH_WEST, SOUTH, SOUTH_EAST, SOUTH_WEST, WEST } from '../../coords/constants';
import { mul } from '../../coords/world';
import { SquareLayer } from './square';

export class RandomizedSquareLayer extends SquareLayer {
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
        ].map((c) => {
            const r = this.rng.forCoords(c);
            const displacement: WorldCoords = {
                x: (r() - 0.5),
                y: 0,
                z: (r() - 0.5),
            };
            return mul(add(c, displacement), this.gridSize);
        });
    }
}
