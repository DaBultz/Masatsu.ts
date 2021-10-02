import { ICommand } from '../Interfaces/command'

export class Command {
  command: ICommand

  constructor(command: ICommand) {
    this.command = command
  }

  onCommand(...args: any[]): any {
    throw new Error(`onEvent() in ${this.command.command.name} have not being overwritten`)
  }
}
