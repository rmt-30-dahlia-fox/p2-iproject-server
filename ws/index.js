"use strict";

const WebSocket = require("uWebSockets.js");

const socket = WebSocket.App();

const PORT = process.env.PORT || 8080;

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
      console.log("[CLOSE]: ", json);
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
    } catch (err) {
      console.error(err, "<<<<<<<< [message]");
    }
  }
  
})
.ws("/globalChat", {
  // !TODO
})
.any('/*', (res, req) => {
  console.log(res, "<<<<<<<<<<< res [any]");
  console.log(req, "<<<<<<<<<<< req [any]");
  res.end('Nothing to see here!');
})
.listen(PORT, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port', PORT);
  }
  else console.log("Failed starting socket on port", PORT);
});

process.stdin.on("data", (buf) => {
  const str = buf.toString().slice(0, -1);

  socket.send(str, false, true);
});
