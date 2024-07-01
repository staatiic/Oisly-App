const negocioModel = require('../models/negocioModel');

const getNegocios = async (req, res) => {
    try {
        const negocios = await negocioModel.getNegocios();
        res.status(200).json(negocios);
    } catch (error) {
        console.error('Error al obtener negocios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const addNegocio = async (req, res) => {
    const { nombre, descripcion, imagen_url, propietario_id, categoria_id, facultad_id } = req.body;

    try {
        const nuevoNegocio = await negocioModel.addNegocio(nombre, descripcion, imagen_url, propietario_id, categoria_id, facultad_id);
        res.status(201).json(nuevoNegocio);
    } catch (error) {
        console.error('Error al agregar negocio:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateNegocio = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen_url, categoria_id, facultad_id } = req.body;

    try {
        const negocioActualizado = await negocioModel.updateNegocio(id, nombre, descripcion, imagen_url, categoria_id, facultad_id);
        if (!negocioActualizado) {
            return res.status(404).json({ error: 'Negocio no encontrado' });
        }
        res.status(200).json(negocioActualizado);
    } catch (error) {
        console.error('Error al actualizar negocio:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteNegocio = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await negocioModel.deleteNegocio(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Negocio no encontrado' });
        }
        res.status(204).end(); // 204 No Content (indicando que se eliminó correctamente)
    } catch (error) {
        console.error('Error al eliminar negocio:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getNegociosByCategoria = async (req, res) => {
    const { categoria_id } = req.params; // Utiliza req.params para obtener el valor de categoria_id

    try {
        const negocios = await negocioModel.getNegociosByCategoria(categoria_id);
        res.status(200).json(negocios);
    } catch (error) {
        console.error('Error al filtrar negocios por categoría:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getNegociosByFacultad = async (req, res) => {
    const { facultad_id } = req.params;

    try {
        const negocios = await negocioModel.getNegociosByFacultad(facultad_id);
        res.status(200).json(negocios);
    } catch (error) {
        console.error('Error al filtrar negocios por facultad:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
const getNegociosByPropietario = async (req, res) => {
    const { propietario_id } = req.params;

    try {
        const negocios = await negocioModel.getNegociosByPropietario(propietario_id);
        res.status(200).json(negocios);
    } catch (error) {
        console.error('Error al filtrar negocios por propietario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
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
