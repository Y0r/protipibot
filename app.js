// Bot include.
const bot = require("./src/bots/bot.js");

// Init & run express app.
const express = require("express");
const app = express();

// Init Middleware.
app.use(express.json());

// Init & ren database connection.
const database = require("./src/database/databaseManager.js");
database.connect();

// Define Routes.
app.use("/api/suggestions", require("./routes/suggestionsRoute"));
app.use("/api/complaints", require("./routes/complaintsRoute"));
app.use("/api/logs", require("./routes/logsRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
