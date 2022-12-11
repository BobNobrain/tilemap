import { RenderContext, RenderContextImpl } from './ctx';

export interface PageUI {
    canvas: HTMLCanvasElement;
    ctxRaw: CanvasRenderingContext2D;
    ctx: RenderContext;
}

export interface ConnectToDomOptions {
    pixelSize: number;
    tickTimeMs: number;
    render: (ui: PageUI) => void;
}

export function connectToDom({
    pixelSize,
    tickTimeMs,
    render,
}: ConnectToDomOptions): PageUI {
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
    };

    const repaint = () => render(ui);

    requestAnimationFrame(() => {
        const { width, height } = body.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        ui.ctx.width = Math.ceil(width / pixelSize);
        ui.ctx.height = Math.ceil(height / pixelSize);

        ctxRaw.translate(Math.floor(width / 2), Math.floor(height / 2));
        ctxRaw.scale(pixelSize, pixelSize);

        render(ui);
    });

    if (tickTimeMs > 0) {
        const onFrameTick = () => {
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

            ++ui.ctx.tick;
            requestAnimationFrame(repaint);
        };
        window.setInterval(onFrameTick, tickTimeMs);
    }

    return ui;
}
