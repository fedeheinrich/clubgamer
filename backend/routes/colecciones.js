const express = require('express');
const router = express.Router();
const {agregarJuegoAColeccion, obtenerColeccion, eliminarJuegoDeColeccion, actualizarEstadoColeccion} = require('../controllers/coleccionController');

router.post('/', agregarJuegoAColeccion);
router.get('/', obtenerColeccion);
router.put('/:id_juego', actualizarEstadoColeccion);
router.delete('/:id_juego', eliminarJuegoDeColeccion);

module.exports = router;