"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const http = require('http');

const router = require("./routes/router.js");
const {login} = require("./util/ws.js");
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

// stop using uWebSocket, it have to replace express if you want to have one single server
// login();

module.exports = server;
