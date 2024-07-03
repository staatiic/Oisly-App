const userModel = require('../models/userModel');
const pool = require('../database');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
};

const addUser = async (req, res) => {
  const { name, email, password, rol_id, bio, facultad_id } = req.body;

  try {
    const newUser = await userModel.addUser(name, email, password, rol_id, bio, facultad_id);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al añadir usuario:', error.message);
    res.status(400).json({ error: error.message || 'Error al agregar usuario' });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, rol_id, bio, facultad_id } = req.body;

  try {
    const updatedUser = await userModel.editUser(id, name, email, password, rol_id, bio, facultad_id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error al editar usuario:', error.message);
    res.status(400).json({ error: error.message || 'Error al editar usuario' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(400).json({ error: error.message || 'Error al eliminar usuario' });
  }
};

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  loginUser
};
