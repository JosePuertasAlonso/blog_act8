const Autor = require("../models/autores.model");
const Post = require("../models/posts.model");

const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const autores = await Autor.selectAll(Number(page), Number(limit));

  res.json({
    page,
    limit,
    results: autores,
  });
};

const getById = async (req, res) => {
  const { autorId } = req.params;

  const autor = await Autor.selectById(autorId);

  if (!autor) {
    return res.status(404).json({
      message: "Autor no encontrado.",
    });
  }

  res.json(autor);
};

const getWithPosts = async (req, res) => {
  const { autorId } = req.params;

  const autor = await Autor.selectById(autorId);

  autor.posts = await Post.selectPostsByAutorId(autorId);

  if (!autor) {
    return res.status(404).json({
      message: "Autor no encontrado.",
    });
  }

  res.json(autor);
};

const create = async (req, res) => {
  const result = await Autor.insert(req.body);
  const autor = await Autor.selectById(result.insertId);
  res.json(autor);
};

const edit = async (req, res) => {
  const { autorId } = req.params;

  const result = await Autor.updateById(autorId, req.body);
  const autor = await Autor.selectById(autorId);

  res.json(autor);
};

const remove = async (req, res) => {
  const { autorId } = req.params;

  await Post.deleteByAutorId(autorId);

  await Autor.deleteById(autorId);
  res.json({
    message: "Autor eliminado correctamente junto con sus posts",
  });
};

module.exports = { getAll, getById, getWithPosts, create, edit, remove };
