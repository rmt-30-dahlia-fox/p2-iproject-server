"use strict";

const { OAuth2Client } = require("google-auth-library");
const { OAUTH_ID } = process.env;

const client = new OAuth2Client(OAUTH_ID);

const verifyGoogleToken = async (token) => {
	const tokenInfo = await client.verifyIdToken({
		idToken: token,
		audience: OAUTH_ID,
	});

	const payload = tokenInfo.getPayload();

	return payload;
}

module.exports = {
	verifyGoogleToken,
}
