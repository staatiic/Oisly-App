const express = require('express');
const router = express.Router();
const facultadController = require('../controllers/facultadController');

router.get('/', facultadController.getFacultades);
router.post('/', facultadController.addFacultad);
router.put('/:id', facultadController.updateFacultad);
router.delete('/:id', facultadController.deleteFacultad);

module.exports = router;
