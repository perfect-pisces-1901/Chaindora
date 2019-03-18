const express = require("express");
const app = express();
const volleyball = require("volleyball");
const path = require("path");

app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  express.static(
    path.join(__dirname, "..", "node_modules", "font-awesome", "css")
  )
);
app.use(
  "/fonts",
  express.static(
    path.join(__dirname, "..", "node_modules", "font-awesome", "fonts")
  )
);

app.use(function(req, res, next) {
  // CORS headers

  // TODO: DEV ONLY, - too broad - DO NOT PUT IN PRODUCTION - should restrict to specific domain
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Custom-Header"
  );

  // TODO - what does this do?
  // if (req.method === 'OPTIONS') {
  //     return res.status(200).end();
  // }

  return next();
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("./api"));

app.use("/auth", require("./api/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
