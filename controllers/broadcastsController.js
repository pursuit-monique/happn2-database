const express = require("express");
const broadcasts = express.Router();
broadcasts.use(express.json());
// const db = require("../happn2db/dbConfig.js");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
// const fetch = require("node-fetch");
// const { Client } = require("pg-promise");

const {
  getAllBroadcasts,
  createNewBroadcast,
} = require("../queries/broadcasts.js");

broadcasts.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    console.log("query id", id);
    const broadcastList = await getAllBroadcasts({ id });
    console.log(broadcastList);
    res.json(broadcastList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const app_access_key = process.env.HMS_ACCESS_KEY;

broadcasts.post("/make-request", async (req, res) => {
  console.log("req.body", req.body);

  const { event_id, user_id, title, about } = req.body;
  console.log(event_id);
  console.log(user_id);
  console.log(title);
  console.log(about);
  try {
    console.log("req.body", req.body);
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
        name: title.trim(),
        description: about,
        template_id: "647c9ecbb4208c13c3d74f41",
      }),
    };

    const response = await fetch(
      "https://api.100ms.live/v2/rooms",
      requestOptions
    );

    const data = await response.json();
    console.log("data", data);

    const roomCodes = await fetch(
      `https://api.100ms.live/v2/room-codes/room/${data.id}`,
      { method: requestOptions.method, headers: requestOptions.headers }
    );
    const roomCodeList = await roomCodes.json();
    // console.log("result:", roomCodeList);

    console.log(roomCodeList);
    const roomCodeMap = {};
    roomCodeList.data.forEach((roomCode, index) => {
      roomCodeMap[roomCode.role] = roomCode.code;
    });

    const newBroadcast = await createNewBroadcast(
      Number(event_id),
      Number(user_id),
      roomCodeList.data[0].id,
      title,
      about,
      roomCodeMap,
      roomCodeList.data[0].created_at
    );
    console.log(newBroadcast);
    // Return a response or perform other actions as needed
    res.json(newBroadcast);
  } catch (error) {
    res.status(500).json({ message: "Request error" });
  }
});

module.exports = broadcasts;
