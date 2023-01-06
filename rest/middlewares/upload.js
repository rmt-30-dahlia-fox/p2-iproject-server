"use strict";

const { join } = require("path");
const multer  = require('multer')

const upload = multer({ dest: join(__dirname, "..", "public", "media") });

module.exports = {
  upload,
}
