import { createTimer } from '../lib/timer';

export interface GameServerDeps {}

export class GameServer {
    timer = createTimer({ tickRate: 20 });
}
