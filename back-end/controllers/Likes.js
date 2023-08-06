const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  // checks has user already liked the post
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    return res.status(200).json({ liked: true });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    return res.status(200).json({ liked: false });
  }
});

module.exports = router;
