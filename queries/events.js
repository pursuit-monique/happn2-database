const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllEvents = async (coords) => {
  console.log(coords.radius);
  try {
    const allEvents = await db.any(
      "SELECT * FROM (SELECT id, name, info, about, picture, start_date, end_date, address, lat, lng, ST_MakePoint(lng, lat)::geometry AS location, organization_id, cause_id, type_id, locale_info, tags, ST_Distance(ST_MakePoint(lng, lat)::geography, ST_MakePoint($1, $2)::geography) / 1609.344 AS distance_miles FROM events) AS eventlist WHERE distance_miles < $3;",
      [coords.longitude, coords.latitude, coords.radius]
    );
    console.log(allEvents);
    return allEvents;
  } catch (error) {
    return error;
  }
};
const testAllEvents = async () => {
  try {
    const allEvents = await db.any("SELECT * FROM events;");
    return allEvents;
  } catch (error) {
    return error;
  }
};

const getOneEvent = async (coords) => {
  console.log(coords);
  try {
    const oneEvent = await db.one(
      "SELECT * FROM (SELECT id, name, info, about, picture, start_date, end_date, address, lat, lng, ST_MakePoint(lng, lat)::geometry AS location, organization_id, cause_id, type_id, locale_info, tags, ST_Distance(ST_MakePoint(lng, lat)::geography, ST_MakePoint($1, $2)::geography) / 1609.344 AS distance_miles FROM events WHERE id = $3) AS eventlist;",
      [coords.longitude, coords.latitude, coords.id]
    );
    return oneEvent;
  } catch (error) {
    return error;
  }
};

const addEvent = async (eventData) => {
  try {
    const insertedEvent = await db.one(
      "INSERT INTO events (name, info, about, picture, start_date, end_date, address, lat, lng, organization_id, cause_id, type_id, locale_info, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
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
    console.log("inserted", insertedEvent);
    return insertedEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { addEvent, testAllEvents, getAllEvents, getOneEvent };
