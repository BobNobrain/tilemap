export interface TimerStats {
    nFrames: number;
    msPerTick: {
        avg: number;
        p90: number;
        max: number;
    };
}
