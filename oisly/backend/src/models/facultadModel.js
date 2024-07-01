const pool = require('../database');

const getFacultades = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM facultades');
        client.release();
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const addFacultad = async (nombre) => {
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO facultades (nombre) VALUES ($1) RETURNING *';
        const values = [nombre];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateFacultad = async (id, nombre) => {
    try {
        const client = await pool.connect();
        const query = 'UPDATE facultades SET nombre = $1 WHERE id = $2 RETURNING *';
        const values = [nombre, id];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteFacultad = async (id) => {
    try {
        const client = await pool.connect();
        const query = 'DELETE FROM facultades WHERE id = $1';
        const values = [id];
        await client.query(query, values);
        client.release();
        return true; // Indicar que se eliminó correctamente
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getFacultades,
    addFacultad,
    updateFacultad,
    deleteFacultad
};
