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
    gridSize: getNumber('scale') ?? 32,
    damping: getNumber('damping') ?? 0.5,
    layerType: layerTypes[query.get('shape') ?? ''] ?? NoiseLayerType.Triangular,
    min: 0,
    max: 255,
});

const sizeFromQuery = Number(query.get('size')) || 100;
const SIZE = Number.isNaN(sizeFromQuery) ? 100 : sizeFromQuery;

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
