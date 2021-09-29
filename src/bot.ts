import { Client, Intents } from 'discord.js'
import { DiscordEvent } from './enums/discordEvent'
import { EventHandler } from './eventHandler'
import { IBotOptions } from './Interfaces/botOptions'
import { getIntentFromEvent } from './utils/intents'

export class Bot extends Client {
  readonly intents: Intents
  eventHandler: EventHandler

  constructor(options: IBotOptions) {
    super({
      intents: []
    })

    this.intents = new Intents().add(Intents.FLAGS.GUILDS)

    // Setup EventHandler
    this.eventHandler = new EventHandler(options.eventDir, this)

    void this.login(options.token)
  }

  async login(token?: string): Promise<string> {
    await this.eventHandler.loadEvents()
    return await super.login(token)
  }

  addEvent(event: DiscordEvent, callback: Function): void {
    // Get required intents
    const intents: number[] = getIntentFromEvent(event)

    // Check if intent is in intents
    for (const intent of intents) {
      if (!this.intents.has(intent)) {
        this.intents.add(intent)
      }
    }

    // Overwrite the options intent
    this.options.intents = this.intents.bitfield

    // Listen to the event
    // eslint-disable-next-line node/no-callback-literal
    this.on(event.toString(), async (...args) => callback(...args))
  }
}
