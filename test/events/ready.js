"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const event_1 = require("../../src/base/event");
const discordEvent_1 = require("../../src/enums/discordEvent");
class Ready extends event_1.Event {
    constructor() {
        super({
            event: discordEvent_1.DiscordEvent.ClientReady
        });
    }
    onEvent() {
        __1.bot.logger.success('Bot is ready!!!');
    }
}
exports.default = Ready;
