const express = require("express");
const events = express.Router();
events.use(express.json());
const db = require("../happn2db/dbConfig.js");
const { Client } = require("pg-promise");
const { getAllEvents, addEvent } = require("../queries/events.js");

const eventData = {
  name: "foobhbhbd",
  info: "Fundraising event jijij local charities",
  about: "Join us for an evening of elegance and philanthropy.",
  picture: "charity_gala.jpg",
  time: "2023-09-15 18:00:00",
  date: "2023-09-15",
  address: "123 Main Street, Cityville",
  lat: 37.123456,
  lng: -122.654321,
  organization_id: 1,
  cause_id: 3,
  type_id: 2,
  locale_info: "English",
  tags: "charity, fundraising, gala",
};

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

    // const newEvent = await addEvent(eventData);

    res.json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = events;
