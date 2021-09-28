import { readdir } from 'fs/promises'
import * as path from 'path'

export class EventHandler {
  path: string

  constructor(eventsDir: string) {
    this.path = eventsDir

    void this.loadEvent()
  }

  private async loadEvent(): Promise<void> {
    const events: string[] = await readdir(this.path)

    for (const event of events) {
      // NOTE: Eslint is disabled on next line since "default" is in Javascript
      // eslint-disable-next-line
      new (await import(path.join(this.path, event))).default()
    }
  }
}
