const express = require("express");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const fetch = require("node-fetch"); // Add this line to handle HTTP requests

const app = express();
const port = 3000;

const app_access_key = process.env.HMS_ACCESS_KEY;
const app_secret = process.env.HMS_SECRET;

// Route to generate and return the management token
let managementToken;
const payload = {
  access_key: app_access_key,
  type: "management",
  version: 2,
  iat: Math.floor(Date.now() / 1000),
  nbf: Math.floor(Date.now() / 1000),
};

jwt.sign(
  payload,
  app_secret,
  {
    algorithm: "HS256",
    expiresIn: "24h",
    jwtid: uuid4(),
  },
  function (err, token) {
    if (err) {
      return res.status(500).json({ message: "Token generation error" });
    }
    managementToken = res.json({ token });
  }
);

// Route to make an authenticated API request
app.get("/make-request", async (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${managementToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "new-room-1662723668",
      description: "This is a sample description for the room",
      template_id: "<template_id>",
    }),
  };

  try {
    const response = await fetch(
      "https://api.100ms.live/v2/rooms",
      requestOptions
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Request error" });
  }
});
