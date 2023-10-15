import { RenderContext, RenderContextImpl } from './ctx';

export interface PageUI {
    canvas: HTMLCanvasElement;
    ctxRaw: CanvasRenderingContext2D;
    ctx: RenderContext;
    repaint: () => void;
}

export interface ConnectToDomOptions {
    pixelSize: number;
    tickTimeMs: number;
    render: (ui: PageUI) => void;
}

export function connectToDom({ pixelSize, tickTimeMs, render }: ConnectToDomOptions): PageUI {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctxRaw = canvas.getContext('2d');
    const body = document.body;

    if (!ctxRaw) {
        throw new Error('Cannot get 2d context');
    }

    const ui: PageUI = {
        canvas,
        ctx: new RenderContextImpl(ctxRaw, 0, 0),
        ctxRaw,
        repaint: () => render(ui),
    };

    const resizeCanvas = () => {
        const { width, height } = body.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;

            ui.ctx.width = Math.ceil(width / pixelSize);
            ui.ctx.height = Math.ceil(height / pixelSize);

            ctxRaw.resetTransform();
            ctxRaw.translate(Math.floor(width / 2), Math.floor(height / 2));
            ctxRaw.scale(pixelSize, pixelSize);
        }
    };

    requestAnimationFrame(() => {
        resizeCanvas();
        render(ui);
    });

    if (tickTimeMs > 0) {
        const onFrameTick = () => {
            resizeCanvas();
            ++ui.ctx.tick;
            requestAnimationFrame(ui.repaint);

            window.setTimeout(onFrameTick, tickTimeMs);
        };
        onFrameTick();
    }

    return ui;
}
