const categoriaModel = require('../models/categoriaModel');

const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModel.getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const addCategoria = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevaCategoria = await categoriaModel.addCategoria(nombre);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al agregar categoría:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const categoriaActualizada = await categoriaModel.updateCategoria(id, nombre);
    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error('Error al editar categoría:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoriaEliminada = await categoriaModel.deleteCategoria(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(categoriaEliminada);
  } catch (error) {
    console.error('Error al eliminar categoría:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
};
