const express = require("express");
const broadcasts = express.Router();
const db = require("../happn2db/dbConfig.js");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const fetch = require("node-fetch");
const { Client } = require("pg-promise");
const { getAllBroadcasts } = require("../queries/broadcasts.js");

broadcasts.get("/", async (req, res) => {
  try {
    const broadcastList = await getAllBroadcasts();
    res.json(broadcastList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const app_access_key = process.env.HMS_ACCESS_KEY;

broadcasts.get("/make-request", async (req, res) => {
  const { name, description } = req.query;

  try {
    const payload = {
      access_key: app_access_key,
      type: "management",
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    };

    let token = jwt.sign(payload, process.env.HMS_SECRET, {
      algorithm: "HS256",
      expiresIn: "5m",
      jwtid: uuid4(),
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        template_id: "647c9ecbb4208c13c3d74f41",
      }),
    };

    const response = await fetch(
      "https://api.100ms.live/v2/rooms",
      requestOptions
    );

    const data = await response.json();
    // console.log(
    //   "token",
    //   token,
    //   "requestOptions: ",
    //   requestOptions,
    //   "Data: ",
    //   data
    // );
    console.log(data);

    const roomCodes = await fetch(
      `https://api.100ms.live/v2/room-codes/room/${data.id}`,
      { method: requestOptions.method, headers: requestOptions.headers }
    );
    const roomCodeList = await roomCodes.json();
    console.log("result:", roomCodeList);
    res.json(roomCodeList);
  } catch (error) {
    res.status(500).json({ message: "Request error" });
  }
});

module.exports = broadcasts;
