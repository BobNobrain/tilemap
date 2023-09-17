import { WorldCoords } from '../../coords';
import { NoiseLayer } from './layer';

export class TriangularLayer extends NoiseLayer {
    private h = Math.floor(this.gridSize * Math.sin(Math.PI / 3));
    private halfGridSize = Math.floor(this.gridSize / 2);

    protected getNearestGridPoints(to: WorldCoords): WorldCoords[] {
        const { x, z } = to;
        const gridRow = Math.round(z / this.h);
        let gridCol = Math.round(x / this.gridSize);
        if (Math.abs(gridRow) % 2 === 1) {
            gridCol -= 0.5;
        }

        const gridCenter: WorldCoords = {
            x: Math.floor(gridCol * this.gridSize),
            y: 0,
            z: gridRow * this.h,
        };

        return [
            gridCenter,
            { ...gridCenter, x: gridCenter.x + this.gridSize },
            { ...gridCenter, x: gridCenter.x - this.gridSize },
            { x: gridCenter.x - this.halfGridSize, y: 0, z: gridCenter.z - this.h },
            { x: gridCenter.x + this.halfGridSize, y: 0, z: gridCenter.z - this.h },
            { x: gridCenter.x - this.halfGridSize, y: 0, z: gridCenter.z + this.h },
            { x: gridCenter.x + this.halfGridSize, y: 0, z: gridCenter.z + this.h },
            { ...gridCenter, z: gridCenter.z + this.h + this.h },
            { ...gridCenter, z: gridCenter.z - this.h - this.h },
        ]
    }
    protected generateForGridPoint(gp: WorldCoords): number {
        return this.rng.forCoords(gp)();
    }
    protected getMaxDistanceToGridPoint(): number {
        // i have no idea why this cannot be just gridSize
        return this.gridSize * 0.75;
    }
}
