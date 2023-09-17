import { WorldCoords } from '../lib/coords';
import { NoiseGenerator } from '../lib/math/noise';
import { Coords2D, Rect2D } from '../renderer/coords';
import { WorldObject } from '../renderer/object';
import { Tile } from '../renderer/tile/types';
import { icyRockTile } from '../renderer/tiles/icy';
import { purpleRockTile } from '../renderer/tiles/purple';
import { rockTile } from '../renderer/tiles/rock';
import { voidTile } from '../renderer/tiles/void';

const HEIGHT_PRECISION = 10;
const EMPTINESS_HEIGHT_BOUNDARY = 6;
const ROCKS_HEIGHT_SPAN = HEIGHT_PRECISION - EMPTINESS_HEIGHT_BOUNDARY;

class ElevationGenerator {
    private noise: NoiseGenerator;

    constructor(seed: string) {
        this.noise = new NoiseGenerator({
            seed,
            octaves: 3,
            gridSize: 16,
            min: 0,
            max: HEIGHT_PRECISION,
        });
    }

    public generateElevation(coords: Readonly<WorldCoords>): number {
        const n = this.noise.generateAt(coords);
        if (n <= EMPTINESS_HEIGHT_BOUNDARY) {
            return 0;
        }

        const height = n - EMPTINESS_HEIGHT_BOUNDARY;
        return height / ROCKS_HEIGHT_SPAN + 1;
    }
}

class TileTypeGenerator {
    private cache: Record<string, Tile> = {};
    private temperatureNoise: NoiseGenerator;

    constructor(seed: string) {
        this.temperatureNoise = new NoiseGenerator({
            seed,
            octaves: 2,
            gridSize: 32,
            min: 0,
            max: 3
        });
    }

    public generateTileType(coords: Readonly<WorldCoords>, elevation: number): Tile {
        if (elevation === 0) {
            return voidTile;
        }

        const biome = this.temperatureNoise.generateAt(coords);

        if (biome === 0) {
            return icyRockTile;
        }

        if (biome === 1) {
            return rockTile;
        }

        return purpleRockTile;
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
