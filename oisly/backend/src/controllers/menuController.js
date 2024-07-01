const menuModel = require('../models/menuModel');

const getMenusByNegocio = async (req, res) => {
    const { negocio_id } = req.params;

    try {
        const menus = await menuModel.getMenusByNegocio(negocio_id);
        res.status(200).json(menus);
    } catch (error) {
        console.error('Error al obtener los menús:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const addMenu = async (req, res) => {
    const { negocio_id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    try {
        const nuevoMenu = await menuModel.addMenu(negocio_id, nombre, descripcion, precio);
        res.status(201).json(nuevoMenu);
    } catch (error) {
        console.error('Error al agregar menú:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateMenu = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    try {
        const menuActualizado = await menuModel.updateMenu(id, nombre, descripcion, precio);
        if (!menuActualizado) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        res.status(200).json(menuActualizado);
    } catch (error) {
        console.error('Error al actualizar menú:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteMenu = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await menuModel.deleteMenu(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        res.status(204).end(); // 204 No Content (indicando que se eliminó correctamente)
    } catch (error) {
        console.error('Error al eliminar menú:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getMenusByNegocio,
    addMenu,
    updateMenu,
    deleteMenu
};
