const express = require('express');
const router = express.Router();

const { obtenerTodosLosUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/userController.js');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación mediante JWT
router.get('/', verificarToken, obtenerTodosLosUsuarios);
router.put('/:id', verificarToken, actualizarUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

module.exports = router;