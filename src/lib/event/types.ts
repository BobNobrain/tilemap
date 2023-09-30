export type Listener<T extends unknown[] = []> = (...args: T) => void;

export interface Listenable<T extends unknown[] = []> {
    on(l: Listener<T>): number;
    off(lid: number): void;
}

export interface Triggerable<T extends unknown[] = []> {
    trigger(...args: T): void;
}
