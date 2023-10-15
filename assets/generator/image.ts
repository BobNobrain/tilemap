import { createCanvas, Canvas } from 'canvas';

export type ImageGenerator = {
    getSize: () => { width: number; height: number };
    draw: (canvas: Canvas) => void;
};

export type { Canvas };

export type ImageFormat =
    | {
          format: 'png';
          compressionLevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      }
    | {
          format: 'jpeg';
          /** 0-1 */
          quality?: number;
      };

export function runImageGenerator(g: ImageGenerator, format: ImageFormat): Buffer {
    const { width, height } = g.getSize();
    console.log('Creating canvas of ', width, height);
    const canvas = createCanvas(width, height);
    g.draw(canvas);

    switch (format.format) {
        case 'png':
            return canvas.toBuffer('image/png', { compressionLevel: format.compressionLevel });

        case 'jpeg':
            return canvas.toBuffer('image/jpeg', { quality: format.quality });
    }
}
