const itemsModel = require('../models/itemsModel');

// Obtener todos los ítems de un menú por su ID de menú
const getItemsByMenu = async (req, res) => {
    const { menu_id } = req.params;

    try {
        const items = await itemsModel.getItemsByMenu(menu_id);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error al obtener los ítems del menú:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Agregar un nuevo ítem a un menú
const addItem = async (req, res) => {
    const { menu_id } = req.params;
    const { nombre, descripcion, precio, imagen_url } = req.body;

    try {
        const nuevoItem = await itemsModel.addItem(menu_id, nombre, descripcion, precio, imagen_url);
        res.status(201).json(nuevoItem);
    } catch (error) {
        console.error('Error al agregar ítem:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un ítem existente por su ID
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen_url } = req.body;

    try {
        const itemActualizado = await itemsModel.updateItem(id, nombre, descripcion, precio, imagen_url);
        if (!itemActualizado) {
            return res.status(404).json({ error: 'Ítem no encontrado' });
        }
        res.status(200).json(itemActualizado);
    } catch (error) {
        console.error('Error al actualizar ítem:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un ítem por su ID
const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await itemsModel.deleteItem(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Ítem no encontrado' });
        }
        res.status(204).end(); // 204 No Content (indicando que se eliminó correctamente)
    } catch (error) {
        console.error('Error al eliminar ítem:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getItemsByMenu,
    addItem,
    updateItem,
    deleteItem
};
