const { Router } = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = Router();


router.get('/', categoriaController.getCategorias);
router.post('/', categoriaController.addCategoria);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
