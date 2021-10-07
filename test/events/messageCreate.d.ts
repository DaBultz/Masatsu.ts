import { Message } from 'discord.js';
import { Event } from '../../src/base/event';
export default class MessageCreate extends Event {
    constructor();
    onEvent(message: Message): void;
}
