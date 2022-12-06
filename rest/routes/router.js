"use strict";

const { join } = require("path");
const { Router } = require("express");
const multer  = require('multer')
const { User } = require("../models");
const { verifyToken } = require("../util/jwt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "..", "public", "media"))
  },
  filename: function (req, file, cb) {
    console.log(file, "<<<<<<<<<<< file [storage.filename]");
    cb(null, req.upload.fileName)
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 32,
  },
});

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email) {
      throw {
	status: 400,
	message: "Email is required",
      };
    }
    
    if(!password) {
      throw {
	status: 400,
	message: "Password is required",
      };
    }

    const user = await User.findOne({ where: { email }});

    if (!user || !comparePass(password, user.password)) {
      throw {
	status: 401,
	message: "Invalid email/password",
      };
    }

    res.status(200).json({
      access_token: signToken({
	id: user.id,
      }),
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});

router.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
	status: 401,
	message: "Invalid token"
      };
    }

    const payload = verifyToken(access_token);

    if (!payload?.id) {
      throw {
	status: 401,
	message: "Invalid token"
      };
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw {
	status: 401,
	message: "Invalid token"
      };
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

router.post("/upload", async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
});

router.post("/chat/global", {

});

router.post("/chat/:id", {

});

// error handler
router.use((err, req, res, next) => {
  console.error(err); // remove this later

  if (Object.keys(err).length === 2 && err.status && err.message) {
      return res.status(err.status).json(
      {
	message: err.message,
      }
    );
  } else {
    if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name)) {
      return res.status(400).json({
	message: err.errors[0]?.message,
      });
    }
    else if (["JsonWebTokenError",].includes(err.name)) {
      return res.status(401).json({
	message: "Invalid token",
      });
    }
  }

  console.error("[STATUS] 500");
  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = router;
