export enum TileZone {
    Dead,
    Top,
    LeftSide,
    RightSide,
}

export enum TileEdge {
    None,

    TopLeftTop,
    TopRightTop,
    TopLeftBottom,
    TopRightBottom,

    LeftTop,
    LeftRight,
    LeftBottom,
    LeftLeft,

    RightTop,
    RightRight,
    RightBottom,
    RightLeft,
}

export const TILE_ZONES = ((): TileZone[][] => {
    const _ = TileZone.Dead;
    const T = TileZone.Top;
    const L = TileZone.LeftSide;
    const R = TileZone.RightSide;
    return [
        [_, _, _, _, _, _, _, T, T, _, _, _, _, _, _, _],
        [_, _, _, _, _, T, T, T, T, T, T, _, _, _, _, _],
        [_, _, _, T, T, T, T, T, T, T, T, T, T, _, _, _],
        [_, T, T, T, T, T, T, T, T, T, T, T, T, T, T, _],
        [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
        [L, T, T, T, T, T, T, T, T, T, T, T, T, T, T, R],
        [L, L, L, T, T, T, T, T, T, T, T, T, T, R, R, R],
        [L, L, L, L, L, T, T, T, T, T, T, R, R, R, R, R],
        [L, L, L, L, L, L, L, T, T, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [L, L, L, L, L, L, L, L, R, R, R, R, R, R, R, R],
        [_, L, L, L, L, L, L, L, R, R, R, R, R, R, R, _],
        [_, _, _, L, L, L, L, L, R, R, R, R, R, _, _, _],
        [_, _, _, _, _, L, L, L, R, R, R, _, _, _, _, _],
        [_, _, _, _, _, _, _, L, R, _, _, _, _, _, _, _],
    ];
})();

export const TILE_EDGES = ((): TileEdge[][] => {
    const _ = TileEdge.None;
    const A = TileEdge.TopLeftTop;
    const B = TileEdge.TopRightTop;
    const C = TileEdge.TopLeftBottom;
    const D = TileEdge.TopRightBottom;

    const E = TileEdge.LeftTop;
    const F = TileEdge.LeftRight;
    const G = TileEdge.LeftBottom;
    const H = TileEdge.LeftLeft;

    const I = TileEdge.RightTop;
    const J = TileEdge.RightRight;
    const K = TileEdge.RightBottom;
    const L = TileEdge.RightLeft;

    return [
        [_, _, _, _, _, _, _, A, B, _, _, _, _, _, _, _],
        [_, _, _, _, _, A, A, _, _, B, B, _, _, _, _, _],
        [_, _, _, A, A, _, _, _, _, _, _, B, B, _, _, _],
        [_, A, A, _, _, _, _, _, _, _, _, _, _, B, B, _],
        [A, _, _, _, _, _, _, _, _, _, _, _, _, _, _, B],
        [H, C, C, _, _, _, _, _, _, _, _, _, _, D, D, J],
        [H, E, E, C, C, _, _, _, _, _, _, D, D, I, I, J],
        [H, _, _, E, E, C, C, _, _, D, D, I, I, _, _, J],
        [H, _, _, _, _, E, E, C, D, I, I, _, _, _, _, J],
        [H, _, _, _, _, _, _, F, L, _, _, _, _, _, _, J],
        [H, _, _, _, _, _, _, F, L, _, _, _, _, _, _, J],
        [H, _, _, _, _, _, _, F, L, _, _, _, _, _, _, J],
        [H, _, _, _, _, _, _, F, L, _, _, _, _, _, _, J],
        [_, G, G, _, _, _, _, F, L, _, _, _, _, K, K, _],
        [_, _, _, G, G, _, _, F, L, _, _, K, K, _, _, _],
        [_, _, _, _, _, G, G, F, L, K, K, _, _, _, _, _],
        [_, _, _, _, _, _, _, G, K, _, _, _, _, _, _, _],
    ];
})();
