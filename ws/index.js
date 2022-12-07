"use strict";

require("dotenv").config();
const WebSocket = require("uWebSockets.js");
const {comparePass} = require("./utils/crypto");
const {verifyToken, createToken} = require("./utils/jwt");

const wsApp = WebSocket.App();

const PORT = process.env.PORT || 8080;
const TOPIC_GLOBAL = "global";

// unimportant
let allow = true;

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
  let body;
  let abort;
  res.onData((chunk, isLast) => {
    try {
      data += arrayBufferToStr(chunk);

      if (isLast) {
	// process data
	console.log(data);
	const json = JSON.parse(data);
	// console.log(json);

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
	  if (!abort) res.writeStatus(getWriteStatus(200)).end(JSON.stringify({
	    "access-token": access_token,
	  }), true);
	}
	else {
	  if (json.op === "broadcast") {
	    for (const [id, socket] of userSockets) {
	      socket.send(JSON.stringify(json.data));
	    }
	    if (!abort) res.writeStatus(getWriteStatus(200)).end(undefined, true);
	  }
	  else if (json.op === "single") {
	    const { recipient_id } = json.data;

	    if (!recipient_id) {
	      throw {
		status: 400,
		message: "recipient_id is required",
	      };
	    }

	    const userSocket = userSockets.get(recipient_id);
	    if (!userSocket) {
	      throw { status: 404, message: "Unknown/offline recipient" };
	    }

	    const code = userSocket.send(JSON.stringify(json.data), false, true);
	    // console.log(code, "<<<<<<<<< code [single sock.send]");
	    if (code !== 1) {
	      throw {
		status: 500,
		message: "Unexpected socket return code",
		code,
	      };
	    }
	    if (!abort) res.writeStatus(getWriteStatus(200)).end(undefined, true);
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

      body = {
	message: err.message || "Internal Server Error",
	code: err.code,
      };

      if (!abort) res.writeStatus(writeStatus).end(JSON.stringify(body), true);
    }
  });

  res.onAborted(() => {
    console.log("Request aborted");
  });

  if (!login) {
    const access_token = req.getHeader("access-token");

    try {
      if (!access_token) {
	status = 401;
	body = {
	  message: "Unauthorized",
	}
	throw null;
      }

      const payload = verifyToken(access_token);
      // console.log(payload)
      if (payload?.server !== "server") {
	status = 401;
	body = {
	  message: "Unauthorized",
	}
	throw null;
      }
    } catch (err) {
      console.error(err, "<<<<<<<<<< auth [ERROR]");
      if (err?.name === "JsonWebTokenError") {
	status = 401;
	body = {
	  message: "Unauthorized",
	}
      }

      if (status === 500) console.error("[WARN] STATUS 500 UNHANDLED ERROR");
      writeStatus = getWriteStatus(status);
      abort = true;
      res.writeStatus(writeStatus).end(typeof body === "object" ? JSON.stringify(body) : body, true);
    }
  }
}

// utils end ////////////////////////////////

wsApp.ws('/', {

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
  // open: (ws) => {
  //   console.log(arrayBufferToStr(ws.getRemoteAddressAsText()), "<<<<<<< ws [open]");
  // },
  // ping: (ws, message) => {
  //   console.log(ws, "<<<<<<< ws [ping]");
  //   console.log(message, "<<<<<<< message [ping]");
  // },
  // pong: (ws, message) => {
  //   // emitted every once in a while to check for client activity
  //   console.log(ws, "<<<<<<< ws [pong]");
  //   console.log(message, "<<<<<<< message [pong]");
  // },
  close: (ws, code, message) => {
    if (code === 1001) return;
    try {
      console.log("[CLOSE]: ", code, arrayBufferToStr(message));
      const json = parseMessage(message);
      userSockets.delete(json.user_id);
    } catch (err) {
      console.error(err, "<<<<<<<< err [close]");
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
      else console.log(json, "<<<<<<<< json [message]");
    } catch (err) {
      console.error(err, "<<<<<<<< err [message]");
      console.error(arrayBufferToStr(message));
    }
  }
})
.any('/*', (res, req) => {
  // tiny shenanigan
  if (!allow) {
    return res.close();
  }
  res.end('Hello how are you i am under the wather');
  allow = false;
  setTimeout(() => {
    allow = true;
  }, 5000);
})
// any chat
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

  for (const [uid, sock] of userSockets) {
    console.log(uid);
    sock.send(str, false, true);
  }
});
