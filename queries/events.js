const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllEvents = async () => {
  try {
    const allEvents = await db.any(
      "SELECT id, name, info, about, picture, start_date, end_date, address, lat, lng, ST_MakePoint(lng, lat)::geometry AS location, organization_id, cause_id, type_id, locale_info, tags, ST_Distance(ST_MakePoint(lng, lat)::geography,'SRID=4326;LINESTRING(-72.1260 42.45, -72.123 42.1546)'::geography) / 1609.344 AS distance_miles FROM events"
    );
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
