const pool = require('../database');

const getNegocios = async () => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM negocios';
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const addNegocio = async (nombre, descripcion, imagen_url, propietario_id, categoria_id, facultad_id) => {
    try {
        const client = await pool.connect();
        const query = `
            INSERT INTO negocios (nombre, descripcion, imagen_url, propietario_id, categoria_id, facultad_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
        const values = [nombre, descripcion, imagen_url, propietario_id, categoria_id, facultad_id];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateNegocio = async (id, nombre, descripcion, imagen_url, categoria_id, facultad_id) => {
    try {
        const client = await pool.connect();
        const query = `
            UPDATE negocios
            SET nombre = $1, descripcion = $2, imagen_url = $3, categoria_id = $4, facultad_id = $5
            WHERE id = $6
            RETURNING *`;
        const values = [nombre, descripcion, imagen_url, categoria_id, facultad_id, id];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteNegocio = async (id) => {
    try {
        const client = await pool.connect();
        const query = 'DELETE FROM negocios WHERE id = $1';
        const values = [id];
        await client.query(query, values);
        client.release();
        return true; // Indicar que se eliminó correctamente
    } catch (error) {
        throw error;
    }
};

const getNegociosByCategoria = async (categoria_id) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM negocios WHERE categoria_id = $1';
        const values = [categoria_id];
        const result = await client.query(query, values);
        client.release();
        return result.rows;
    } catch (error) {
        throw error;
    }
};


const getNegociosByFacultad = async (facultad_id) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM negocios WHERE facultad_id = $1';
        const values = [facultad_id];
        const result = await client.query(query, values);
        client.release();
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getNegociosByPropietario = async (propietario_id) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM negocios WHERE propietario_id = $1';
        const values = [propietario_id];
        const result = await client.query(query, values);
        client.release();
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getNegocios,
    addNegocio,
    updateNegocio,
    deleteNegocio,
    getNegociosByCategoria,
    getNegociosByFacultad,
    getNegociosByPropietario
};
