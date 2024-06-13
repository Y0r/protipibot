const mongoose = require("mongoose");
const { Schema } = mongoose;

const complaintSchema = Schema({
  complaintId: {
    type: Schema.Types.UUID,
    ref: "Complaint",
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

module.exports = mongoose.model("Complaint", complaintSchema);
