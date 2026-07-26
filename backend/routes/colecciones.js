const express = require('express');
const router = express.Router();

const {
    agregarJuegoAColeccion,
    obtenerColeccion,
    eliminarJuegoDeColeccion,
    actualizarEstadoColeccion
} = require('../controllers/coleccionController');

const { verificarToken } = require('../middleware/auth');

const {
    validarAgregarJuego
} = require('../middleware/coleccion/post');

const {
    validarActualizarColeccion
} = require('../middleware/coleccion/put');

const {
    validarEliminarJuegoColeccion
} = require('../middleware/coleccion/delete');

// Todas las rutas de colección requieren autenticación mediante JWT
router.post(
    '/',
    verificarToken,
    validarAgregarJuego,
    agregarJuegoAColeccion
);

router.get(
    '/',
    verificarToken,
    obtenerColeccion
);

router.put(
    '/:id_juego',
    verificarToken,
    validarActualizarColeccion,
    actualizarEstadoColeccion
);

router.delete(
    '/:id_juego',
    verificarToken,
    validarEliminarJuegoColeccion,
    eliminarJuegoDeColeccion
);

module.exports = router;