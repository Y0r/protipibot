// Base includes.
const appRoot = require("app-root-path");
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");

/**
 * Path to the texting config file.
 *
 * @type {string}
 */
const TEXTING_CONFIG_PATH = path.resolve(
  __filename,
  `${appRoot}/config/texting.yml`,
);

/**
 * Get text for message by set name.
 *
 * Using config file the message text will be composed using texting parts.
 *
 * @param set_name
 *   Set name of the message.
 *
 * @returns {string}
 *   Message text.
 *
 * @see /config/texting.yml.
 */
function composeText(set_name) {
  let composed = "";
  // Load config with compose texting.
  const config = yaml.load(fs.readFileSync(TEXTING_CONFIG_PATH, "utf8"));

  // Get current set of the testing.
  // Get texting parts from the current set.
  const set_parts = config["compose"][set_name]["parts"];

  if (set_parts === undefined) {
    throw new Error("Tried to process unknown/broken texting compose.");
  }

  // Go through set parts fetch them and combine into single line.
  for (const [key, value] of Object.entries(set_parts)) {
    // Get path to the value.
    // Example: texting -> start_greeting;
    let keys = value.split(":");

    /**
     * Return array value by keys.
     *
     * @param object
     *   Object or array of objects.
     * @param keys
     *   Array of keys to dig in.
     */
    const deepGet = (object, keys) =>
      keys.reduce((xs, x) => xs?.[x] ?? null, object);

    /**
     * Returns nested array value.
     *
     * @param object
     *   Object or array of objects.
     * @param paths
     *   Array of keys to dig in.
     */
    const deepGetByPaths = (object, ...paths) =>
      paths.map((path) => deepGet(object, path));

    composed += deepGetByPaths(config, keys);
  }

  return composed;
}

/**
 * Return an object of properties.
 *
 * @returns {{protect_content: boolean, parse_mode: string}}
 */
function getDefaultMessageParameters() {
  return {
    parse_mode: "MarkdownV2",
    protect_content: true,
  };
}

module.exports = {
  composeText,
  getDefaultMessageParameters,
};
