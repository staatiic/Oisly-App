const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// Ruta para obtener todos los ítems de un menú por su ID de menú
router.get('/menu/:menu_id', itemsController.getItemsByMenu);

// Ruta para agregar un nuevo ítem a un menú
router.post('/menu/:menu_id', itemsController.addItem);

// Ruta para actualizar un ítem existente por su ID
router.put('/:id', itemsController.updateItem);

// Ruta para eliminar un ítem por su ID
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
