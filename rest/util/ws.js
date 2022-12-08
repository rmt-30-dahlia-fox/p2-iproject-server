"use strict";
require("dotenv").config();
const axios = require("axios");
const { WS_PASS, WS_URI } = process.env;

const ax = axios.create({
  baseURL: WS_URI,
});

let access_token;

const login = async () => {
  const json = {
    pass: WS_PASS,
  };

  const res = await ax.post("/login", json);
  access_token = res.data["access-token"];

  return res;
}

const sendGlobal = async (data) => {
  const json = {
    op: "broadcast",
    data,
  };

  const res = await ax.post("/chat", json, {
    headers: {
      "access-token": access_token,
    },
  });

  return res;
}

const sendDm = async (data) => {
  const json = {
    op: "single",
    data,
  };

  const res = await ax.post("/chat", json, {
    headers: {
      "access-token": access_token,
    },
  });

  return res;
}

// currently the same as sendGlobal but who knows there will be some change in the future
// for easier refactoring
const sendTimeline = async (data) => {
  const json = {
    op: "broadcast",
    data,
  };

  const res = await ax.post("/timeline", json, {
    headers: {
      "access-token": access_token,
    },
  });

  return res;
}

const sendPostLike = async (data) => {
  const json = {
    op: "broadcast",
    data,
  };

  const res = await ax.post("/timeline", json, {
    headers: {
      "access-token": access_token,
    },
  });

  return res;
}

module.exports = {
  login,
  sendGlobal,
  sendDm,
  sendTimeline,
}
