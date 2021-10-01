import { ICommand } from '../Interfaces/command'

export class Command {
  command: ICommand

  constructor(command: ICommand) {
    this.command = command
  }

  onCommand(): void {
    throw new Error(`onEvent() in ${this.command.name} have not being overwritten`)
  }
}
