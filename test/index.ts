import { Bot } from '../src/bot'
import dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

export const bot = new Bot({
  eventDir: path.join(__dirname, 'events'),
  commandsDir: path.join(__dirname, 'commands'),
  token: process.env.DISCORD_TOKEN,
  applicationID: process.env.DISCORD_APPLICATION_ID,
  testServers: ['504988398013120513'],
  testMode: true,
  debug: false
})
