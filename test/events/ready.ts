import { Event } from '../../src/base/event'
import { DiscordEvent } from '../../src/enums/discordEvent'

export default class Ready extends Event {
  constructor() {
    super({
      event: DiscordEvent.ClientReady
    })
  }

  onEvent(): void {
    console.log('Bot is ready!!!')
  }
}
