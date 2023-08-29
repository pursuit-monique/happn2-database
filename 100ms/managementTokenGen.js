var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

var app_access_key = "<app_access_key>";
var app_secret = "<app_secret>";
var payload = {
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
    console.log(token);
  }
);
