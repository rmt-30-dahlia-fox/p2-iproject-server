"use strict";

const { Router } = require("express");
const { User, Media, Message } = require("../models");
const { verifyToken, createToken } = require("../util/jwt");
const { comparePass } = require("../util/crypto");
const { upload } = require("../middlewares/upload.js");
const {sendGlobal} = require("../util/ws");

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    if (!username) {
      throw {
	status: 400,
	message: "Username is required",
      };
    }

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

    const user = await User.create({ username, email, password });

    res.status(201).json({
      access_token: createToken({
	id: user.id,
      }),
      user: {
	id: user.id,
	email: user.email,
	username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
});

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
      access_token: createToken({
	id: user.id,
      }),
      user: {
	id: user.id,
	email: user.email,
	username: user.username,
      },
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

router.post('/avatars', upload.single('avatar'), async (req, res, next) => {
  try {
    const { filename, mimetype, fieldname } = req.file;

    const media = await Media.create({
      hash: filename,
      type: fieldname,
      format: mimetype,
    });

    res.status(201).json(media);
  } catch (err) {
    next(err);
  }
});

router.post('/attachments', upload.single('attachment'), async (req, res, next) => {
  try {

    res.status(201).json(media);
  } catch (err) {
    next(err);
  }
});

router.post("/chat/global", async (req, res, next) => {
  try {
    const {
      content,
    } = req.body;

    let media;
    const data = {
      content,
      UserId: req.user.id,
      type: "global",
    };

    if (req.file) {
      const { filename, mimetype, fieldname } = req.file;

      media = await Media.create({
	hash: filename,
	type: fieldname,
	format: mimetype,
      });

      data.AttachmentId = media.id;
    }

    const message = await Message.create(data);

    if (media) data.Attachment = media;
    // post ws
    const res = await sendGlobal(data);

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

router.post("/chat/:id", async (req, res, next) => {
  let data;
  try {
    const {
      content,
    } = req.body;

    data = {
      content,
      UserId: req.user.id,
    };

    data.createdAt = data.updatedAt = new Date();

    // post ws
    const res = await sendGlobal(data);

    const message = await Message.create(data);

    res.status(201).json(message);
  } catch (err) {
    if (err.response.data.message === "Unknown/offline recipient") {
      const message = await Message.create(data);

      res.status(201).json(message);
      return res.status(201).json(message);
    }
    next(err);
  }
});

// error handler
router.use((err, req, res, next) => {
  console.error(err); // remove this later

  if (Object.keys(err).length === 2 && err.status && err.message) {
    return res.status(err.status).json(
      {
	message: err.message,
      },
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
