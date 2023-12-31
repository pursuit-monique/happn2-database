const express = require("express");
const events = express.Router();
const db = require("../happn2db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllUsers };
