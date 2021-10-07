"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const __1 = require("..");
const command_1 = require("../../src/base/command");
class Ping extends command_1.Command {
    constructor() {
        super({
            command: new builders_1.SlashCommandBuilder()
                .setName('ping')
                .setDescription('Responds with pong')
        });
    }
    onCommand(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply({ content: `Bot ping to Discord: ${__1.bot.ws.ping}ms`, ephemeral: true });
        });
    }
}
exports.default = Ping;
