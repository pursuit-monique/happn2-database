const express = require("express");
const causes = express.Router();
const db = require("../happn2db/dbConfig.js");
const { Client } = require("pg-promise");
const { getAllCauses } = require("../queries/causes.js");

causes.get("/", async (req, res) => {
  try {
    const causesList = await getAllCauses();
    res.json(causesList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = causes;
