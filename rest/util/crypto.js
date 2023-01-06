"use strict";

const { hashSync, compareSync, genSaltSync } = require("bcryptjs");

const hashPass = (str) => {
	return hashSync(str, genSaltSync(7));
}

const comparePass = (str, hash) => {
	return compareSync(str, hash);
}

module.exports = {
	hashPass,
	comparePass,
}
