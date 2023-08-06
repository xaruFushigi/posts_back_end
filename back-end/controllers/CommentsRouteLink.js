const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

// SELECT * FROM Comments WHERE id = $1 REFERNCE id;
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: postId, // return every single item where POST ID is equal to parameter (postId)
    },
  });
  res.json(comments);
});

// INSERT INTO Comments () VALUES ();
router.post("/", validateToken, async (req, res) => {
  console.log(req.body);
  const comment = req.body;
  const username = req.user.username;
  comment.username = username; // passing username to comment table as comment.username
  await Comments.create(comment);
  res.status(200).json(comment);
});

router.delete("/delete/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  return res.status(200).json({ message: "deleted successfully" });
});

module.exports = router;
