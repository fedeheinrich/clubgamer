const express = require('express');
const router = express.Router();

const {
    generos,
    obtenerGeneroPorId,
    modificarGeneroPorId,
    crearGenero,
    eliminarGeneroPorId
} = require('../controllers/generoController');

const {
    validarObtenerGenero
} = require('../middleware/generos/get');

const {
    validarCrearGenero
} = require('../middleware/generos/post');

const {
    validarActualizarGenero
} = require('../middleware/generos/put');

const {
    validarEliminarGenero
} = require('../middleware/generos/delete');

// Rutas para géneros
router.get('/', generos);

router.get(
    '/:id',
    validarObtenerGenero,
    obtenerGeneroPorId
);

router.post(
    '/',
    validarCrearGenero,
    crearGenero
);

router.put(
    '/:id',
    validarActualizarGenero,
    modificarGeneroPorId
);

router.delete(
    '/:id',
    validarEliminarGenero,
    eliminarGeneroPorId
);

module.exports = router;