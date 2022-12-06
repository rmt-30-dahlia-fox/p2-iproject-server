const express = require("express");
const { verifyPassword } = require("../helpers/bycript");
const { generateToken, verifyToken } = require("../helpers/jwt");
const router = express.Router();
const { User, Medicine, Doctor, Receipt } = require("../models");

// admin
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw { name: "Email is required" };
    if (!password) throw { name: "Password is required" };
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) throw { name: "Invalid email/password" };
    const checkPassword = verifyPassword(password, findUser.password);
    if (!checkPassword) throw { name: "Invalid email/password" };
    const payload = {
      id: findUser.id,
      email: findUser.email,
    };
    const access_token = generateToken(payload);
    res.status(200).json({ access_token });
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  console.log(err);

  if (err.name === "Email is required") {
    code = 400;
    message = err.name;
  } else if (err.name === "Password is required") {
    code = 400;
    message = err.name;
  } else if (err.name === "Invalid email/password") {
    code = 401;
    message = err.name;
  }

  res.status(code).json({ message });
});

module.exports = router;
