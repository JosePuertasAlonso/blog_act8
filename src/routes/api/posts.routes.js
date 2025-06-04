const router = require("express").Router();

const {
  getAll,
  getById,
  getPostsByAutorId,
  create,
  edit,
  remove,
} = require("../../controllers/posts.controller");

// GET /api/posts
router.get("/", getAll);
router.get("/:postId", getById);
router.get("/autor/:autorId", getPostsByAutorId);

// POST /api/posts
router.post("/", create);

router.put("/:postId", edit);

router.delete("/:postId", remove);

router.module.exports = router;
