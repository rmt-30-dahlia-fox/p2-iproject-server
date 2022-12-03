"use strict";

const WebSocket = require("uWebSockets.js");

const wsApp = WebSocket.App();

const PORT = process.env.PORT || 8080;

wsApp.ws('/chat', {

  /* There are many common helper features */
  // idleTimeout: 32,
  // maxBackpressure: 1024,
  // maxPayloadLength: 512,
  // compression: WebSocket.DEDICATED_COMPRESSOR_3KB,

  /* For brevity we skip the other events (upgrade, open, ping, pong, close) */
  upgrade: (res, req, context) => {
    console.log(res, "<<<<<<<<<<<< res [upgrade]");
    console.log(req, "<<<<<<<<<<<< req [upgrade]");
    console.log(context, "<<<<<<<<<<<< context [upgrade]");
  },
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
  close: (pattern, behavior) => {
    console.log(pattern, "<<<<<<< pattern [close]");
    console.log(behavior, "<<<<<<< behavior [close]");
  },

  message: (ws, message, isBinary) => {
    /* You can do app.publish('sensors/home/temperature', '22C') kind of pub/sub as well */
  console.log(ws, "<<<<<<<<< ws [ws]");
  console.log(message, "<<<<<<<<< message [ws]");
  console.log(isBinary, "<<<<<<<<< isBinary [ws]");
    
    /* Here we echo the message back, using compression if available */
    let ok = ws.send(message, isBinary, true);
    console.log(ok, "<<<<<<<<< ok [message]");
  }
  
})
// .get('/*', (res, req) => {
// 
//   /* It does Http as well */
//   res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there!');
//   
// })
.listen(PORT, (listenSocket) => {
  console.log(listenSocket, "<<<<<<<<< listenSocket [listen]");

  if (listenSocket) {
    console.log('Listening to port', PORT);
  }
  
});
