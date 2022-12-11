import { WorldCoords } from './types';

export function floorWorldCoords(world: Readonly<WorldCoords>): WorldCoords {
    return { x: Math.floor(world.x), y: Math.floor(world.y), z: Math.floor(world.z) };
}
export function ceilWorldCoords(world: Readonly<WorldCoords>): WorldCoords {
    return { x: Math.ceil(world.x), y: Math.ceil(world.y), z: Math.ceil(world.z) };
}
export function roundWorldCoords(world: Readonly<WorldCoords>): WorldCoords {
    return { x: Math.round(world.x), y: Math.round(world.y), z: Math.round(world.z) };
}

const roundFuncBySign: Record<number, (n: number) => number> = {
    [-1]: Math.floor,
    [0]: Math.round,
    [1]: Math.ceil,
}
export function roundWorldCoordsTo(world: Readonly<WorldCoords>, direction: Readonly<WorldCoords>): WorldCoords {
    return {
        x: roundFuncBySign[Math.sign(direction.x)](world.x),
        y: roundFuncBySign[Math.sign(direction.y)](world.y),
        z: roundFuncBySign[Math.sign(direction.z)](world.z),
    }
}

export function add(w1: Readonly<WorldCoords>, w2: Readonly<WorldCoords>): WorldCoords {
    return {
        x: w1.x + w2.x,
        y: w1.y + w2.y,
        z: w1.z + w2.z,
    };
}

export function div(w: Readonly<WorldCoords>, n: number): WorldCoords {
    return {
        x: w.x / n,
        y: w.y / n,
        z: w.z / n,
    };
}

export function mul(w: Readonly<WorldCoords>, n: number): WorldCoords {
    return {
        x: w.x * n,
        y: w.y * n,
        z: w.z * n,
    };
}

export function distance(w1: Readonly<WorldCoords>, w2: Readonly<WorldCoords>): number {
    const dx = w1.x - w2.x;
    const dy = w1.y - w2.y;
    const dz = w1.z - w2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
