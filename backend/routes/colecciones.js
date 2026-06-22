const express = require('express');
const router = express.Router();
const {agregarJuegoAColeccion, obtenerColeccion, eliminarJuegoDeColeccion, actualizarEstadoColeccion} = require('../controllers/coleccionController');

const { verificarPost } = require('../middleware/colecciones/post');
const { verificarPut } = require('../middleware/colecciones/put');
const { verificarDelete } = require('../middleware/colecciones/delete');

router.post('/', verificarPost, agregarJuegoAColeccion);
router.get('/', obtenerColeccion);
router.put('/:id_juego', verificarPut, actualizarEstadoColeccion);
router.delete('/:id_juego', verificarDelete, eliminarJuegoDeColeccion);

module.exports = router;