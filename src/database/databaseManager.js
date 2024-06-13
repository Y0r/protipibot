const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, `${appRoot}/.env`) });

/**
 * Establish connection with MongoDB.
 *
 * @returns {Promise<void>}
 */
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    // Process error and log it.
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connect };
