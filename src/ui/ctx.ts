export interface RenderContext {
    width: number;
    height: number;
    tick: number;

    putPixel(color: string, x: number, y: number): void;
}

export class RenderContextImpl implements RenderContext {
    public tick = 0;

    constructor(
        public ctx: CanvasRenderingContext2D,
        public width: number,
        public height: number,
    ) {}

    putPixel(color: string, x: number, y: number): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }
}
