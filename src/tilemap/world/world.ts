import { RenderContext } from '../../ui/ctx';
import { add, EAST, getElevationDifferencePx, NORTH, SOUTH, WEST, WorldCoords } from '../coords';
import { Coords2D, Rect2D } from '../coords/types';
import { iterateWorldCoordsInViewport } from '../coords/viewport';
import { TileNeighbourhood } from '../tile/types';
import { WorldGenerator, WorldTile } from './generation';

export interface TileRenderInfo extends WorldTile {
    neighbours: TileNeighbourhood;
}

export interface RenderTask {
    (ctx: RenderContext): void;
}

export class World {
    private gen: WorldGenerator;

    constructor(seed: string) {
        this.gen = new WorldGenerator(seed);
    }

    getTilesToRender(viewport: Rect2D): RenderTask[] {
        const result: RenderTask[] = [];
        for (let c of iterateWorldCoordsInViewport(viewport)) {
            const { tile, position, objects } = this.gen.generateTile(c);
            const southEv = this.gen.generateElevation(add(c, SOUTH));
            const eastEv = this.gen.generateElevation(add(c, EAST));
            const northEv = this.gen.generateElevation(add(c, NORTH));
            const westEv = this.gen.generateElevation(add(c, WEST));
            result.push((ctx) => tile.renderAt(
                ctx,
                position,
                {
                    southElevationPx: getElevationDifferencePx(position.y, southEv),
                    eastElevationPx: getElevationDifferencePx(position.y, eastEv),
                    isNorthOverhang: northEv < position.y,
                    isWestOverhang: westEv < position.y,
                },
            ));

            for (const obj of objects) {
                result.push((ctx) => obj.render(ctx, position));
            }
        }
        return result;
    }

    getStars(viewport: Readonly<Rect2D>) {
        return this.gen.getStars(viewport);
    }
}
