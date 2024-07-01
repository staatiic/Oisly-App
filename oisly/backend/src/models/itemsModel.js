const pool = require('../database'); 

const getItemsByMenu = async (menu_id) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM items_menu WHERE menu_id = $1';
        const values = [menu_id];
        const result = await client.query(query, values);
        client.release();
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const addItem = async (menu_id, nombre, descripcion, precio, imagen_url) => {
    try {
        const client = await pool.connect();
        const query = `
            INSERT INTO items_menu (menu_id, nombre, descripcion, precio, imagen_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        const values = [menu_id, nombre, descripcion, precio, imagen_url];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateItem = async (id, nombre, descripcion, precio, imagen_url) => {
    try {
        const client = await pool.connect();
        const query = `
            UPDATE items_menu
            SET nombre = $1, descripcion = $2, precio = $3, imagen_url = $4
            WHERE id = $5
            RETURNING *`;
        const values = [nombre, descripcion, precio, imagen_url, id];
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteItem = async (id) => {
    try {
        const client = await pool.connect();
        const query = 'DELETE FROM items_menu WHERE id = $1';
        const values = [id];
        await client.query(query, values);
        client.release();
        return true; // Indicar que se eliminó correctamente
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getItemsByMenu,
    addItem,
    updateItem,
    deleteItem
};
