import { Listenable } from '../event';

export interface TimerTickData {
    lastTickStartTime: number;
    tickStartTime: number;
    deltaMs: number;
}

export interface Timer {
    readonly tickRate: number;
    readonly tick: Listenable<[TimerTickData]>;

    readonly isActive: boolean;
    pause(): void;
    resume(): void;
}
