// Base includes.
const appRoot = require("app-root-path");

// Custom services.
const logger = require(`${appRoot}/src/services/logger`);
const messageBuilder = require(`${appRoot}/src/services/messageBuilder`);
const imagesManager = require(`${appRoot}/src/services/imagesManager`);

/**
 * Reply message for /start command.
 *
 * @param context
 *   Context object.
 */
function replyOnStart(context) {
  logger.log("notice", context);

  imagesManager.getCatPhotoUrl().then((images) => {
    const image = images.shift();
    context.replyWithPhoto(image["url"], {
      caption: messageBuilder.composeText("start"),
      ...messageBuilder.getDefaultMessageParameters(),
    });
  });
}

/**
 * Close session and quit.
 *
 * @param context
 *   Context object.
 * @returns {Promise<void>}
 *   Promise.
 */
async function quit(context) {
  // Explicit usage.
  await context.telegram.leaveChat(context.message.chat.id);
  // Using context shortcut.
  await context.leaveChat();
}

/**
 * Reply message for /help command.
 *
 * @param context
 *   Context object.
 */
function replyOnHelp(context) {
  logger.log("notice", context);
  context.reply(
    messageBuilder.composeText("help"),
    messageBuilder.getDefaultMessageParameters(),
  );
}

/**
 * Reply message for /about command.
 *
 * @param context
 *   Context object.
 */
function replyOnAbout(context) {
  logger.log("notice", context);
  context.reply(
    messageBuilder.composeText("about"),
    messageBuilder.getDefaultMessageParameters(),
  );
}

/**
 * Reply message for /cat command.
 *
 * @param context
 *   Context object.
 */
function showCat(context) {
  logger.log("notice", context);

  imagesManager.getCatPhotoUrl().then((images) => {
    const image = images.shift();
    context.replyWithPhoto(image["url"], {
      caption: messageBuilder.composeText("cat"),
      ...messageBuilder.getDefaultMessageParameters(),
    });
  });
}

module.exports = {
  replyOnStart,
  replyOnHelp,
  replyOnAbout,
  showCat,
};
