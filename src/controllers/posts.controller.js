const Post = require("../models/posts.model");
const Autor = require("../models/autores.model");

/**
 * Obtiene todos los posts con paginación.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 * @returns {Promise<void>} - Respuesta con los posts encontrados.
 * */
const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const posts = await Post.selectAll(Number(page), Number(limit));

  for (let post of posts) {
    post.autor = await getAutorById(post.autor_id);
  }

  res.json({
    page,
    limit,
    results: posts,
  });
};

/**
 * Obtiene un post por su ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 * @returns {Promise<void>} - Respuesta con el post encontrado o error 404.
 */
const getById = async (req, res) => {
  const { postId } = req.params;

  const post = await Post.selectById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post no encontrado.",
    });
  }

  post.autor = await getAutorById(post.autor_id);

  res.json(post);
};

/**
 *
 * Obtiene los posts de un autor por su ID.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 * @returns {Promise<void>} - Respuesta con los posts del autor.
 */
const getPostsByAutorId = async (req, res) => {
  const { autorId } = req.params;
  console.log("Autor ID:", autorId);
  const posts = await Post.selectPostsByAutorId(autorId);
  res.json(posts);
};

const create = async (req, res) => {
  const { autor_id } = req.body;
  const autor = await Autor.selectById(autor_id);
  if (!autor) {
    return res.status(404).json({
      message: "Autor no encontrado.",
    });
  }
  const result = await Post.insert(req.body);
  const post = await Post.selectById(result.insertId);
  res.json(post);
};

const edit = async (req, res) => {
  const { postId } = req.params;
  const { autor_id } = req.body;

  const autor = await Autor.selectById(autor_id);
  if (!autor) {
    return res.status(404).json({
      message: "Autor no encontrado.",
    });
  }
  const result = await Post.updateById(postId, req.body);
  const post = await Post.selectById(postId);

  res.json(post);
};

const remove = async (req, res) => {
  const { postId } = req.params;
  await Post.deleteById(postId);
  res.json({
    message: "Post eliminado correctamente.",
  });
};

const getAutorById = async (id) => {
  const autor = await Autor.selectById(id);
  return autor;
};

module.exports = { getAll, getById, getPostsByAutorId, create, edit, remove };
