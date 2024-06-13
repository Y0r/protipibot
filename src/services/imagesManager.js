
const path = require('path')
const appRoot = require('app-root-path')
require('dotenv').config({ path: path.resolve(__dirname, `${appRoot}/.env`) })

/**
 * URL of the Cat API endpoint.
 *
 * @type {string}
 */
const CAT_API_URL = process.env.CAT_API_URL;

/**
 * Token for the Cat API.
 *
 * @type {string}
 */
const CAT_API_TOKEN = process.env.CAT_API_TOKEN;

/**
 * Return response with cat photo.
 */
function getCatPhotoUrl() {
  return fetch(`${CAT_API_URL}?limit=1`, {
    headers: {'x-api-key': CAT_API_TOKEN},
  })
    .then((response) => {
      return response.json();
    });
}

module.exports = {
  getCatPhotoUrl,
}