const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Suggestion = require("../models/suggestionModel");

/**
 * Route for the suggestion creation.
 *
 * @route POST api/suggestion
 * @description Creates suggestion entry using mongoose.
 * @access private
 */
router.post("/", async (request, response) => {
  const { author, body, date } = request.body;

  try {
    const SuggestionEntity = mongoose.model("Suggestion", Suggestion.schema);
    const suggestion = new SuggestionEntity({
      author: author,
      body: body,
      date: date,
    });

    await suggestion.save();
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Server error");
  }
});

module.exports = router;
