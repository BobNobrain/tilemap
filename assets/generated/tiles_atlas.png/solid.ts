import { ImageGenerator } from '../../generator/image';
import { AtlasConstants } from '../../../src/renderer/tiles/atlas';
import { TILE_EDGES, TileEdge } from './pixels';

type NoisyPaletteColor = 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'S2' | 'S4';

// prettier-ignore
const SOLID_TOP_TXDATA: NoisyPaletteColor[] = [
    'P3', 'P3',
    'P3', 'P4', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P2', 'P3', 'P3', 'P4', 'P3', 'P3', 'P3',
    'P3', 'P2', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P2', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P4', 'P2', 'P3', 'P3', 'P3', 'P4', 'P3', 'P3', 'P4', 'P3', 'P4', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P4', 'P3', 'P2', 'P3', 'P3',
    'P3', 'P3', 'P4', 'P3', 'P3', 'P2', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3',
];

const TOP_WIDTHS_BY_ROW = [2, 6, 10, 14, 16, 14, 10, 6, 2];

// prettier-ignore
const SOLID_LEFT_TXDATA: NoisyPaletteColor[] = [
    'S4', 'S4', 'S4', 'S4', 'S4', 'S4', 'S4', 'S4',
    'P5', 'P5', 'P5', 'P5', 'P5', 'P5', 'P5', 'P5',
    'P4', 'P4', 'P4', 'P4', 'P4', 'P5', 'P4', 'P5',
    'P4', 'P4', 'P5', 'P4', 'P4', 'P4', 'P4', 'P4',
    'P4', 'P4', 'P4', 'P4', 'P4', 'P3', 'P4', 'P3',
    'P4', 'P3', 'P4', 'P4', 'P4', 'P4', 'P4', 'P4',
    'P4', 'P3', 'P3', 'P3', 'P3', 'P4', 'P3', 'P3',
    'P3', 'P3', 'P4', 'P3', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3',
    'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3', 'P3',
];

// prettier-ignore
const SOLID_RIGHT_TXDATA: NoisyPaletteColor[] = [
    'S2', 'S2', 'S2', 'S2', 'S2', 'S2', 'S2', 'S2',
    'P2', 'P2', 'P2', 'P2', 'P2', 'P2', 'P2', 'P2',
    'P1', 'P1', 'P1', 'P1', 'P1', 'P1', 'P1', 'P1',
    'P1', 'P1', 'P1', 'P2', 'P1', 'P1', 'P2', 'P1',
    'P1', 'P2', 'P1', 'P1', 'P1', 'P1', 'P1', 'P1',
    'P1', 'P1', 'P1', 'P1', 'P1', 'P1', 'P1', 'P1',
    'P0', 'P0', 'P1', 'P0', 'P0', 'P0', 'P0', 'P0',
    'P0', 'P0', 'P0', 'P0', 'P0', 'P1', 'P0', 'P0',
    'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0',
    'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0',
    'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0',
    'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0',
    'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0',
];

export type SolidTilePalette = {
    primary: string[];
    secondary?: string[];
};

export function createSolidTile(
    palette: SolidTilePalette,
    options: {
        leftSide: boolean;
        rightSide: boolean;
        leftBorder: boolean;
        rightBorder: boolean;
    },
): ImageGenerator {
    const getColor = (txdata: NoisyPaletteColor, offset = 0) => {
        const pal = (txdata[0] === 'S' && palette.secondary) || palette.primary;
        return pal[Number(txdata[1]) + offset];
    };

    return {
        getSize: () => ({
            width: AtlasConstants.TILE_WIDTH,
            height:
                options.leftSide || options.rightSide
                    ? AtlasConstants.TILE_FULL_HEIGHT
                    : AtlasConstants.TOP_SIDE_HEIGHT,
        }),
        draw: (canvas) => {
            const ctx = canvas.getContext('2d');

            // top
            let topTxdataIndex = 0;
            for (let y = 0; y < TOP_WIDTHS_BY_ROW.length; ++y) {
                const startX = (AtlasConstants.TILE_WIDTH - TOP_WIDTHS_BY_ROW[y]) / 2;
                const endX = startX + TOP_WIDTHS_BY_ROW[y];
                for (let x = startX; x < endX; ++x) {
                    const isLeftEdge = TILE_EDGES[y][x] === TileEdge.TopLeftTop;
                    const isRightEdge = TILE_EDGES[y][x] === TileEdge.TopRightTop;
                    const shouldLightenUp = (options.leftBorder && isLeftEdge) || (options.rightBorder && isRightEdge);

                    const txdata = SOLID_TOP_TXDATA[topTxdataIndex++];
                    const color = getColor(txdata, shouldLightenUp ? 1 : 0);
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            if (options.leftSide) {
                let leftTxdataIndex = 0;
                for (
                    let y = AtlasConstants.TILE_SIDE_START_Y;
                    y < AtlasConstants.TILE_SIDE_START_Y + AtlasConstants.TILE_SIDE_HEIGHT;
                    ++y
                ) {
                    for (let x = 0; x < AtlasConstants.TILE_SIDE_WIDTH; ++x) {
                        const yOffset = Math.floor((x + 1) / 2);

                        const txdata = SOLID_LEFT_TXDATA[leftTxdataIndex++];
                        const color = getColor(txdata);
                        ctx.fillStyle = color;
                        ctx.fillRect(x, y + yOffset, 1, 1);
                    }
                }
            }

            if (options.rightSide) {
                let rightTxdataIndex = 0;
                for (
                    let y = AtlasConstants.TILE_SIDE_START_Y;
                    y < AtlasConstants.TILE_SIDE_START_Y + AtlasConstants.TILE_SIDE_HEIGHT;
                    ++y
                ) {
                    for (let x = AtlasConstants.TILE_WIDTH / 2; x < AtlasConstants.TILE_WIDTH; ++x) {
                        const yOffset = Math.floor((AtlasConstants.TILE_WIDTH - x) / 2);

                        const txdata = SOLID_RIGHT_TXDATA[rightTxdataIndex++];
                        const color = getColor(txdata);
                        ctx.fillStyle = color;
                        ctx.fillRect(x, y + yOffset, 1, 1);
                    }
                }
            }
        },
    };
}
