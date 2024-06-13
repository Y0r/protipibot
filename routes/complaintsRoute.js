const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Complaint = require("../models/complaintModel");

/**
 * Route for the Complaint creation.
 *
 * @route POST api/Complaint
 * @description Creates Complaint entry using mongoose.
 * @access private
 */
router.post("/", async (request, response) => {
  const { author, body, date } = request.body;

  try {
    const ComplaintEntity = mongoose.model("Complaint", Complaint.schema);
    const complaint = new ComplaintEntity({
      author: author,
      body: body,
      date: date,
    });

    await complaint.save();
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Server error");
  }
});

module.exports = router;
