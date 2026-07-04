const express = require('express');
const router = express.Router();

const {
    agregarJuegoAColeccion,
    obtenerColeccion,
    eliminarJuegoDeColeccion,
    actualizarEstadoColeccion
} = require('../controllers/coleccionController');

const { verificarToken } = require('../middleware/auth');

// Todas las rutas de colección requieren autenticación mediante JWT
router.post('/', verificarToken, agregarJuegoAColeccion);
router.get('/', verificarToken, obtenerColeccion);
router.put('/:id_juego', verificarToken, actualizarEstadoColeccion);
router.delete('/:id_juego', verificarToken, eliminarJuegoDeColeccion);

module.exports = router;