"use strict";
const { Server } = require("socket.io");
const { CLIENT_URI } = process.env;

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

/**
 * @type {import("socket.io").Socket}
 */
let io;

const loadSocketListeners = (_io) => {
  io = _io;
  io.on('connection', (socket) => {
    socket.on("identify", (msg) => {
      console.log(msg)
      const json = JSON.parse(msg);
      const { user_id } = json.data;

      // cache socker id of the user
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

const sendGlobal = async (data) => {
  const json = {
    op: "broadcast",
    data,
  };

  for (const [_, socket] of userSockets) {
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
}

const sendDeletePost = async (data) => {
  sendGlobal(data);
}

module.exports = {
  sendGlobal,
  sendDm,
  sendTimeline,
  sendDeletePost,
  sendPostLike,

  loadSocketListeners,
  createServer,
}
