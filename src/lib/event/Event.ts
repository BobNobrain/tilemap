import { Listenable, Listener, Triggerable } from './types';

export class Event<T extends unknown[] = []> implements Listenable<T>, Triggerable<T> {
    private seq = 0;
    private listeners: Record<number, Listener<T>> = {};

    constructor(public readonly name?: string) {}

    on(l: Listener<T>): number {
        const lid = ++this.seq;
        this.listeners[lid] = l;
        return lid;
    }
    off(lid: number) {
        delete this.listeners[lid];
    }

    trigger(...args: T): void {
        for (const l of Object.values(this.listeners)) {
            l(...args);
        }
    }
}
