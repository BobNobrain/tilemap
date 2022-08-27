import { add, EAST, getElevationDifferencePx, NORTH, SOUTH, WEST, WorldCoords } from '../coords';
import { Rect2D } from '../coords/types';
import { iterateWorldCoordsInViewport } from '../coords/viewport';
import type { SimpleTile } from '../tile/SimpleTile';
import { TileNeighbourhood } from '../tile/types';
import { grassTile } from '../tiles/grass';
import { sandTile } from '../tiles/sand';
import { waterTile } from '../tiles/water';

export interface WorldTile {
    tile: SimpleTile;
    position: Readonly<WorldCoords>;
}

export interface TileRenderInfo extends WorldTile {
    neighbours: TileNeighbourhood;
}

export class World {
    private tileData: Record<number, Record<number, WorldTile>> = {};

    getTilesToRender(viewport: Rect2D): TileRenderInfo[] {
        const result: TileRenderInfo[] = [];
        for (let c of iterateWorldCoordsInViewport(viewport)) {
            const { tile, position } = this.getTileAt(c);
            const southEv = this.getElevationAt(add(c, SOUTH));
            const eastEv = this.getElevationAt(add(c, EAST));
            const northEv = this.getElevationAt(add(c, NORTH));
            const westEv = this.getElevationAt(add(c, WEST));
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

    private getTileAt(coords: Readonly<WorldCoords>): WorldTile {
        if (!this.tileData[coords.x]) {
            this.tileData[coords.x] = {};
        }
        if (!this.tileData[coords.x][coords.z]) {
            this.tileData[coords.x][coords.z] = this.generateTileAt(coords);
        }

        return this.tileData[coords.x][coords.z];
    }

    private generateTileAt(coords: WorldCoords): WorldTile {
        if (coords.x > 2) {
            return {
                position: {
                    ...coords,
                    y: this.generateElevationAt(coords),
                },
                tile: waterTile,
            };
        }

        if (coords.x * coords.x + coords.z * coords.z < 10) {
            return {
                position: {
                    ...coords,
                    y: this.generateElevationAt(coords),
                },
                tile: sandTile,
            };
        }

        return {
            position: {
                ...coords,
                y: this.generateElevationAt(coords),
            },
            tile: grassTile,
        };
    }

    private generateElevationAt(coords: Readonly<WorldCoords>): number {
        if (coords.x > 2) {
            return 0;
        }
        return Math.random();
    }
    private getElevationAt(coords: Readonly<WorldCoords>): number {
        const memo = this.tileData[coords.x]?.[coords.z]?.position.y;
        if (memo === undefined) {
            return this.getTileAt(coords).position.y;
        }
        return memo;
    }
}
