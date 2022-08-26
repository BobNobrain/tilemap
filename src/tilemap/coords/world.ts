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

export function add(w1: Readonly<WorldCoords>, w2: Readonly<WorldCoords>): WorldCoords {
    return {
        x: w1.x + w2.x,
        y: w1.y + w2.y,
        z: w1.z + w2.z,
    };
}
