const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// database: Users table
const { Users } = require("../models");
// jwb token validation
const { validateToken } = require("../middleware/AuthMiddleware");

const { sign } = require("jsonwebtoken");

// handles registration route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // hashing user's password and creating new user
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash });
  });
  // sending 200 status
  res.status(200).json({
    success: `User: ${username} has been created. Welcome to the Site!!! `,
  });
});
// handles login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  // if username does not exist in the database
  if (!user) {
    return res.status(404).json({ error: "Wrong Username Or Password" });
  }
  // if password does not mathc/exits in the database
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.status(405).json({ error: "Wrong Username Or Password" });
    }
    // jsonwebtoken
    const accessToken = sign(
      { username: user.username, id: user.id },
      "secret", // session token secret
    );
    // sending 200 status
    return res.status(200).json({
      success: `Logged In!!! Welcome back ${username} We missed You :)`,
      accessToken: accessToken,
      username: user.username,
      id: user.id,
    });
  });
});
// handles user profile page
router.get("/profile/byId/:profileId", async (req, res) => {
  const profileId = req.params.profileId;
  const profileInfo = await Users.findByPk(profileId, {
    attributes: { exclude: ["password"] },
  }); // attribute field excludes selected column

  res.status(200).json({ profileInfo: profileInfo });
});
// validate Token
router.get("/validToken", validateToken, (req, res) => {
  res.json(req.user);
});
// handle change password
router.put("/changePassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword, userId } = req.body;
  const user = await Users.findOne({ where: { id: userId } });
  bcrypt.compare(oldPassword, user.password).then((match) => {
    // if oldPassword does not match
    if (!match) {
      return res.status(405).json({ error: true });
    }
    // if odlPasswor and newPassword are same
    else if (match && oldPassword === newPassword) {
      return res.status(400).json({
        error: false,
        same: true,
        message: "New Password can not be same as Old Password",
      });
    }
    // if above all false
    else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { id: userId } });
      });

      return res.status(200).json({
        error: false,
      });
    }
  });
});

module.exports = router;
