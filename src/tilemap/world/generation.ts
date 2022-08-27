import { distance, WorldCoords } from '../coords';
import { createCongruentGenerator } from '../math/random';
import { dotProduct } from '../math/vector';
import type { SimpleTile } from '../tile/SimpleTile';
import { grassTile } from '../tiles/grass';
import { sandTile } from '../tiles/sand';
import { waterTile } from '../tiles/water';

export class MemoizedByCoords<T> {
    private data: Record<string, T> = {};

    constructor(
        private f: (coords: Readonly<WorldCoords>) => T,
    ) {}

    get(c: Readonly<WorldCoords>): T {
        const xi = Math.floor(c.x);
        const zi = Math.floor(c.z);
        const s = [xi, zi].join(':');

        if (!this.data[s]) {
            this.data[s] = this.f(c);
        }
        return this.data[s];
    }
}

class ElevationGenerator {
    private readonly GRID_SIZE = 3;
    private rnd = createCongruentGenerator({
        nDimensions: 2, // x and z
        outputScale: 7834,
    });

    private gridHeights = new MemoizedByCoords<number>(
        (coords) => this.rnd([coords.x, coords.z], { low: -0.2, high: 1 }),
    );

    // kinda perlin
    public generateElevation(coords: Readonly<WorldCoords>): number {
        const xScaled = coords.x / this.GRID_SIZE;
        const zScaled = coords.z / this.GRID_SIZE;

        if (Number.isInteger(xScaled) && Number.isInteger(zScaled)) {
            return Math.max(0, this.gridHeights.get({ x: xScaled, y: 0, z: zScaled }));
        }

        const closestGridPoints: WorldCoords[] = [
            { x: Math.floor(xScaled), y: 0, z: Math.floor(zScaled) },
            { x: Math.floor(xScaled), y: 0, z: Math.ceil(zScaled) },
            { x: Math.ceil(xScaled), y: 0, z: Math.floor(zScaled) },
            { x: Math.ceil(xScaled), y: 0, z: Math.ceil(zScaled) },
        ];

        const gridHeights = closestGridPoints.map((c) => this.gridHeights.get(c));
        const distances = closestGridPoints.map((c) => distance(c, { x: xScaled, y: 0, z: zScaled }));
        const sumDistances = dotProduct(distances, [1, 1, 1, 1]);
        const weightedSum = dotProduct(distances, gridHeights);
        const weightedAvg = weightedSum / sumDistances;
        if (weightedAvg <= 0) {
            return 0;
        }
        return Math.round(weightedAvg * 4) / 4;
    }
}

class TileTypeGenerator {
    private readonly GRID_SIZE = 4;
    private rnd = createCongruentGenerator({
        nDimensions: 2, // x and z
        outputScale: 11293,
    });
    private availableTiles = [grassTile, sandTile];

    private gridTiles = new MemoizedByCoords<SimpleTile>(
        (coords) => {
            const type = this.rnd([coords.x, coords.z], { low: 0, high: this.availableTiles.length });
            return this.availableTiles[Math.floor(type)];
        }
    );

    public generateTileType(coords: Readonly<WorldCoords>, elevation: number): SimpleTile {
        if (elevation <= 0) {
            return waterTile;
        }

        const xScaled = coords.x / this.GRID_SIZE;
        const zScaled = coords.z / this.GRID_SIZE;

        const closestGridPoints: WorldCoords[] = [
            { x: Math.floor(xScaled), y: 0, z: Math.floor(zScaled) },
            { x: Math.floor(xScaled), y: 0, z: Math.ceil(zScaled) },
            { x: Math.ceil(xScaled), y: 0, z: Math.floor(zScaled) },
            { x: Math.ceil(xScaled), y: 0, z: Math.ceil(zScaled) },
        ];

        let type = grassTile;
        let minD = 1;
        for (const gp of closestGridPoints) {
            const scaled: WorldCoords = { x: xScaled, y: 0, z: zScaled };
            const d = distance(gp, scaled);
            if (d < minD) {
                minD = d;
                type = this.gridTiles.get(gp);
            }
        }

        return type;
    }
}

export interface WorldTile {
    tile: SimpleTile;
    position: Readonly<WorldCoords>;
}

export class WorldGenerator {
    private elevationGenerator = new ElevationGenerator();
    private tileTypeGenerator = new TileTypeGenerator();

    public generateElevation(at: Readonly<WorldCoords>): number {
        return this.elevationGenerator.generateElevation(at);
    }

    public generateTile(at: Readonly<WorldCoords>): WorldTile {
        const elevation = this.elevationGenerator.generateElevation(at);
        const tileType = this.tileTypeGenerator.generateTileType(at, elevation);

        return {
            tile: tileType,
            position: {
                ...at,
                y: elevation,
            },
        };
    }
}
