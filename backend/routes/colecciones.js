const express = require('express');
const router = express.Router();
const {agregarJuegoAColeccion, obtenerColeccion, eliminarJuegoDeColeccion, actualizarEstadoColeccion} = require('../controllers/coleccionController');
const { verificarJuegoEnColeccion } = require('../middleware/coleccionMiddleware');

router.post('/', verificarJuegoEnColeccion, agregarJuegoAColeccion);
router.get('/', verificarJuegoEnColeccion, obtenerColeccion);
router.put('/:id_juego', verificarJuegoEnColeccion, actualizarEstadoColeccion);
router.delete('/:id_juego', verificarJuegoEnColeccion, eliminarJuegoDeColeccion);

module.exports = router;