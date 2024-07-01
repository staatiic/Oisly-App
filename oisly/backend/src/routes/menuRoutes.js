const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/negocio/:negocio_id', menuController.getMenusByNegocio);
router.post('/', menuController.addMenu);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
