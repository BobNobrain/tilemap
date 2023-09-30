import { Event } from '../../lib/event';

export interface GameWorld {
    update: Event<[GameWorld, number]>;
}
