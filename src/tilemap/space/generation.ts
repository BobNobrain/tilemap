import { Coords2D, Rect2D, WorldCoords } from '../coords';
import { NoiseGenerator } from '../math/noise';
import {RandomNumberGenerator} from '../math/rng';
import { WorldObject } from '../object';
import {AsteroidTile} from '../tile/AsteroidTile';
import { Tile } from '../tile/types';
import { rockTile } from '../tiles/rock';
import { voidTile } from '../tiles/void';

// elevation, -7..7
const EMPTINESS_ELEVATION_BOUNDARY = 0.7;

class ElevationGenerator {
    private noise: NoiseGenerator;

    constructor(seed: string) {
        this.noise = new NoiseGenerator({
            seed,
            octaves: 3,
            gridSize: 16,
            min: 0,
            max: 255,
        });
    }

    public generateElevation(coords: Readonly<WorldCoords>): number {
        const n = this.noise.generateAt(coords);
        const elevation = n / 255;
        if (elevation <= EMPTINESS_ELEVATION_BOUNDARY) {
            return -1;
        }
        return (elevation - EMPTINESS_ELEVATION_BOUNDARY) / 0.3;
    }
}

class TileTypeGenerator {
    private cache: Record<string, Tile> = {};
    private rng: RandomNumberGenerator;

    constructor(seed: string) {
        this.rng = new RandomNumberGenerator(seed);
    }

    public generateTileType(coords: Readonly<WorldCoords>, elevation: number): Tile {
        if (elevation === -1) {
            return voidTile;
        }

        const cacheKey = `${coords.x}:${coords.z}`;
        if (!this.cache[cacheKey]) {
            this.cache[cacheKey] = new AsteroidTile(coords, this.rng);
        }
        return this.cache[cacheKey];
    }
}

class SkyGenerator {
    private noise: NoiseGenerator;
    constructor(seed: string) {
        this.noise = new NoiseGenerator({
            seed,
            octaves: 2,
            gridSize: 8,
            min: 0,
            max: 512,
        });
    }

    public getStars(viewport: Readonly<Rect2D>): Coords2D[] {
        const leftBounds = [viewport.bottomRight.left, viewport.topLeft.left];
        const topBounds = [viewport.bottomRight.top, viewport.topLeft.top];
        const leftMin = Math.floor(Math.min(...leftBounds));
        const leftMax = Math.ceil(Math.max(...leftBounds));
        const topMin = Math.floor(Math.min(...topBounds));
        const topMax = Math.ceil(Math.max(...topBounds));

        const result: Coords2D[] = [];

        for (let left = leftMin; left < leftMax; ++left) {
            for (let top = topMin; top < topMax; ++top) {
                const noise = this.noise.generateAt({x: left, y: 2, z: top});
                if (noise === 256) {
                    result.push({left, top});
                }
            }
        }

        return result;
    }
}

export interface WorldTile {
    tile: Tile;
    position: Readonly<WorldCoords>;
    objects: WorldObject[];
}

export class WorldGenerator {
    private elevationGenerator = new ElevationGenerator(this.seed);
    private tileTypeGenerator = new TileTypeGenerator(this.seed);
    private skyGenerator = new SkyGenerator(this.seed);

    constructor(public readonly seed: string) {}

    public generateElevation(at: Readonly<WorldCoords>): number {
        return this.elevationGenerator.generateElevation(at);
    }

    public generateTile(at: Readonly<WorldCoords>): WorldTile {
        const elevation = this.elevationGenerator.generateElevation(at);
        const tileType = this.tileTypeGenerator.generateTileType(at, elevation);

        const objects: WorldObject[] = [];

        return {
            tile: tileType,
            position: {
                ...at,
                y: elevation,
            },
            objects,
        };
    }

    public getStars(viewport: Readonly<Rect2D>): Coords2D[] {
        return this.skyGenerator.getStars(viewport);
    }
}
