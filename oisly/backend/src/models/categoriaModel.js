const pool = require('../database');

const getCategorias = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM categorias_negocio');
    client.release();
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const addCategoria = async (nombre) => {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO categorias_negocio (nombre) VALUES ($1) RETURNING *';
    const values = [nombre];
    const result = await client.query(query, values);
    client.release();
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateCategoria = async (id, nombre) => {
  try {
    const client = await pool.connect();
    const query = 'UPDATE categorias_negocio SET nombre = $1 WHERE id = $2 RETURNING *';
    const values = [nombre, id];
    const result = await client.query(query, values);
    client.release();
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteCategoria = async (id) => {
  try {
    const client = await pool.connect();
    const query = 'DELETE FROM categorias_negocio WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await client.query(query, values);
    client.release();
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
};

