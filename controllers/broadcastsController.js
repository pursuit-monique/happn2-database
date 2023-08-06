const express = require("express");
const broadcasts = express.Router();
const db = require("../happn2db/dbConfig.js");
const { Client } = require("pg-promise");
const { getAllBroadcasts } = require("../queries/broadcastsjs");

broadcasts.get("/", async (req, res) => {
  try {
    const broadcastList = await getAllBroadcasts();
    res.json(broadcastList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = broadcasts;
