const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllOrganizations = async () => {
  try {
    const allOrganizations = await db.any("SELECT * FROM causes");
    return allOrganizations;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllOrganizations };
