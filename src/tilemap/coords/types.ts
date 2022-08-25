export interface WorldCoords {
    x: number;
    y: number;
    z: number;
}

export interface Coords2D {
    left: number;
    top: number;
}

export interface Rect2D {
    topLeft: Coords2D;
    bottomRight: Coords2D;
}
