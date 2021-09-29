import { DiscordEvent } from '../enums/discordEvent'
import { IEvent } from '../Interfaces/event'

export class Event {
  event: DiscordEvent

  constructor(event: IEvent) {
    this.event = event.event
  }

  onEvent(...args: any[]): any {
    throw new Error(`onEvent() in ${this.event} have not being overwritten`)
  }
}
