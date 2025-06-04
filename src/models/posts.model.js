const db = require("../config/db");

// SELECT * FROM posts;
const selectAll = async (page, limit) => {
  const [result] = await db.query(
    `
        select * from posts
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
        select * from posts
        where id = ?
    `,
    [id]
  );
  return result[0];
};

const selectPostsByAutorId = async (autorId) => {
  const [result] = await db.query(
    `
        select * from posts
        where autor_id = ?
    `,
    [autorId]
  );
  return result;
};

const insert = async (post) => {
  const [result] = await db.query(
    `
        insert into posts (titulo, descripcion, fecha_creacion, categoria, autor_id)
        values (?, ?, ?, ?, ?)
    `,
    [
      post.titulo,
      post.descripcion,
      post.fecha_creacion,
      post.categoria,
      post.autor_id,
    ]
  );
  return result;
};

const updateById = async (id, post) => {
  const [result] = await db.query(
    `
            update posts
            set titulo = ?, descripcion = ?, fecha_creacion = ?, categoria = ?, autor_id = ?
            where id = ?
        `,
    [
      post.titulo,
      post.descripcion,
      post.fecha_creacion,
      post.categoria,
      post.autor_id,
      id,
    ]
  );
  return result;
};

const deleteById = async (id) => {
  const [result] = await db.query("delete from posts where id = ?", [id]);
  return result;
};

module.exports = {
  selectAll,
  selectById,
  selectPostsByAutorId,
  insert,
  updateById,
  deleteById,
};
