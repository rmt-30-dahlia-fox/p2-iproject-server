"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const http = require('http');

const router = require("./routes/router.js");
const { createServer, loadSocketListeners, } = require("./util/ws");

const app = express();

const server = http.createServer(app);
const io = createServer(server);
loadSocketListeners(io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(router);

module.exports = server;
