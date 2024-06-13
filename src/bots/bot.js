// Base includes.
const { Telegraf, Scenes, session } = require("telegraf");

const appRoot = require("app-root-path");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, `${appRoot}/.env`) });

// Additional includes.
const base = require(`${appRoot}/src/messages/baseMessages`);
const advanced = require(`${appRoot}/src/messages/advancedMessages`);

// Define bot using telegraf.
const bot = new Telegraf(process.env.BOT_TOKEN);

/**
 * The base command to start bot.
 *
 * Calls replyOnStart method that returns:
 * - Greeting message.
 * - List of commands.
 * - Some additional text.
 *
 * To the message attached random image with cat.
 */
bot.command("start", (context) => base.replyOnStart(context));

/**
 * The base command to view the list of commands.
 *
 * List of commands contains each available command except estereggs commands.
 */
bot.command("help", (context) => base.replyOnHelp(context));

/**
 * The custom command to get more info about bot.
 *
 * Returns text that describes the bot.
 */
bot.command("about", (context) => base.replyOnAbout(context));

/**
 * The custom command to get cat picture.
 *
 * Funny command that returns random picture of some cat's.
 */
bot.command("cat", (context) => base.showCat(context));

// Define a list of scenes.
const stage = new Scenes.Stage([
  advanced.handleSuggestion(),
  advanced.handleComplaint(),
]);

// Enable sessions and stage middleware.
bot.use(session());
bot.use(stage.middleware());

/**
 * The custom command to leave suggestion.
 *
 * Advanced command that provides a few steps flow to leave suggestion.
 */
bot.command("suggest", (context) => {
  context.scene.enter(advanced.SUGGESTION_SCENE).then();
});

/**
 * The custom command to leave complain.
 *
 * Advanced command that provides a few steps flow to leave complain.
 */
bot.command("complain", (context) => {
  context.scene.enter(advanced.COMPLAINT_SCENE).then();
});

/**
 * Try to launch bot and handle result.
 */
bot
  .launch()
  .then(() => console.log("Bip-Bop.. Bot started..."))
  .catch((error) => {
    console.log("Bip-Boop.. Something went wrong..");
    console.log("Error:", error);
  });

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
