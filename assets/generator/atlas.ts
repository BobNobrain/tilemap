import { ImageGenerator } from './image';

const sum = (acc: number, next: number) => acc + next;

export function createAtlas(rows: (ImageGenerator | null)[][]): ImageGenerator {
    const columnsCount = rows.reduce((acc, next) => Math.max(acc, next.length), 0);
    const rowsCount = rows.length;

    const maxWidthsByColumn = new Array<number>(columnsCount).fill(0);
    const maxHeightByRow = new Array<number>(rowsCount).fill(0);

    for (let row = 0; row < rowsCount; ++row) {
        for (let col = 0; col < columnsCount; ++col) {
            const cell = rows[row][col];

            const cellSize = cell ? cell.getSize() : { width: 0, height: 0 };
            maxHeightByRow[row] = Math.max(maxHeightByRow[row], cellSize.height);
            maxWidthsByColumn[col] = Math.max(maxWidthsByColumn[col], cellSize.width);
        }
    }

    return {
        getSize: () => ({
            width: maxWidthsByColumn.reduce(sum, 0),
            height: maxHeightByRow.reduce(sum, 0),
        }),

        draw: (canvas) => {
            const ctx = canvas.getContext('2d');
            let x = 0;
            let y = 0;

            for (let row = 0; row < rowsCount; ++row) {
                x = 0;

                for (let col = 0; col < columnsCount; ++col) {
                    const cell = rows[row][col];
                    if (!cell) {
                        x += maxWidthsByColumn[col];
                        continue;
                    }

                    console.log('Drawing atlas cell', x, y);

                    ctx.resetTransform();
                    ctx.translate(x, y);

                    cell.draw(canvas);

                    x += maxWidthsByColumn[col];
                }

                y += maxHeightByRow[row];
            }
        },
    };
}
