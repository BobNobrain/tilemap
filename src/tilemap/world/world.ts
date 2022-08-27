import { add, EAST, getElevationDifferencePx, NORTH, SOUTH, WEST, WorldCoords } from '../coords';
import { Rect2D } from '../coords/types';
import { iterateWorldCoordsInViewport } from '../coords/viewport';
import { TileNeighbourhood } from '../tile/types';
import { MemoizedByCoords, WorldGenerator, WorldTile } from './generation';

export interface TileRenderInfo extends WorldTile {
    neighbours: TileNeighbourhood;
}

export class World {
    private gen = new WorldGenerator();
    private tileData = new MemoizedByCoords(
        (coords) => this.gen.generateTile(coords),
    );

    getTilesToRender(viewport: Rect2D): TileRenderInfo[] {
        const result: TileRenderInfo[] = [];
        for (let c of iterateWorldCoordsInViewport(viewport)) {
            const { tile, position } = this.tileData.get(c);
            const southEv = this.gen.generateElevation(add(c, SOUTH));
            const eastEv = this.gen.generateElevation(add(c, EAST));
            const northEv = this.gen.generateElevation(add(c, NORTH));
            const westEv = this.gen.generateElevation(add(c, WEST));
            result.push({
                tile,
                position,
                neighbours: {
                    southElevationPx: getElevationDifferencePx(position.y, southEv),
                    eastElevationPx: getElevationDifferencePx(position.y, eastEv),
                    isNorthOverhang: northEv < position.y,
                    isWestOverhang: westEv < position.y,
                },
            });
        }
        return result;
    }
}
