const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const broadcastControllers = require("./controllers/broadcastsController");
const causeControllers = require("./controllers/causesController");
const eventControllers = require("./controllers/eventsController");
const filterControllers = require("./controllers/filterController");

app.use("/broadcasts", broadcastControllers);
app.use("/causes", causeControllers);
app.use("/events", eventControllers);
app.use("/filter", filterControllers);

app.get("/", (request, response) => {
  response.status(200).json({ data: "Happndb is running." });
});

module.exports = app;
