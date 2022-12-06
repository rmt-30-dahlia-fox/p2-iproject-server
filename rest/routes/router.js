"use strict";

const { join } = require("path");
const { Router } = require("express");
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "..", "public", "media"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 64,
  },
});

const router = Router();

router.post("/upload", async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
})

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/chat/global", {

});

router.post("/chat/:id", {

});

module.exports = router;
