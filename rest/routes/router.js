"use strict";

const { Router } = require("express");
const { User, Media } = require("../models");
const { verifyToken, createToken } = require("../util/jwt");
const { comparePass } = require("../util/crypto");
const { upload } = require("../middlewares/upload.js");

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

router.post("/chat/global", (req, res, next) => {
  try {
    const {
      content,
    } = req.body;

    const recv = await User.findByPk(receiverId);

    if (!recv || !voucher) {
      throw {
	status: 404,
	message: "Data not found",
      };
    }

    const gift = await Gift.create({ message, amount, receiverId, sender /*: req.user.email */, voucherId: voucher.id });

    res.status(201).json(gift);
  } catch (err) {
    next(err);
  }
});

router.post("/chat/:id", (req, res, next) => {

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
