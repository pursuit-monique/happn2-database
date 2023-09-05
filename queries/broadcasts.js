const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllBroadcasts = async () => {
  try {
    const allBroadcasts = await db.any("SELECT * FROM broadcasts");
    return allBroadcasts;
  } catch (error) {
    return error;
  }
};
const createNewBroadcast = async (
  event_id,
  user_id,
  room_id,
  title,
  about,
  room_codes,
  created_at
) => {
  try {
    const newBroadcast = await db.one(
      "INSERT INTO broadcasts (event_id, user_id, room_id, title, about, room_codes, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        Number(event_id),
        Number(user_id),
        room_id,
        title,
        about,
        room_codes,
        created_at,
      ]
    );
    console.log(newBroadcast);
    return newBroadcast;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllBroadcasts, createNewBroadcast };
