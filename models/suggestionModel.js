const mongoose = require("mongoose");
const { Schema } = mongoose;

const suggestionSchema = Schema({
  suggestionId: {
    type: Schema.Types.UUID,
    ref: "Suggestion",
  },
  author: {
    id: Number,
    name: String,
  },
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
