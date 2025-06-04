const router = require("express").Router();
const {
  getAll,
  getById,
  getWithPosts,
  create,
  edit,
  remove,
} = require("../../controllers/autores.controller");

router.get("/", getAll);
router.get("/:autorId", getById);
router.get("/:autorId/posts", getWithPosts);

router.post("/", create);

router.put("/:autorId", edit);

router.delete("/:autorId", remove);
module.exports = router;
