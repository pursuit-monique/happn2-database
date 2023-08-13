const express = require("express");
const cors = require("cors");
const app = express();
const broadcastControllers = require("./controllers/broadcastsController");
const causeControllers = require("./controllers/causesController");
const eventControllers = require("./controllers/eventsController");

app.use(express.json());
app.use("/broadcasts", broadcastControllers);
app.use("/causes", causeControllers);
app.use("/events", eventControllers);

app.use(cors());

app.get("/", (request, response) => {
  response.status(200).json({ data: "Happndb is running." });
});

module.exports = app;
