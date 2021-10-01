import { Command } from '../../src/base/command'

class Ping extends Command {
  constructor() {
    super({
      name: 'ping'
    })
  }

  onCommand(): void {

  }
}
