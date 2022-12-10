"use strict";
require("dotenv").config();
const axios = require("axios");
const { Server } = require("socket.io");
const { WS_PASS, WS_URI, CLIENT_URI } = process.env;

// const ax = axios.create({
//   baseURL: WS_URI,
// });

// "http://localhost:8080" ||
// let access_token;

/**
 * @type {Map<number, import("socket.io").Socket>}
 */
const userSockets = new Map();

const createServer = (httpServer) => {
  return new Server(httpServer, {
    cors: {
      origin: CLIENT_URI || "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
}

let io;

const loadSocketListeners = (_io) => {
  io = _io;
  io.on('connection', (socket) => {
    socket.on("identify", (msg) => {
      console.log(msg)
      const json = JSON.parse(msg);
      const { user_id } = json.data;

      // check if user actually exist
      
      userSockets.set(Number(user_id), socket.id);
    });

    socket.on('disconnect', () => {
      let uId;
      for (const [id, usocket] of userSockets) {
	if (socket.id === usocket) {
	  uId = id;
	  break;
	}
      }

      userSockets.delete(uId);
    });
  });
}

// const login = async () => {
//   const json = {
//     pass: WS_PASS,
//   };
// 
//   const res = await ax.post("/login", json);
//   access_token = res.data["access-token"];
// 
//   return res;
// }

const sendGlobal = async (data) => {
  const json = {
    op: "broadcast",
    data,
  };

  // const res = await ax.post("/chat", json, {
  //   headers: {
  //     "access-token": access_token,
  //   },
  // });

  for (const [id, socket] of userSockets) {
    io.to(socket).emit("broadcast", JSON.stringify(json.data));
  }
}

const sendDm = async (data) => {
  const socketUser = userSockets.get(data.UserId);
  const socketRecipient = userSockets.get(data.RecipientId);

  const json = {
    op: "single",
    data,
  };

  const jsonStr = JSON.stringify(json.data);
  
  if (socketUser) {
    io.to(socketUser).emit("single", jsonStr);
  }

  if (socketRecipient) {
    io.to(socketRecipient).emit("single", jsonStr);
  }

  // const res = await ax.post("/chat", json, {
  //   headers: {
  //     "access-token": access_token,
  //   },
  // });
}

// currently the same as sendGlobal but who knows there will be some change in the future
// for easier refactoring
const sendTimeline = async (data) => {
  sendGlobal(data);
  // const json = {
  //   op: "broadcast",
  //   data,
  // };

  // const res = await ax.post("/timeline", json, {
  //   headers: {
  //     "access-token": access_token,
  //   },
  // });
}

const sendPostLike = async (data) => {
  sendGlobal(data);
  // const json = {
  //   op: "broadcast",
  //   data,
  // };

  // const res = await ax.post("/timeline", json, {
  //   headers: {
  //     "access-token": access_token,
  //   },
  // });

  // return res;
}

const sendDeletePost = async (data) => {
  sendGlobal(data);
  // const json = {
  //   op: "broadcast",
  //   data,
  // };

  // const res = await ax.post("/timeline", json, {
  //   headers: {
  //     "access-token": access_token,
  //   },
  // });

  // return res;
}

module.exports = {
  // login,
  sendGlobal,
  sendDm,
  sendTimeline,
  sendDeletePost,
  sendPostLike,

  loadSocketListeners,
  createServer,
}
