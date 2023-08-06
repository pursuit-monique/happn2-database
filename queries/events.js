const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllEvents = async () => {
  try {
    const allEvents = await db.any("SELECT * FROM events");
    return allEvents;
  } catch (error) {
    return error;
  }
};

const addEvent = async (event) => {
  try {
    const event = await db.one(
      "INSERT INTO events (name, info, about, picture, time, date, address, lat, lng, organization_id, cause_id, type_id, locale_info, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
      [
        event.name,
        event.info,
        event.about,
        event.picture,
        event.time,
        event.date,
        event.address,
        event.lat,
        event.lng,
        event.organization_id,
        event.cause_id,
        event.type_id,
        event.locale_info,
        event.tags,
      ]
    );
    return event;
  } catch (error) {
    return error;
  }
};

module.exports = { addEvent, getAllEvents };
