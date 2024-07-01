// negocioRoutes.js

const express = require('express');
const router = express.Router();
const negocioController = require('../controllers/negocioController');


router.get('/', negocioController.getNegocios);
router.get('/categoria/:categoria_id', negocioController.getNegociosByCategoria);
router.get('/facultad/:facultad_id', negocioController.getNegociosByFacultad);
router.get('/propietario/:propietario_id', negocioController.getNegociosByPropietario);
router.post('/', negocioController.addNegocio);
router.put('/:id', negocioController.updateNegocio);
router.delete('/:id', negocioController.deleteNegocio);

module.exports = router;
