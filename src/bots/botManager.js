// Base includes.
// const { Telegraf } = require("telegraf");

// const appRoot = require("app-root-path");
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, `${appRoot}/.env`) });

// Additional includes.
// const base = require(`${appRoot}/src/messages/baseMessages`);
// const advanced = require(`${appRoot}/src/messages/advancedMessages`);
// const management = require(`${appRoot}/src/messages/managementMessages`);

// Define bot using telegraf.
// const managerBot = new Telegraf(process.env.BOT_MANAGER_TOKEN);

// Base commands.
// bot.command('logs', context => base.replyOnStart(context))
// bot.command('suggestions', context => base.replyOnHelp(context))
// bot.command('complaints', context => base.replyOnAbout(context))
// bot.command('statistic', context => base.showCat(context))

// managerBot.launch();

// Enable graceful stop
// process.once("SIGINT", () => managerBot.stop("SIGINT"));
// process.once("SIGTERM", () => managerBot.stop("SIGTERM"));
