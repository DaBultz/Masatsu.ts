import { Bot } from '../src/bot'
import dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

const bot = new Bot({
  eventDir: path.join(__dirname, 'events'),
  commandsDir: path.join(__dirname, 'commands'),
  token: process.env.DISCORD_TOKEN,
  testServers: ['504988398013120513']
})
