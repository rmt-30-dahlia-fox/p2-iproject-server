"use strict";

const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/chat/global", {
  
});

router.post("/chat/:id", {

});

module.exports = router;
