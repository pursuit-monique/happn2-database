const express = require("express");
const events = express.Router();
events.use(express.json());
const db = require("../happn2db/dbConfig.js");
const { Client } = require("pg-promise");
const { getAllEvents, addEvent } = require("../queries/events.js");
const { filter } = require("../functions/filter.js");

events.get("/", async (req, res) => {
  try {
    const eventsList = await getAllEvents();
    res.json(eventsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

events.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const {
      name,
      info,
      about,
      picture,
      start_date,
      end_date,
      address,
      lat,
      lng,
      organization_id,
      cause_id,
      type_id,
      locale_info,
      tags,
    } = req.body;

    const chatGPTJudgement = await filter(name, about, info);

    if (chatGPTJudgement[0] === "true") {
      res.json({ judgement: true, response: chatGPTJudgement[1] });
      console.log("true", chatGPTJudgement);
    } else {
      console.log("false", chatGPTJudgement);
      const newEvent = await addEvent({
        name,
        info,
        about,
        picture,
        start_date,
        end_date,
        address,
        lat,
        lng,
        organization_id,
        cause_id,
        type_id,
        locale_info,
        tags,
      });

      res.json({ judgement: false, response: newEvent.id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = events;
