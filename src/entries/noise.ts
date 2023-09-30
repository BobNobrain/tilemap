import { NoiseGenerator, NoiseLayerType } from '../lib/math/noise';
import { connectToDom } from '../ui/dom';

const query = new URLSearchParams(document.location.search.substring(1));
const getNumber = (name: string) => {
    const val = Number(query.get(name) || undefined);
    if (Number.isNaN(val)) {
        return undefined;
    }
    return val;
};

const layerTypes: Record<string, NoiseLayerType | undefined> = {
    triangular: NoiseLayerType.Triangular,
    tr: NoiseLayerType.Triangular,
    square: NoiseLayerType.Square,
    sq: NoiseLayerType.Square,
    'displaced-square': NoiseLayerType.DisplacedSquare,
    dsq: NoiseLayerType.DisplacedSquare,
};

const gen = new NoiseGenerator({
    seed: query.get('seed') ?? 'deadmouse',
    octaves: getNumber('octaves') ?? 3,
    gridSize: getNumber('size') ?? 32,
    layerType: layerTypes[query.get('shape') ?? ''] ?? NoiseLayerType.Triangular,
    min: 0,
    max: 255,
});

const SIZE = 50;

connectToDom({
    pixelSize: 4,
    tickTimeMs: 0,
    render: (ui) => {
        for (let x = -SIZE; x <= SIZE; x++) {
            for (let z = -SIZE; z <= SIZE; z++) {
                const r = gen.generate(x, z);
                const clr = `rgb(${r},${r},${r})`;
                ui.ctx.putPixel(clr, x, z);
            }
        }
    },
});
