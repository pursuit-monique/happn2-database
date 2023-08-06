const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllCauses = async () => {
  try {
    const allCauses = await db.any("SELECT * FROM causes");
    return allCauses;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllCauses };
