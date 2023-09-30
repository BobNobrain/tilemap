import { WorldCoords } from '../../lib/coords';

export const CHUNK_SIZE = 64;
export const HALF_CHUNK_SIZE = CHUNK_SIZE / 2;

export interface ChunkCoords {
    chunkX: number;
    chunkZ: number;
}

export interface ChunkBoundaries {
    minX: number;
    minZ: number;
    maxX: number;
    maxZ: number;
}

export function chunkCoordsToWorld(c: Readonly<ChunkCoords>): WorldCoords {
    return {
        x: c.chunkX * CHUNK_SIZE,
        y: 0,
        z: c.chunkZ * CHUNK_SIZE,
    };
}

export function getChunkCenter(c: Readonly<ChunkCoords>): WorldCoords {
    return {
        x: c.chunkX * CHUNK_SIZE + HALF_CHUNK_SIZE,
        y: 0,
        z: c.chunkZ * CHUNK_SIZE + HALF_CHUNK_SIZE,
    };
}

export function getChunkBoundaries(c: Readonly<ChunkCoords>): ChunkBoundaries {
    const minX = c.chunkX * CHUNK_SIZE;
    const minZ = c.chunkZ * CHUNK_SIZE;
    return {
        minX,
        minZ,
        maxX: minX + CHUNK_SIZE,
        maxZ: minZ + CHUNK_SIZE,
    };
}
