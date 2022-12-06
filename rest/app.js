"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes/router.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(router);

module.exports = app;
