import { readdir } from 'fs/promises'
import * as path from 'path'
import { Bot } from './bot'

export class EventHandler {
  private readonly bot: Bot
  path: string

  constructor(eventsDir: string, bot: Bot) {
    this.path = eventsDir
    this.bot = bot
  }

  async loadEvents(): Promise<void> {
    const events: string[] = await (await readdir(this.path)).filter(file => file.endsWith('.js') || file.endsWith('.ts'))

    for (const event of events) {
      // NOTE: Eslint is disabled on next line since "default" is in Javascript
      // eslint-disable-next-line
      const e = new (await import(path.join(this.path, event))).default()
      this.bot.addEvent(e.event, e.onEvent)
    }
  }
}
