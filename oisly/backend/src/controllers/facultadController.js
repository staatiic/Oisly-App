const facultadModel = require('../models/facultadModel');

const getFacultades = async (req, res) => {
    try {
        const facultades = await facultadModel.getFacultades();
        res.status(200).json(facultades);
    } catch (error) {
        console.error('Error al obtener facultades:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const addFacultad = async (req, res) => {
    const { nombre } = req.body;

    try {
        const nuevaFacultad = await facultadModel.addFacultad(nombre);
        res.status(201).json(nuevaFacultad);
    } catch (error) {
        console.error('Error al agregar facultad:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateFacultad = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const facultadActualizada = await facultadModel.updateFacultad(id, nombre);
        if (!facultadActualizada) {
            return res.status(404).json({ error: 'Facultad no encontrada' });
        }
        res.status(200).json(facultadActualizada);
    } catch (error) {
        console.error('Error al actualizar facultad:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteFacultad = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminada = await facultadModel.deleteFacultad(id);
        if (!eliminada) {
            return res.status(404).json({ error: 'Facultad no encontrada' });
        }
        res.status(204).end(); 
    } catch (error) {
        console.error('Error al eliminar facultad:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getFacultades,
    addFacultad,
    updateFacultad,
    deleteFacultad
};
