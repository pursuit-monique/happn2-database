const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllRoles = async () => {
  try {
    const allRoles = await db.any("SELECT * FROM roles");
    return allRoles;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllRoles };
