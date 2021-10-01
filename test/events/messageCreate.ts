import { Message } from 'discord.js'
import { Event } from '../../src/base/event'
import { DiscordEvent } from '../../src/enums/discordEvent'

export default class MessageCreate extends Event {
  constructor() {
    super({
      event: DiscordEvent.MessageCreate
    })
  }

  onEvent(message: Message): void {
    console.log(`${message.author.username}: ${message.content}`)
  }
}
