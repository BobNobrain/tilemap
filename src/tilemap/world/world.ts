import { getElevationDifferencePx, roundWorldCoords, WorldCoords } from '../coords';
import { Rect2D } from '../coords/types';
import { iterateWorldCoordsInViewport } from '../coords/viewport';
import { SimpleTile } from '../tile/SimpleTile';
import { grassTile } from '../tiles/grass';
import { sandTile } from '../tiles/sand';

export interface WorldTile {
    tile: SimpleTile;
    position: Readonly<WorldCoords>;
}
export interface TileRenderInfo extends WorldTile {
    leftElevationPx: number;
    rightElevationPx: number;
}

export class World {
    private tileData: Record<number, Record<number, WorldTile>> = {};

    getTilesToRender(viewport: Rect2D): TileRenderInfo[] {
        const result: TileRenderInfo[] = [];
        for (let c of iterateWorldCoordsInViewport(viewport)) {
            const { tile, position } = this.getTileAt(c);
            const left = this.getTileAt({ ...c, z: c.z - 1 });
            const right = this.getTileAt({ ...c, x: c.x + 1 });
            result.push({
                tile,
                position,
                leftElevationPx: getElevationDifferencePx(position.y, left.position.y),
                rightElevationPx: getElevationDifferencePx(position.y, right.position.y),
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
        if (coords.x * coords.x + coords.z * coords.z < 10) {
            return {
                position: {
                    ...coords,
                    y: 0,
                },
                tile: sandTile,
            };
        }

        return {
            position: {
                ...coords,
                y: Math.random(), // (coords.z - coords.x) / 4,
            },
            tile: grassTile,
        };
    }
}
