import {
    TxDataAnimated,
    P0, P1, P2, P3, P4, P5, P6,
} from '../texture';

export const WAVE_FRAMES_TXDATA: TxDataAnimated = {
    width: 3,
    height: 2,
    frames: [
        [
            P3, P3, P3,
            P3, P4, P3,
        ],
        [
            P3, P4, P3,
            P3, P3, P2,
        ],
        [
            P4, P5, P2,
            P3, P3, P4,
        ],
        [
            P5, P5, P2,
            P3, P4, P5,
        ],
        [
            P5, P4, P3,
            P5, P3, P4,
        ],
        [
            P4, P3, P3,
            P2, P4, P3,
        ],
        [
            P2, P3, P3,
            P4, P2, P3,
        ],
    ],
};
