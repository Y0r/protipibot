// Base includes.
const axios = require("axios");
const appRoot = require("app-root-path");
const { Scenes, Markup } = require("telegraf");

// Custom services.
const logger = require(`${appRoot}/src/services/logger`);
const messageBuilder = require(`${appRoot}/src/services/messageBuilder`);
const mongoose = require("mongoose");

/**
 * Scene for entities management.
 *
 * @type {string}
 */
const MANAGE_ENTITIES_SCENE = "manage_entities_scene";

/**
 * View entities action.
 *
 * @type {string}
 */
const VIEW_ENTITY_ACTION = "manage_entities_scene:";

/**
 * Leave scene action.
 *
 * @type {string}
 */
const EXIT_SCENE_ACTION = "manage_entities_scene:exit";

/**
 * Returns scene for entities management.
 */
function manageEntities() {
  return new Scenes.WizardScene(
    MANAGE_ENTITIES_SCENE,
    (context) => {
      context.reply(
        // Compose message text.
        messageBuilder.composeText("management_start"),
        // Init list of entity types available for review.
        Markup.inlineKeyboard([
          getEntitiesButtonsList(),
          [Markup.button.callback("Exit", EXIT_SCENE_ACTION)],
        ]),
        // Attach message parameters.
        messageBuilder.getDefaultMessageParameters(),
      );

      return context.wizard.next();
    },
    (context) => {
      if (!context.callbackQuery) {
        return handleIncorrectInput(context);
      }

      if (context.callbackQuery.data === EXIT_SCENE_ACTION) {
        context.reply(
          messageBuilder.composeText("management_end"),
          messageBuilder.getDefaultMessageParameters(),
        );

        context.wizard.state.selectedEntity = {};
        return context.wizard.leave();
      } else {
        context.wizard.state.selectedEntity = context.callbackQuery.data;
        return context.wizard.next();
      }
    },
    (context) => {
      if (!context.wizard.state.selectedEntity) {
        return handleIncorrectInput(context);
      }

      const modelName = "";
      const model = require(`${appRoot}/models/${modelName}`);
      const data = model.find();

      context.reply(
        "type: " + context.wizard.state.selectedEntity,
        messageBuilder.getDefaultMessageParameters,
      );
      context.reply(
        "Data: " + data,
        messageBuilder.getDefaultMessageParameters,
      );
    },
  );

  // // Define scene.
  // const managementScene = new Scenes.BaseScene(MANAGE_ENTITIES_SCENE);
  //
  // // Started scene and initial message.
  // managementScene.enter((context) => {
  //   // User preferences for next step.
  //   context.session.model = {};
  //
  //   // Show initial message and actions.
  //   context.reply(
  //     messageBuilder.composeText("management_start"),
  //     messageBuilder.getDefaultMessageParameters(),
  //     Markup.inlineKeyboard([
  //       Markup.button("Suggestions", VIEW_SUGGESTIONS_ACTION),
  //       Markup.button("Complaints", VIEW_COMPLAINTS_ACTION),
  //       Markup.button("Logs", VIEW_LOGS_ACTION),
  //       Markup.button("Exit", EXIT_SCENE_ACTION),
  //     ]),
  //   );
  //
  //   // context.replyWith
  // });
  //
  // // Go to next scene with specified preference.
  // managementScene.action(VIEW_SUGGESTIONS_ACTION, (context) => {
  //   context.session.model = "Complaint";
  //   return context.scene.enter("SOME_OTHER_SCENE_ID");
  // });
  //
  // // Go to next scene with specified preference.
  // managementScene.action(VIEW_COMPLAINTS_ACTION, (context) => {
  //   context.session.model = "Suggestion";
  //   return context.scene.enter("SOME_OTHER_SCENE_ID");
  // });
  //
  // // Go to next scene with specified preference.
  // managementScene.action(VIEW_LOGS_ACTION, (context) => {
  //   context.session.model = "Log";
  //   return context.scene.enter("SOME_OTHER_SCENE_ID");
  // });
  //

  //
  // // Display message if user chosen incorrect options or sent some text.
  // managementScene.use((context) =>
  //   context.reply(
  //     messageBuilder.composeText("management_start"),
  //     messageBuilder.getDefaultMessageParameters(),
  //   ),
  // );
}

/**
 * Returns a list of buttons for each entity.
 *
 * @returns {*[]}
 */
function getEntitiesButtonsList() {
  let buttons = [];
  let modelNames = mongoose.modelNames();

  modelNames.map((item) => {
    buttons.push(Markup.button.callback(item, VIEW_ENTITY_ACTION + item));
  });

  return buttons;
}

/**
 * Returns error and moves user to a previous scene.
 *
 * @param context
 *   Context of scene.
 */
function handleIncorrectInput(context) {
  context.reply(
    messageBuilder.composeText("management_empty_input"),
    messageBuilder.getDefaultMessageParameters(),
  );

  return context.wizard.back();
}

module.exports = {
  MANAGE_ENTITIES_SCENE,
  manageEntities,
};
