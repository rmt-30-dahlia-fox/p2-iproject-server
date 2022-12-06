"use strict";

const { createHash } = require('crypto');
const { readFileSync } = require('fs');

const hashFile = (filePath) => {
  const fileBuffer = readFileSync(filePath);
  const hashSum = createHash('md5');
  hashSum.update(fileBuffer);

  return hashSum.digest('hex');
}

module.exports = {
  hashFile,
}
