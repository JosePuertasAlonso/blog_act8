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

module.exports = {
  selectAll,
  selectById,
};
