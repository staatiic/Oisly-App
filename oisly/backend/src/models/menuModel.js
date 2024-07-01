const pool = require('../database');

const getMenusByNegocio = async (negocio_id) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM menus WHERE negocio_id = $1';
        const values = [negocio_id];
        const result = await client.query(query, values);
        client.release();
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const addMenu = async (negocio_id, nombre, descripcion) => {
    try {
        const client = await pool.connect();
        const query = `
            INSERT INTO menus (negocio_id, nombre, descripcion)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const values = [negocio_id, nombre, descripcion];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateMenu = async (id, nombre, descripcion) => {
    try {
        const client = await pool.connect();
        const query = `
            UPDATE menus
            SET nombre = $1, descripcion = $2
            WHERE id = $3
            RETURNING *`;
        const values = [nombre, descripcion, id];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteMenu = async (id) => {
    try {
        const client = await pool.connect();
        const query = 'DELETE FROM menus WHERE id = $1';
        const values = [id];
        await client.query(query, values);
        client.release();
        return true; // Indicar que se eliminó correctamente
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getMenusByNegocio,
    addMenu,
    updateMenu,
    deleteMenu
};
