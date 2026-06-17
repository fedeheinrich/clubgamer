const express = require('express');
const router = express.Router();
const {obtenerTodosLosUsuarios, actualizarUsuario, eliminarUsuario} = require('../controllers/userController.js');

router.get('/', obtenerTodosLosUsuarios);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;