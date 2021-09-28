import { Bot } from '../bot'
import { DiscordEvent } from '../enums/discordEvent'

export class Event {
  event: DiscordEvent
  constructor(event: DiscordEvent) {
    this.event = event
    this.registerEvent()
  }

  onEvent(...args: any[]): any {
    throw new Error(`onEvent() in ${this.event} have not being overwritten`)
  }

  private registerEvent(): void {
    Bot.get().on(this.event.toString(), async (...args) => this.onEvent(args))
  }
}
