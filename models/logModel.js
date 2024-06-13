const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = Schema({
  logId: {
    type: Schema.Types.UUID,
    ref: "Log",
  },
  message: String,
  level: {
    type: String,
    enum: ["notice", "error"],
    default: "notice",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logSchema);
