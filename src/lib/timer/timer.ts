import { Event } from '../event';
import { Timer, TimerTickData } from './types';

export interface CreateTimerOptions {
    name?: string;
    tickRate: number;
}

class TimerImpl implements Timer {
    public readonly tick: Event<[TimerTickData]>;
    public readonly tickRate: number;
    public isActive = true;

    private timeoutId: number | undefined;
    private readonly msPerTick: number;
    private lastTickTime = -Infinity;

    constructor({ name, tickRate }: CreateTimerOptions) {
        this.tick = new Event(name ? name + '.tick' : 'Timer.tick');
        this.tickRate = tickRate;

        this.msPerTick = Math.floor(1000 / tickRate);

        this.kickOff(0);
    }

    pause(): void {
        this.isActive = false;
        clearTimeout(this.timeoutId);
    }
    resume(): void {
        this.isActive = true;
        this.kickOff(this.lastTickTime - performance.now());
    }

    private kickOff(waitMs: number) {
        clearTimeout(this.timeoutId);

        const timeoutMs = Math.max(waitMs, 0);

        setTimeout(() => {
            performance.now();
            const start = performance.now();
            this.tick.trigger({
                tickStartTime: start,
                lastTickStartTime: this.lastTickTime,
                deltaMs: start - this.lastTickTime,
            });
            this.lastTickTime = start;
            const tickTime = performance.now() - start;
            this.kickOff(this.msPerTick - tickTime);
        }, timeoutMs);
    }
}

export function createTimer(opts: CreateTimerOptions): Timer {
    return new TimerImpl(opts);
}
