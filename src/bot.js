
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const base = require('./baseMessages')
const advanced = require('./advancedMessages')

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Define bot using telegraf.
const bot = new Telegraf(process.env.BOT_TOKEN)

// Base commands.
bot.command('start', context => base.replyOnStart(context))
bot.command('help', context => base.replyOnHelp(context))
bot.command('about', context => base.replyOnAbout(context))
bot.command('cat', context => base.showCat(context))

// Advanced commands.
bot.command('suggest', context => advanced.handleSuggestion(context))
bot.command('complain', context => advanced.handleComplain(context))


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))




