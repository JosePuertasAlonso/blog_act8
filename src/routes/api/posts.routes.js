const router = require("express").Router();

const { getAll, getById } = require("../../controllers/posts.controller");

// GET /api/posts
router.get("/", getAll);
router.get("/:postId", getById);
/*
router.post('/', checkAdmin, create);
router.put('/:restauranteId', checkAdmin, checkRestauranteId, edit);
router.delete('/:restauranteId', checkAdmin, checkRestauranteId, remove);
*/
module.exports = router;

/* 
DEFINICIÓN DE MIDDLEWARES

router.get('/prueba', primero, segundo, tercero);

const primero = (req, res, next) => {
    console.log('primera');
    next();
}

const segundo = (req, res, next) => {
    console.log('segunda');
    next();
}

const tercero = (req, res, next) => {
    res.json('terminamos');
} */
