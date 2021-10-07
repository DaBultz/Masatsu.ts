"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../../src/base/event");
const discordEvent_1 = require("../../src/enums/discordEvent");
class MessageCreate extends event_1.Event {
    constructor() {
        super({
            event: discordEvent_1.DiscordEvent.MessageCreate
        });
    }
    onEvent(message) {
        console.log(`${message.author.username}: ${message.content}`);
    }
}
exports.default = MessageCreate;
