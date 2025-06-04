const Post = require("../models/posts.model");

const checkPostId = async (req, res, next) => {
  const { postId } = req.params;

  if (isNaN(postId)) {
    return res.status(400).json({ message: "Los Posts tienen ID numéricos" });
  }
  next();
};

const checkPostExists = async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.selectById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post no encontrado" });
  }
  next();
};

module.exports = { checkPostId, checkPostExists };
