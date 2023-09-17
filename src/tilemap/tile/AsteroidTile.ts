import { RenderContext } from '../../ui/ctx';
import { Coords2D, HALF_TILE_HEIGHT, HALF_TILE_WIDTH, WorldCoords, round2DCoords, worldToCanvas } from '../coords';
import type { RandomNumberGenerator } from '../math/rng';
import { SideTexture, SideTextureRenderOptions, Tile, TileNeighbourhood, TopTexture, TopTextureRenderOptions } from './types';

const gray = (amount: number) => {
    const brightness = Math.floor(8 + amount * 8).toString(16);
    return `#${brightness}${brightness}${brightness}`;
};
const gray0 = gray(0);

type Coord = [x: number, y: number]

const COORDS: Coord[] = [
    [0, -4], [1, -4],
    [-2, -3], [-1, -3], [0, -3], [1, -3], [2, -3], [3, -3],
    [-4, -2], [-3, -2], [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2], [4, -2], [5, -2],
    [-6, -1], [-5, -1], [-4, -1], [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [5, -1], [6, -1], [7, -1],
    [-7, 0], [-6, 0], [-5, 0], [-4, 0], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
    [-6, 1], [-5, 1], [-4, 1], [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    [-4, 2], [-3, 2], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
    [-2, 3], [-1, 3], [0, 3], [1, 3], [2, 3], [3, 3],
    [0, 4], [1, 4],
];

const borderTypesByIndex: Record<number, 'l' | 'r' | undefined> = {
    0: 'l', 1: 'r',
    2: 'l', 3: 'l', 6: 'r', 7: 'r',
    8: 'l', 9: 'l', 16: 'r', 17: 'r',
    18: 'l', 19: 'l', 30: 'r', 31: 'r',
    32: 'l', 47: 'r',
};

class AsteroidTopTexture implements TopTexture {
    private txData: number[];

    constructor({ x, z }: Readonly<WorldCoords>, rng: RandomNumberGenerator) {
        this.txData = new Array(COORDS.length).fill(0);
        const rand = rng.forCoords({x, y: 0, z});
        const n = 2 + Math.floor(rand() * 8);
        for (let i = 0; i < n; i++) {
            const txIndex = Math.floor(rand() * COORDS.length);
            this.txData[txIndex] = rand() - 0.5;
        }
    }

    render(
        ctx: RenderContext,
        { left, top }: Coords2D,
        { leftBorder, rightBorder }: TopTextureRenderOptions,
    ): void {
        for (let i = 0; i < this.txData.length; i++) {
            let txd = this.txData[i];
            const offset = COORDS[i];
            const borderType = borderTypesByIndex[i];
            if (borderType) {
                if (borderType === 'l' && leftBorder) {
                    txd += 0.5;
                } else if (borderType == 'r' && rightBorder) {
                    txd -= 0.5;
                }
            }

            ctx.putPixel(
                gray(txd),
                left + offset[0],
                top + offset[1],
            );
        }
    }
}

const OFFSETS = {
    l: [0, 1, 1, 2, 2, 3, 3, 4],
    r: [4, 3, 3, 2, 2, 1, 1, 0],
};

class AsteroidSideTexture implements SideTexture {
    private bumps: [left: number, dent: number][][] = [];
    private rand: () => number;

    constructor({ x, z }: Readonly<WorldCoords>, rng: RandomNumberGenerator) {
        this.rand = rng.forCoords({x, y: 0, z});
    }

    render(ctx: RenderContext, at: Coords2D, { sideHeight, side }: SideTextureRenderOptions) {
        const offsets = OFFSETS[side];

        for (let top = 0; top <= sideHeight; ++top) {
            if (this.bumps.length <= top) {
                const nBumps = Math.floor(this.rand() * 3);
                const bumps = this.bumps[top] = [] as [left: number, dent: number][];

                for (let i = 0; i < nBumps; ++i) {
                    const bumpLeft = Math.floor(HALF_TILE_WIDTH * this.rand());
                    const bumpDent = this.rand() - 0.5;
                    bumps[i] = [bumpLeft, bumpDent];
                }
            }

            for (let left = 0; left < HALF_TILE_WIDTH; ++left) {
                ctx.putPixel(gray0, at.left + left, at.top + top + offsets[left]);
            }

            const bumps = this.bumps[top];
            for (const [left, dent] of bumps) {
                ctx.putPixel(gray(dent), at.left + left, at.top + top + offsets[left]);
            }
        }
    }
}

export class AsteroidTile implements Tile {
    private topTexture: TopTexture;
    private sideTexture: SideTexture;

    constructor(coords: Readonly<WorldCoords>, rng: RandomNumberGenerator) {
        this.topTexture = new AsteroidTopTexture(coords, rng);
        this.sideTexture = new AsteroidSideTexture(coords, rng);
    }

    renderAt(
        ctx: RenderContext,
        coords: WorldCoords,
        { eastElevationPx, southElevationPx, isNorthOverhang, isWestOverhang }: TileNeighbourhood,
    ): void {
        const { left, top } = round2DCoords(worldToCanvas(coords));

        this.topTexture.render(ctx, { left, top }, {
            leftBorder: isWestOverhang,
            rightBorder: isNorthOverhang,
            worldPosition: coords,
        });
        this.sideTexture.render(
            ctx,
            { left: left - HALF_TILE_WIDTH + 1, top: top + 1 },
            { sideHeight: southElevationPx, side: 'l' },
        );
        this.sideTexture.render(
            ctx,
            { left: left + 1, top: top + 1 },
            { sideHeight: eastElevationPx, side: 'r' },
        );
    }
}