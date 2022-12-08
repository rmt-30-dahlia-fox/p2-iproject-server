"use strict";

const { Router } = require("express");
const { PostAttachment, User, Media, MessageAttachment, Message, Post } = require("../models");
const { verifyToken, createToken } = require("../util/jwt");
const { comparePass } = require("../util/crypto");
const { upload } = require("../middlewares/upload.js");
const { sendGlobal, sendDm, sendTimeline, sendDeletePost } = require("../util/ws");
const { Op } = require("sequelize");

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

    const user = await User.findOne({
      where: { email },
      include: [
	{
	  model: Media,
	  as: "Avatar",
	},
      ]
    });

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
	bio: user.bio,
	AvatarId: user.AvatarId,
	Avatar: user.Avatar,
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

    const user = await User.findByPk(payload.id, {
      include: [
	{
	  model: Media,
	  as: "Avatar",
	},
      ]
    });
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

router.get("/posts", async (req, res, next) => {
  try {
    res.status(200).json(await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
	{
	  model: PostAttachment,
	  include: [
	    {
	      model: Media,
	    },
	  ],
	},
	{
	  model: User,
	  as: "users",
	  attributes: [
	    "id",
	    "email",
	    "bio",
	    "AvatarId",
	    "username",
	  ],
	  include: [
	    {
	      model: Media,
	      as: "Avatar",
	    }
	  ]
	},
      ],
    }));
  } catch (err) {
    next(err);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    res.status(200).json(await User.findAll({
      where: {
	[Op.not]: {
	  id: req.user.id,
	},
      },
      include: [
	{
	  model: Media,
	  as: "Avatar",
	},
      ],
      attributes: [
	"id",
	"email",
	"bio",
	"AvatarId",
	"username",
      ],
    }));
  } catch (err) {
    next(err);
  }
});

router.get("/messages/:id", async (req, res, next) => {
  try {
    let opt;
    console.log(req.params);
    if (req.params.id !== "global") {
      opt = {
      where: {
	[Op.or]: [
	  {
	    [Op.and]: [
	      { RecipientId: req.params.id, },
	      { UserId: req.user.id },
	    ],
	  },
	  {
	    [Op.and]: [
	      { RecipientId: req.user.id, },
	      { UserId: req.params.id },
	    ],
	  },
	],
      },
      order: [["createdAt", "ASC"]],
      include: [
	{
	  model: MessageAttachment,
	  include: [
	    {
	      model: Media,
	    },
	  ],
	},
	{
	  model: User,
	  as: "users",
	  attributes: [
	    "id",
	    "email",
	    "bio",
	    "AvatarId",
	    "username",
	  ],
	  include: [
	    {
	      model: Media,
	      as: "Avatar",
	    }
	  ]
	},
      ],
    };
    }
    else {
      opt = {
      where: {
	type: "global",
      },
      order: [["createdAt", "ASC"]],
      include: [
	{
	  model: MessageAttachment,
	  include: [
	    {
	      model: Media,
	    },
	  ],
	},
	{
	  model: User,
	  as: "users",
	  attributes: [
	    "id",
	    "email",
	    "bio",
	    "AvatarId",
	    "username",
	  ],
	  include: [
	    {
	      model: Media,
	      as: "Avatar",
	    }
	  ]
	},
      ],
    };
    }
    console.log(opt);
    res.status(200).json(await Message.findAll(opt));
  } catch (err) {
    next(err);
  }
});

router.put('/profile', upload.single('avatar'), async (req, res, next) => {
  try {
    const {
      username,
      bio,
      password
    } = req.body;

    if (!comparePass(password, req.user.password)) {
      throw {
	status: 401,
	message: "Invalid password",
      };
    }

    let media;

    if (req.file) {
      const { filename, mimetype, fieldname } = req.file;

      media = await Media.create({
	hash: filename,
	type: fieldname,
	format: mimetype,
      });
    }

    const user = await User.findByPk(req.user.id);

    if (media) user.AvatarId = media.id;
    user.username = username;
    user.bio = bio;

    await user.save();

    res.status(200).json({
	id: user.id,
	email: user.email,
	bio: user.bio,
	AvatarId: user.AvatarId,
	Avatar: media,
	username: user.username,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/posts", upload.single('attachment'), async (req, res, next) => {
  try {
    const {
      content,
    } = req.body;

    let media;
    const data = {
      content,
      UserId: req.user.id,
    };

    if (req.file) {
      const { filename, mimetype, fieldname } = req.file;

      media = await Media.create({
	hash: filename,
	type: fieldname,
	format: mimetype,
      });
    }

    const post = await Post.create(data);
    if (media) {
      await PostAttachment.create({
	PostId: post.id,
	MediaId: media.id,
      });
    }

    if (media) data.PostAttachments = [{
      Medium: media,
    }];
    // post ws
    data.users = {
	id: req.user.id,
	email: req.user.email,
	bio: req.user.bio,
	AvatarId: req.user.AvatarId,
	Avatar: req.user.Avatar,
	username: req.user.username,
    };

    data.likeCount = 0;
    data.id = post.id;
    const result = await sendTimeline(data);

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/chat/global", upload.single('attachment'), async (req, res, next) => {
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
    }

    const message = await Message.create(data);
    if (media) {
      await MessageAttachment.create({
	MessageId: message.id,
	MediaId: media.id,
      });
    }

    if (media) data.MessageAttachments = [{
      Medium: media,
    }];
    // post ws
    data.users = {
	id: req.user.id,
	email: req.user.email,
	bio: req.user.bio,
	AvatarId: req.user.AvatarId,
	Avatar: req.user.Avatar,
	username: req.user.username,
    };
    const result = await sendGlobal(data);

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/posts/:id/like", async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      throw {
	status: 404,
	message: "Not Found",
      };
    }

    await post.increment({ likeCount: 1 });

    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

router.delete("/posts/:id", async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      throw {
	status: 404,
	message: "Not Found",
      };
    }

    if (post.UserId !== req.user.id) {
      throw {
	status: 403,
	message: "Forbidden",
      };
    }

    await post.destroy();

    await sendDeletePost({
      op: "delete",
      id: post.id,
    });

    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

router.post("/chat/:id", upload.single('attachment'), async (req, res, next) => {
  try {
    const {
      content,
    } = req.body;

    let { id } = req.params;

    id = Number(id);

    if (isNaN(id)) {
      throw {
	status: 400,
	message: "Invalid user",
      };
    }

    let media;
    const data = {
      content,
      UserId: req.user.id,
      RecipientId: id,
      type: "dm",
    };

    if (req.file) {
      const { filename, mimetype, fieldname } = req.file;

      media = await Media.create({
	hash: filename,
	type: fieldname,
	format: mimetype,
      });
    }

    const message = await Message.create(data);
    if (media) {
      await MessageAttachment.create({
	MessageId: message.id,
	MediaId: media.id,
      });
    }

    if (media) data.MessageAttachments = [{
      Medium: media,
    }];
    // post ws
    data.users = {
	id: req.user.id,
	email: req.user.email,
	bio: req.user.bio,
	AvatarId: req.user.AvatarId,
	Avatar: req.user.Avatar,
	username: req.user.username,
    };
    const result = await sendDm(data);

    res.status(201).json(data);
  } catch (err) {
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
