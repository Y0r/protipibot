const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Log = require("../models/logModel");

/**
 * Route for the log creation.
 *
 * @route POST api/logs
 * @description Creates log entry using mongoose.
 * @access private
 */
router.post("/", async (request, response) => {
  const { message, level, date } = request.body;

  try {
    const LogEntity = mongoose.model("Log", Log.schema);
    const log = new LogEntity({
      message: message,
      level: level,
      date: date,
    });

    await log.save();
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Server error");
  }
});

module.exports = router;
