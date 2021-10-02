import { Bot } from './bot'
import { scanFolder } from './utils/filesystem'
import { Event } from './base/event'
import { Signale } from 'signale'
import { getLogger } from './utils/logger'

export class EventHandler {
  private readonly bot: Bot
  path: string

  constructor(eventsDir: string, bot: Bot) {
    this.path = eventsDir
    this.bot = bot
  }

  async loadEvents(): Promise<void> {
    const events = await scanFolder(this.path)

    for (const event of events) {
      // NOTE: Eslint is disabled on next line since "default" is in Javascript
      // eslint-disable-next-line
      const e: Event = new (await import(event)).default()
      this.bot.addEvent(e.event, e.onEvent)
    }
  }
}
