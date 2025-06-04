const router = require("express").Router();

const {
  getAll,
  getById,
  getPostsByAutorId,
  create,
  edit,
  remove,
  removePostsByAutorId,
} = require("../../controllers/posts.controller");
const { checkAutorId } = require("../../middlewares/autores.middleware");

const {
  checkPostId,
  checkPostExists,
} = require("../../middlewares/posts.middleware");

router.get("/", getAll);
router.get("/:postId", checkPostId, getById);
router.get("/autor/:autorId", checkAutorId, getPostsByAutorId);

router.post("/", create);

router.put("/:postId", checkPostId, edit);

router.delete("/:postId", checkPostId, checkPostExists, remove);
router.delete("/autor/:autorId", checkAutorId, removePostsByAutorId);

module.exports = router;
