import Debug from 'debug'

export enum DebugChannel {
  Core = 'core'
}

export const debug = (channel: DebugChannel, ...args: any[]): void => (Debug(`masatsu:${channel}`))(args)
