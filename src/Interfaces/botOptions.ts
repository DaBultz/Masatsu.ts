import { Signale } from 'signale'

export interface IBotOptions {
  eventDir: string
  commandsDir: string
  token: string
  applicationID: string
  testServers?: string[]
  testMode?: boolean
  debug?: boolean
}
