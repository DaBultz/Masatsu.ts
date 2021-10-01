import { readdir } from 'fs/promises'
import * as path from 'path'
import { Bot } from './bot'

export class CommandHandler {
  private readonly bot: Bot
  path: string

  constructor(eventsDir: string, bot: Bot) {
    this.path = eventsDir
    this.bot = bot
  }

  async loadCommands(): Promise<void> {}
  async registerCommand(): Promise<void> {}
  async unregisterCommand(): Promise<void> {}
  async getCommands(): Promise<void> {}
}
