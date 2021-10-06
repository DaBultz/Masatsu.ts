
import { Bot } from './bot'
import { scanFolder } from './utils/filesystem'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Collection, Interaction } from 'discord.js'
import { Command } from './base'
import { DiscordEvent } from './enums/discordEvent'

export class CommandHandler {
  private readonly commandsArray: any[]
  private readonly bot: Bot
  path: string
  commands: Collection<string, any>
  rest: REST

  constructor(eventsDir: string, bot: Bot) {
    this.path = eventsDir
    this.bot = bot
    this.commands = new Collection()
    this.commandsArray = []
    this.rest = new REST({ version: '9' }).setToken(bot.settings.token)
  }

  async loadCommands(): Promise<void> {
    const commands = await scanFolder(this.path)

    for (const command of commands) {
      // NOTE: Eslint is disabled on next line since "default" is in Javascript
      // eslint-disable-next-line
      const e: Command = new (await import(command)).default()

      if (!this.commands.has(e.command.command.name)) {
        this.commands.set(e.command.command.name, e)
        this.commandsArray.push(e.command.command.toJSON())
      }
    }

    await this.unregisterCommands()

    await this.registerCommands()

    this.bot.addEvent(DiscordEvent.InteractionCreate, async (e: Interaction) => await this.interactionCreate(e))
  }

  async interactionCreate(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) return

    const command: Command = this.commands.get(interaction.commandName)

    if (command === undefined) return

    try {
      await command.onCommand(interaction)
    } catch (error: any) {
      console.error(error)
      await interaction.reply({ content: 'There was an error while executing the command!', ephemeral: true })
    }
  }

  async registerCommands(): Promise<void> {
    if (this.bot.settings.testMode === true) {
      for (const server in this.bot.settings.testServers) {
        await this.rest.put(Routes.applicationGuildCommands(this.bot.settings.applicationID, server), { body: this.commandsArray })
      }
    } else {
      await this.rest.put(Routes.applicationCommands(this.bot.settings.applicationID), { body: this.commandsArray })
    }
  }

  async unregisterCommands(): Promise<void> {
    // Get the global slash commands
    let commands: any = await this.rest.get(Routes.applicationCommands(this.bot.settings.applicationID))

    // Delete them all
    for await (const command of commands) {
      await this.rest.delete(Routes.applicationCommand(command.application_id, command.id))
    }

    // Remove slash commands from test servers
    for (const server in this.bot.settings.testServers) {
      // Get all the guild slash commands
      commands = await this.rest.get(Routes.applicationGuildCommands(this.bot.settings.applicationID, server))

      // Delete all guild slash commands
      for await (const command of commands) {
        await this.rest.delete(Routes.applicationGuildCommand(command.application_id, server, command.id))
      }
    }
  }
}
