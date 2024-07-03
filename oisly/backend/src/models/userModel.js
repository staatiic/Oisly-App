const pool = require('../database');

const getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const addUser = (name, email, password, rol_id, bio, facultad_id) => {
  return new Promise((resolve, reject) => {
    if (password.length < 8) {
      return reject(new Error('La contraseña debe tener al menos 8 caracteres'));
    }

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        console.error('Error al buscar el email:', error);
        return reject(new Error('Error interno del servidor'));
      }

      if (results.rows.length > 0) {
        return reject(new Error('El email ya está registrado'));
      }

      pool.query(
        'INSERT INTO users (nombre, email, password, rol_id, bio, facultad_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, email, password, rol_id, bio, facultad_id],
        (error, results) => {
          if (error) {
            console.error('Error al añadir usuario:', error);
            return reject(new Error('Error al añadir usuario'));
          }
          resolve(results.rows[0]);
        }
      );
    });
  });
};

const editUser = (id, name, email, password, rol_id, bio, facultad_id) => {
  return new Promise((resolve, reject) => {
    if (!name || name.trim() === '') {
      return reject(new Error('El nombre no puede estar vacío'));
    }
    if (password.length < 8) {
      return reject(new Error('La contraseña debe tener al menos 8 caracteres'));
    }

    pool.query(
      'UPDATE users SET nombre = $1, email = $2, password = $3, rol_id = $4, bio = $5, facultad_id = $6 WHERE id = $7 RETURNING *',
      [name, email, password, rol_id, bio, facultad_id, id],
      (error, results) => {
        if (error) {
          console.error('Error al ejecutar la consulta:', error);
          return reject(new Error('Error al editar usuario: ' + error.message));
        }
        if (results.rows.length === 0) {
          return reject(new Error('Usuario no encontrado'));
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id], (error, results) => {
      if (error) {
        return reject(new Error('Error al eliminar usuario'));
      }
      if (results.rows.length === 0) {
        return reject(new Error('Usuario no encontrado'));
      }
      resolve(results.rows[0]);
    });
  });
};

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
};
