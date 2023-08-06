const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models"); // Posts table from sequelize in 'models' folder
const { validateToken } = require("../middleware/AuthMiddleware");

// Note: in 'sequelize' everything should be async
// -- POST -- //
// create new post
router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username; // creating/adding element to 'post' object. getting 'username' from validateToken
  post.UserId = req.user.id;
  await Posts.create(post);
  res.status(200).json(post);
});
// -- DELETE -- //
// delet selected post
router.delete("/byId/:id", validateToken, async (req, res) => {
  const postId = req.params.id;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.status(200).json({ message: "post has been deleted" });
});
// -- GET -- //
// fetch all posts
router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});
// display selected post
router.get("/byPostId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id); // findByPk = find by primary key
  res.status(200).json(post);
});
// posts of selected profile
router.get("/byProfileId/:profileId", async (req, res) => {
  const profileId = req.params.profileId;
  const listAllPost = await Posts.findAll({
    where: { UserId: profileId },
    include: [Likes],
  }); // findByPk = find by primary key
  res.status(200).json(listAllPost);
});
// -- UPDATE -- //
// updating post title
router.put("/updatePostTitle", validateToken, async (req, res) => {
  const { newTitle, postId } = req.body;
  console.log(req.body);
  await Posts.update({ title: newTitle }, { where: { id: postId } });
  res.status(200).json(newTitle);
});
// updating post body
router.put("/updatePostBody", validateToken, async (req, res) => {
  const { newBody, postId } = req.body;
  await Posts.update({ postText: newBody }, { where: { id: postId } });
  res.status(200).json(newBody);
});

module.exports = router;
