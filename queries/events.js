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

const addEvent = async (eventData) => {
  try {
    // console.log("eventData", eventData);
    const insertedEvent = await db.one(
      "INSERT INTO events (name, info, about, picture, start_date, end_date, address, lat, lng, organization_id, cause_id, type_id, locale_info, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      // "INSERT INTO events (name, info, about, picture, time, date, address, lat, lng, organization_id, cause_id, type_id, locale_info, tags) VALUES ('Charity Gala', 'Fundraising event for local charities', 'Join us for an evening of elegance and philanthropy.', 'charity_gala.jpg', '2023-09-15 18:00:00', '2023-09-15', '123 Main Street, Cityville', 37.123456, -122.654321, 1, 3, 2, 'English', 'charhuhuhuty, fundraising, gala') RETURNING *"
      [
        eventData.name,
        eventData.info,
        eventData.about,
        eventData.picture,
        eventData.start_date,
        eventData.end_date,
        eventData.address,
        eventData.lat,
        eventData.lng,
        eventData.organization_id,
        eventData.cause_id,
        eventData.type_id,
        eventData.locale_info,
        eventData.tags,
      ]
    );

    return insertedEvent;
  } catch (error) {
    return error;
  }
};

module.exports = { addEvent, getAllEvents };
