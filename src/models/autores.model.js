const db = require("../config/db");

const selectAll = async (page, limit) => {
  const [result] = await db.query(
    `
        select * from autores
        limit ?
        offset ?
    `,
    [limit, (page - 1) * limit]
  );
  return result;
};

const selectById = async (id) => {
  const [result] = await db.query(
    `
        select * from autores
        where id = ?
    `,
    [id]
  );
  return result[0];
};

const insert = async (autor) => {
  const [result] = await db.query(
    `
        insert into autores (nombre, email, imagen)
        values (?, ?, ?)
    `,
    [autor.nombre, autor.email, autor.imagen]
  );
  return result;
};

const updateById = async (id, autor) => {
  const [result] = await db.query(
    `
            update autores
            set nombre = ?, email = ?, imagen = ?
            where id = ?
        `,
    [autor.nombre, autor.email, autor.imagen, id]
  );
  return result;
};

const deleteById = async (id) => {
  const [result] = await db.query("delete from autores where id = ?", [id]);
  return result;
};

module.exports = {
  selectAll,
  selectById,
  insert,
  updateById,
  deleteById,
};
