
const path = require('path');
const yaml= require('js-yaml');
const fs= require('fs');

/**
 * Path to the texting config file.
 *
 * @type {string}
 */
const LOGGER_CONFIG_PATH = path.resolve(__filename, '../../config/logger.yml');

/**
 * Log message/command usage.
 *
 * @param type
 *   Type of the log.
 * @param context
 *   Context object.
 */
function log(type, context) {
  if (isLoggerEnabled()) {
    return;
  }

  let from = userString(context);
  console.log(`< ${type} <<`, context.message.text, from)
}

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
  return JSON.stringify(context.from.id === context.chat.id ? context.from : {
    from: context.from,
    chat: context.chat
  });
}

/**
 * Get state of the logger service.
 *
 * @returns {*}
 */
function isLoggerEnabled() {
  // Load config with settings.
  const config = yaml.load(fs.readFileSync(LOGGER_CONFIG_PATH, 'utf8'));
  const settings = config['settings'];
  return settings['enabled'];
}

module.exports = {
  log
}