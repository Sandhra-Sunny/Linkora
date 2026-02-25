const express = require("express");
const cors = require("cors");
require("dotenv").config();

const urlRoutes = require("./routes/url.routes.js");
const { redirectUrl } = require("./controllers/url.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url", urlRoutes);
app.get("/:shortCode", redirectUrl);

module.exports = app;