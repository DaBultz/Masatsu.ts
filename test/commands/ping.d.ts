import { BaseCommandInteraction } from 'discord.js';
import { Command } from '../../src/base/command';
export default class Ping extends Command {
    constructor();
    onCommand(interaction: BaseCommandInteraction): Promise<void>;
}
