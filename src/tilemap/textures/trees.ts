import { TxData } from '../texture/types';
import {
    TR,
    P0, P1, P2, P3, P4, P5, P6,
    S0, S1, S2, S3, S4, S5, S6,
} from '../texture/constants';

export const TREE1_TXDATA: TxData = {
    width: 11,
    height: 13,
    data: [
        TR, TR, TR, P6, P6, TR, TR, TR, TR, TR, TR,
        TR, P6, P6, P5, P5, P4, P6, TR, TR, TR, TR,
        TR, P6, P5, P5, P4, P4, P3, P5, P5, TR, TR,
        P6, P5, P4, P4, P3, P3, P4, P5, P4, P4, P6,
        P6, P5, P4, S3, S3, P3, P5, P4, P4, P2, P2,
        TR, P4, P2, P2, P1, S3, P4, S3, P4, P3, P1,
        TR, TR, P1, P1, TR, S3, S2, P2, P3, P2, P1,
        TR, TR, TR, TR, TR, S4, S3, TR, P1, P1, TR,
        TR, TR, TR, TR, S4, S3, S3, TR, TR, TR, TR,
        TR, TR, S4, TR, S4, S3, S2, TR, TR, TR, TR,
        TR, TR, TR, S4, S3, S2, TR, TR, TR, TR, TR,
        TR, TR, S3, S2, TR, TR, S2, S3, TR, TR, TR,
        TR, TR, TR, TR, TR, TR, TR, TR, S4, TR, TR,
    ],
};
