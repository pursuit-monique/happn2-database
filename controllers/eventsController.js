const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");
const { Client } = require("pg-promise");
const { getAllEvents } = require("../queries/events.js");

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
    const {
      name,
      info,
      about,
      picture,
      time,
      date,
      address,
      lat,
      lng,
      organization_id,
      cause_id,
      type_id,
      locale_info,
      tags,
    } = req.body;

    const newEvent = await addEvent({
      name,
      info,
      about,
      picture,
      time,
      date,
      address,
      lat,
      lng,
      organization_id,
      cause_id,
      type_id,
      locale_info,
      tags,
    });

    res.json(newEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = events;
