import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction } from 'discord.js'
import { bot } from '..'
import { Command } from '../../src/base/command'

export default class Ping extends Command {
  constructor() {
    super({
      command: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responds with pong')

    })
  }

  async onCommand(interaction: BaseCommandInteraction): Promise<void> {
    await interaction.reply({ content: `Bot ping to Discord: ${bot.ws.ping}ms`, ephemeral: true })
  }
}
