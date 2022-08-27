import { RenderContext } from '../../ui/ctx';
import { Coords2D, round2DCoords, worldToCanvas } from '../coords';
import { createCongruentGenerator } from '../math/random';
import { COORDS } from './SimpleTopTexture';
import { renderColors } from './texture';
import { TextureColors, TopTexture, TopTextureRenderOptions } from './types';

export interface WaveTextureOptions {
    animationLengthTicks: number;
    frameDurationTicks: number;
    nWaves: number;
    txDataFrames: number[][];
    frameWidth: number;
    frameHeight: number;
}

class WaveTexture {
    private frames: string[][];

    constructor(
        colors: TextureColors,
        txDataFrames: number[][],
        private frameWidth: number,
        private frameHeight: number,
    ) {
        this.frames = txDataFrames.map((frame) => renderColors(colors, frame));
    }

    render(ctx: RenderContext, where: Coords2D, frame: number) {
        const frameData = this.frames[frame];
        if (!frameData) {
            console.log(`Asked for ${frame}, which is >= ${this.frames.length}`)
        }
        let i = 0;
        for (let y= 0; y < this.frameHeight; y++) {
            for (let x = 0; x < this.frameWidth; x++) {
                ctx.putPixel(frameData[i], where.left + x, where.top + y);
                ++i;
            }
        }
    }
}

export class WaveTopTexture implements TopTexture {
    private wave: WaveTexture;
    private animationLengthTicks: number;
    private nFrames: number;
    private frameDuration: number;
    private color: string;
    private nWaves: number;

    private rnd = createCongruentGenerator({
        nDimensions: 3, // x, z and #wave
    });

    constructor(
        colors: TextureColors,
        { animationLengthTicks, nWaves, txDataFrames, frameWidth, frameHeight, frameDurationTicks }: WaveTextureOptions,
    ) {
        this.animationLengthTicks = animationLengthTicks;
        this.nFrames = txDataFrames.length;
        this.frameDuration = frameDurationTicks;
        this.color = colors.primary.color;

        this.wave = new WaveTexture(
            colors,
            txDataFrames,
            frameWidth,
            frameHeight,
        );

        this.nWaves = nWaves;
    }

    render(ctx: RenderContext, where: Coords2D, { worldPosition }: TopTextureRenderOptions): void {
        for (const c of COORDS) {
            ctx.putPixel(this.color, where.left + c[0], where.top + c[1]);
        }

        for (let i = 0; i < this.nWaves; i++) {
            const shiftTime = this.rnd([worldPosition.x, worldPosition.z, i], {
                low: 0,
                high: this.animationLengthTicks,
            })

            const animationTick = (ctx.tick + shiftTime) % this.animationLengthTicks;
            if (animationTick < this.nFrames * this.frameDuration) {
                const frame = Math.floor(animationTick / this.frameDuration);

                const shiftX = this.rnd([worldPosition.x, worldPosition.z, i], {
                    low: -0.5,
                    high: 0.5,
                });
                const shiftZ = this.rnd([worldPosition.z, i, worldPosition.x], {
                    low: -0.5,
                    high: 0.5,
                })
                const { left: shiftLeft, top: shiftTop } = round2DCoords(worldToCanvas({
                    x: shiftX,
                    y: 0,
                    z: shiftZ,
                }));

                this.wave.render(
                    ctx,
                    {
                        left: where.left + shiftLeft,
                        top: where.top + shiftTop,
                    },
                    frame,
                );
            }
        }
    }
}
