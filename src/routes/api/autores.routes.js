const router = require("express").Router();
const {
  getAll,
  getById,
  getWithPosts,
  create,
  edit,
  remove,
} = require("../../controllers/autores.controller");
const {
  checkAutorId,
  checkAutorExists,
} = require("../../middleware/autores.middleware");

router.get("/", getAll);
router.get("/:autorId", checkAutorId, getById);
router.get("/:autorId/posts", checkAutorId, getWithPosts);

router.post("/", create);

router.put("/:autorId", checkAutorId, edit);

router.delete("/:autorId", checkAutorId, checkAutorExists, remove);
module.exports = router;
