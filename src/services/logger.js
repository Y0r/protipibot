const axios = require("axios");
const appRoot = require("app-root-path");
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");

/**
 * Path to the texting config file.
 *
 * @type {string}
 */
const LOGGER_CONFIG_PATH = path.resolve(
  __filename,
  `${appRoot}/config/logger.yml`,
);

/**
 * Log message/command usage.
 *
 * @param type
 *   Type of the log.
 * @param context
 *   Context object.
 */
function log(type, context) {
  // Check if logging enabled.
  if (!isLoggerEnabled()) {
    return;
  }

  let from = userString(context);
  console.log(`< ${type} <<`, context.message.text, from);

  // Check if database logging enabled.
  if (!isLoggerEnabled("db_log")) {
    return;
  }

  createLog(type, context).then((r) => console.log("Log saved in MongoDB."));
}

/**
 * Creates a log record.
 *
 * @param type
 *   Log type.
 * @param context
 *   Given context object.
 * @returns {Promise<void>}
 *   Promise of request.
 */
const createLog = async (type, context) => {
  try {
    const response = await axios.post("http://localhost:5000/api/logs", {
      message: JSON.stringify(context.message),
      level: type,
      date: Date.now(),
    });
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response.data : error.message,
    );
  }
};

/**
 * Stringify content data.
 *
 * @param context
 *   Context object.
 *
 * @returns {string}
 *   String from message.
 */
function userString(context) {
  if (context.from.id === context.chat.id) {
    return JSON.stringify({ from: context.from });
  }

  return JSON.stringify({
    from: context.from,
    chat: context.chat,
  });
}

/**
 * Get state of the logger service.
 *
 * @returns {*}
 */
function isLoggerEnabled(key = "enabled") {
  // Load config with settings.
  const config = yaml.load(fs.readFileSync(LOGGER_CONFIG_PATH, "utf8"));
  const settings = config["settings"];
  return settings[key];
}

module.exports = {
  log,
};
