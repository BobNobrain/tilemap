export interface LinearSpan {
    start: number;
    end: number;
}

export function remapLinear(value: number, from: LinearSpan, to: LinearSpan): number {
    return ((value - from.start) / (from.end - from.start)) * (to.end - to.start) + to.start;
}

export function invert(span: Readonly<LinearSpan>): LinearSpan {
    return { start: span.end, end: span.start };
}
