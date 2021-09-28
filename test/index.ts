import { Bot } from '../src/bot'
import dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

const bot = new Bot({
  eventDir: path.join(__dirname, 'event'),
  commandsDir: path.join(__dirname, 'commands')
})

void bot.login(process.env.DISCORD_TOKEN)
