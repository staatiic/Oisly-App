const { Router } = require('express');
const userController = require('../controllers/userController');
const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
