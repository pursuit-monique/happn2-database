const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllBroadcasts = async () => {
  try {
    const allBroadcasts = await db.any("SELECT * FROM causes");
    return allBroadcasts;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllBroadcasts };
