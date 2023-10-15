// import { NoiseGenerator, NoiseLayerType } from '../lib/math/noise';
import { connectToDom } from '../ui/dom';
import { BiomeType } from '../world/data/BiomeType';
import { TileMaterial } from '../world/data/TileMaterial';
import { getChunkBoundaries, iterateChunkCoords } from '../world/data/coords';
import { WorldGenerator } from '../world/gen/WorldGenerator';

const query = new URLSearchParams(document.location.search.substring(1));
const getNumber = (name: string) => {
    const val = Number(query.get(name) || undefined);
    if (Number.isNaN(val)) {
        return undefined;
    }
    return val;
};

const worldGen = new WorldGenerator({
    seed: query.get('seed') ?? 'deadmouse',
});

const colors: Record<TileMaterial, string> = {
    [TileMaterial.Void]: 'black',
    [TileMaterial.GrayRock]: '#888',
    [TileMaterial.BrownRock]: '#840',
    [TileMaterial.Ice]: '#08f',
    [TileMaterial.BlueNebula]: '#44f',
    [TileMaterial.RedNebula]: '#f44',
};

const biomeColors: Record<BiomeType, string> = {
    [BiomeType.Void]: 'black',
    [BiomeType.Gray]: '#888',
    [BiomeType.Brown]: '#840',
    [BiomeType.Icy]: '#08f',
    [BiomeType.ColdNebula]: '#44f',
    [BiomeType.HotNebula]: '#f44',
};

const SIZE = getNumber('size') ?? 100;

let debug: undefined | 'temp' | 'elevation' | 'solidity' | 'tileVariation' | 'biomeVariation' | 'biome';

const grayscale = (x: number) => `rgb(${x},${x},${x})`;

const ui = connectToDom({
    pixelSize: 4,
    tickTimeMs: 0,
    render: (ui) => {
        const chunksToGenerate = iterateChunkCoords({
            minWorldX: -SIZE,
            maxWorldX: SIZE,
            minWorldZ: -SIZE,
            maxWorldZ: SIZE,
        });

        for (const chunkCoords of chunksToGenerate) {
            const chunk = worldGen.generateChunk(chunkCoords, { debug: Boolean(debug) });
            const bounds = getChunkBoundaries(chunkCoords);

            let i = 0;
            for (let x = bounds.minX; x < bounds.maxX; x++) {
                for (let z = bounds.minZ; z < bounds.maxZ; z++) {
                    const tile = chunk.tiles[i++];
                    let color = colors[tile.material];

                    switch (debug) {
                        case 'temp':
                            color = grayscale(tile.debug!.temp);
                            break;

                        case 'elevation':
                            color = grayscale(tile.debug!.elevation);
                            break;

                        case 'solidity':
                            color = grayscale(tile.debug!.solidity);
                            break;

                        case 'tileVariation':
                            color = grayscale(tile.debug!.tileVariation);
                            break;

                        case 'biomeVariation':
                            color = grayscale(tile.debug!.biomeVariation);
                            break;

                        case 'biome':
                            color = biomeColors[tile.debug!.biome];
                            break;
                    }

                    ui.ctx.putPixel(color, x, z);
                }
            }
        }
    },
});

window.addEventListener('keyup', (ev) => {
    const oldDebug = debug;
    switch (ev.code) {
        case 'KeyT':
            debug = 'temp';
            break;

        case 'KeyE':
            debug = 'elevation';
            break;

        case 'KeyS':
            debug = 'solidity';
            break;

        case 'KeyV':
            debug = 'tileVariation';
            break;

        case 'KeyG':
            debug = 'biomeVariation';
            break;

        case 'KeyB':
            debug = 'biome';
            break;

        case 'KeyR':
            debug = undefined;
            break;
    }

    if (oldDebug !== debug) {
        console.log(debug);
        requestAnimationFrame(ui.repaint);
        ev.preventDefault();
    }
});
