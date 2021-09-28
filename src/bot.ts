import { Client } from 'discord.js'
import { EventHandler } from './eventHandler'
import { IBotOptions } from './Interfaces/botOptions'

export class Bot extends Client {
  static instance: Bot // Singleton
  eventHandler: EventHandler

  constructor(options: IBotOptions) {
    super({
      intents: []
    })

    // Setup EventHandler
    this.eventHandler = new EventHandler(options.eventDir)

    Bot.instance = this
  }

  // This returns the global Bot object
  public static get(): Bot {
    return Bot.instance
  }
}
