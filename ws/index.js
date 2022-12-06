"use strict";

require("dotenv").config();
const WebSocket = require("uWebSockets.js");
const {comparePass} = require("./utils/crypto");
const {verifyToken, createToken} = require("./utils/jwt");

const socket = WebSocket.App();

const PORT = process.env.PORT || 8080;
const TOPIC_GLOBAL = "global";

// utils ////////////////////////////////////
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * @type {Map<string, WebSocket.WebSocket>}
 */
const userSockets = new Map();

const arrayBufferToUint8Array = (arrayBuffer) => {
  return new Uint8Array(arrayBuffer);
}

const strToUint8Array = (str) => {
  return textEncoder.encode(str);
}

const uint8ArrayToStr = (arrayBuffer) => {
  return textDecoder.decode(arrayBuffer);
}

const arrayBufferToStr = (arrayBuffer) => {
  return uint8ArrayToStr(arrayBufferToUint8Array(arrayBuffer));
}

const strToArrayBuffer = (str) => {
  return strToUint8Array(str).buffer;
}

const parseMessage = (message) => {
  return JSON.parse(arrayBufferToStr(message));
}

const getWriteStatus = (status) => {
  switch(status) {
    case 200: return "200 OK";
    case 500: return "500 Internal Server Error";
    case 400: return "400 Bad Request";
    case 404: return "404 Not Found";
    case 401: return "401 Unauthorized";
  }
}

const postHandler = (res, req, login) => {
  let status = 500;
  let writeStatus;
  let data = "";
  res.onData((chunk, isLast) => {
    try {
      data += arrayBufferToStr(chunk);

      if (isLast) {
	// process data
	const json = JSON.parse(data);

	if (login) {
	  const { pass } = json;

	  if (!comparePass(pass)) {
	    throw {
	      status: 401,
	      message: "Unauthorized",
	    }
	  }

	  const access_token = createToken({
	    server: "server",
	  });
	  res.writeStatus(getWriteStatus(200)).end(JSON.stringify({
	    access_token,
	  }), true);
	}
	else {
	  if (json.op === "broadcast") {
	    for (const [id, socket] of userSockets) {
	      socket.send(JSON.stringify(json.data));
	    }
	    res.writeStatus(getWriteStatus(200)).end(undefined, true);
	  }
	  else if (json.op === "single") {
	    const { recipient_id } = json.data;

	    const userSocket = userSockets.get(recipient_id);
	    if (!userSocket) {
	      throw { status: 404, message: "Unknown/offline recipient" };
	    }
	  }
	  else {
	    throw { status: 400, message: "Invalid op" };
	  }
	}
      }
    } catch (err) {
      status = err.status || 500;
      writeStatus = getWriteStatus(status);

      console.error(err);
      console.error("[STATUS]", writeStatus);

      const body = {
	message: err.message || "Internal Server Error",
      };

      res.writeStatus(writeStatus).end(JSON.stringify(body), true);
    }
  });

  res.onAborted(() => {
    writeStatus = getWriteStatus(status);
    res.writeStatus(writeStatus).end(typeof body === "object" ? JSON.stringify(body) : body, true);
  });

  if (!login) {
    const access_token = req.getHeader("access_token");

    if (!access_token) {
      status = 401;
      body = {
	message: "Unauthorized",
      }
      return res.close();
    }

    const payload = verifyToken(access_token);
    if (payload?.server !== "server") {
      status = 401;
      body = {
	message: "Unauthorized",
      }
      return res.close();
    }
  }
}

// utils end ////////////////////////////////

socket.ws('/', {

  /* There are many common helper features */
  // idleTimeout: 32,
  // maxBackpressure: 1024,
  // maxPayloadLength: 512,
  // compression: WebSocket.DEDICATED_COMPRESSOR_3KB,

  /* For brevity we skip the other events (upgrade, open, ping, pong, close) */
  // upgrade: (res, req, context) => {
  //   console.log(res, "<<<<<<<<<<<< res [upgrade]");
  //   console.log(req, "<<<<<<<<<<<< req [upgrade]");
  //   console.log(context, "<<<<<<<<<<<< context [upgrade]");
  // },
  open: (ws) => {
    console.log(ws, "<<<<<<< ws [open]");
  },
  ping: (ws, message) => {
    console.log(ws, "<<<<<<< ws [ping]");
    console.log(message, "<<<<<<< message [ping]");
  },
  pong: (ws, message) => {
    console.log(ws, "<<<<<<< ws [pong]");
    console.log(message, "<<<<<<< message [pong]");
  },
  close: (ws, code, message) => {
    try {
      const json = parseMessage(message);
      userSockets.delete(json.data.user_id);
      console.log("[CLOSE]: ", code, json);
    } catch (err) {
      console.error(err, "<<<<<<<< [close]");
    }
  },

  message: (ws, message, isBinary) => {
    try {
      /* You can do app.publish('sensors/home/temperature', '22C') kind of pub/sub as well */
      const json = parseMessage(message);

      if (json.op === "identify") {
	// expected properties
	const { user_id } = json.data;

	// check if user actually exist
	
	ws.subscribe(TOPIC_GLOBAL);
	userSockets.set(user_id, ws);
      }

      if (json.op === "direct_message") {
	const { recipient_id, content, sentAt } = json.data;

	// check if recipient actually exist

	// check Channel, if not exist create it
	const channel = "find or create channel";

	const topic = `dm/${channel.id}`;
	const recipientSocket = userSockets.get(recipient_id);
	if (recipientSocket) {
	  // subscribe to topic, it will just return false if already subscribed
	  recipientSocket.subscribe(topic);
	}

	// publish
	ws.publish(topic, message, isBinary, true);

	// create Message in database
      }

      if (json.op === "global_message") {
	const { content, sentAt } = json.data;

	// check if recipient actually exist

	// check Channel, if not exist create it
	const channel = "find or create channel";

	// publish
	ws.publish(TOPIC_GLOBAL, message, isBinary, true);

	// create Message in database
      }
    } catch (err) {
      console.error(err, "<<<<<<<< [message]");
    }
  }
})
.any('/*', (res, req) => {
  console.log(res, "<<<<<<<<<<< res [any]");
  console.log(req, "<<<<<<<<<<< req [any]");
  res.end('Nothing to see here!');
})
// user dm
.post("/dm", (res, req) => {
  postHandler(res, req);
})
// global chat
.post("/chat", (res, req) => {
  postHandler(res, req);
})
// timeline
.post("/timeline", (res, req) => {
  postHandler(res, req);
})
.post("/login", (res, req) => {
  postHandler(res, req, true);
})
.listen(PORT, (listenSocket) => {
  if (listenSocket) {
    console.error('Listening to port', PORT);
  }
  else console.error("Failed starting socket on port", PORT);
});

process.stdin.on("data", (buf) => {
  const str = buf.toString().slice(0, -1);

  socket.send(str, false, true);
});
