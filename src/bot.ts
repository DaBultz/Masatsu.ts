import { Client, Intents } from 'discord.js'
import { Signale } from 'signale'
import { CommandHandler } from './commandHandler'
import { DiscordEvent } from './enums/discordEvent'
import { EventHandler } from './eventHandler'
import { IBotOptions } from './Interfaces/botOptions'
import { getIntentFromEvent } from './utils/intents'
import { getLogger } from './utils/logger'

export class Bot extends Client {
  readonly intents: Intents
  readonly settings: IBotOptions
  eventHandler?: EventHandler
  commandHandler?: CommandHandler
  logger: Signale

  constructor(settings: IBotOptions) {
    super({
      intents: []
    })

    // Set bot settings
    this.settings = settings

    // Setup Logger
    this.logger = getLogger('bot')

    this.intents = new Intents().add(Intents.FLAGS.GUILDS)

    if (settings.testMode != null && settings.testServers?.length === 0) {
      throw new Error('Test mode is enabled without any testServers provided')
    }

    if (settings.debug === true) {
      this.on('debug', (e) => this.logger.debug(e))
    }

    this.on('error', (e) => this.logger.error(e))
    this.on('warn', (e) => this.logger.warn(e))

    void this.login(settings.token)
  }

  async login(token?: string): Promise<string> {
    const log = getLogger('Masatsu -> Core', { interactive: false })
    const maxSteps = 5
    let step = 1

    log.info('[%d/%d] Starting Masatsu Framework...', step++, maxSteps)

    // Setup EventHandler
    this.eventHandler = new EventHandler(this.settings.eventDir, this)

    // Setup Command Handler
    this.commandHandler = new CommandHandler(this.settings.commandsDir, this)

    log.info('[%d/%d] Starting Event Handler...', step++, maxSteps)
    await this.eventHandler.loadEvents()

    log.info('[%d/%d] Starting Command Handler...', step++, maxSteps)
    await this.commandHandler.loadCommands()

    log.info('[%d/%d] Logging Into Discord...', step++, maxSteps)
    const login = await super.login(token)

    log.success('[%d/%d] Started Masatsu Framework...', step++, maxSteps)
    return login
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
