const Post = require("../models/posts.model");

const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const posts = await Post.selectAll(Number(page), Number(limit));

  res.json({
    page,
    limit,
    results: posts,
  });
};

const getById = async (req, res) => {
  const { postId } = req.params;

  const post = await Post.selectById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post no encontrado.",
    });
  }

  res.json(post);
};
module.exports = { getAll, getById };
