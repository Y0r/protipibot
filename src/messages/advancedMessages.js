// Base includes.
const axios = require("axios");
const appRoot = require("app-root-path");
const { Scenes } = require("telegraf");

// Custom services.
const logger = require(`${appRoot}/src/services/logger`);
const messageBuilder = require(`${appRoot}/src/services/messageBuilder`);

/**
 * Machine name of the suggest scene.
 *
 * @type {string}
 */
const SUGGESTION_SCENE = "suggestion_scene";

/**
 * Machine name of the complaint scene.
 *
 * @type {string}
 */
const COMPLAINT_SCENE = "complaint_scene";

/**
 * Process and saves suggestion.
 */
function handleSuggestion() {
  return new Scenes.WizardScene(
    SUGGESTION_SCENE,
    // Step 1: Initial message to inform user about flow.
    (context) => {
      context.reply(
        messageBuilder.composeText("suggestion_init"),
        messageBuilder.getDefaultMessageParameters(),
      );

      return context.wizard.next();
    },
    // Step 2: Fetch message, validate it and save entity.
    (context) => {
      let message = context.message;

      if (message.text === undefined) {
        // Save log about error.
        logger.log("error", context);

        // Reply to user.
        context.reply(
          messageBuilder.composeText("error"),
          messageBuilder.getDefaultMessageParameters(),
        );

        return context.scene.leave();
      }

      try {
        const response = axios
          .post("http://localhost:5000/api/suggestions", {
            author: {
              id: context.message.from.id,
              name: context.message.from.name,
            },
            body: context.message.text,
            date: Date.now(),
          })
          .then(
            context.reply(
              messageBuilder.composeText("suggestion_ending"),
              messageBuilder.getDefaultMessageParameters(),
            ),
          );
      } catch (error) {
        // Save log about error.
        logger.log("error", error);

        // Reply to user.
        context.reply(
          messageBuilder.composeText("error"),
          messageBuilder.getDefaultMessageParameters(),
        );
      }

      return context.scene.leave();
    },
  );
}

/**
 * Process and saves complaint.
 */
function handleComplaint() {
  return new Scenes.WizardScene(
    COMPLAINT_SCENE,
    // Step 1: Initial message to inform user about flow.
    (context) => {
      context.reply(
        messageBuilder.composeText("complaint_init"),
        messageBuilder.getDefaultMessageParameters(),
      );

      return context.wizard.next();
    },
    // Step 2: Fetch message, validate it and save entity.
    (context) => {
      let message = context.message;

      if (message.text === undefined) {
        // Save log about error.
        logger.log("error", context);

        // Reply to user.
        context.reply(
          messageBuilder.composeText("error"),
          messageBuilder.getDefaultMessageParameters(),
        );

        return context.scene.leave();
      }

      try {
        const response = axios
          .post("http://localhost:5000/api/complaints", {
            author: {
              id: context.message.from.id,
              name: context.message.from.name,
            },
            body: context.message.text,
            date: Date.now(),
          })
          .then(
            context.reply(
              messageBuilder.composeText("complaint_ending"),
              messageBuilder.getDefaultMessageParameters(),
            ),
          );
      } catch (error) {
        // Save log about error.
        logger.log("error", error);

        // Reply to user.
        context.reply(
          messageBuilder.composeText("error"),
          messageBuilder.getDefaultMessageParameters(),
        );
      }

      return context.scene.leave();
    },
  );
}

module.exports = {
  SUGGESTION_SCENE,
  COMPLAINT_SCENE,
  handleSuggestion,
  handleComplaint,
};
