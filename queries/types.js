const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllTypes = async () => {
  try {
    const allTypes = await db.any("SELECT * FROM causes");
    return allTypes;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllTypes };
