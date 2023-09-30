/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    TxData,
    TR,
    P0, P1, P2, P3, P4, P5, P6,
} from '../texture';

export const ROCK1_TXDATA: TxData = {
    width: 9,
    height: 7,
    data: [
        TR, TR, TR, P5, P5, P5, TR, TR, TR,
        TR, TR, P5, P4, P4, P3, P1, TR, TR,
        TR, TR, P5, P4, P3, P2, P2, P1, TR,
        TR, P5, P4, P4, P3, P2, P2, P1, P0,
        P3, P4, P4, P3, P2, P1, P1, P1, P0,
        TR, P2, P1, P1, P1, P1, P0, P0, TR,
        TR, TR, TR, TR, P0, P0, TR, TR, TR,
    ],
};
