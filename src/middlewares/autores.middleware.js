const Autor = require("../models/autores.model");

const checkAutorId = async (req, res, next) => {
  const { autorId } = req.params;

  if (isNaN(autorId)) {
    return res.status(400).json({ message: "Los Autores tienen ID numéricos" });
  }
  next();
};

const checkAutorExists = async (req, res, next) => {
  const { autorId } = req.params;
  const autor = await Autor.selectById(autorId);

  if (!autor) {
    return res.status(404).json({ message: "Autor no encontrado" });
  }
  next();
};

module.exports = { checkAutorId, checkAutorExists };
