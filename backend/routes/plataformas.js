const express = require('express');
const router = express.Router();

const {
    plataformas,
    plataformaPorId,
    crearPlataforma,
    actualizarPlataforma,
    eliminarPlataforma
} = require('../controllers/plataformasController');

const {
    validarObtenerPlataforma
} = require('../middleware/plataformas/get');

const {
    validarCrearPlataforma
} = require('../middleware/plataformas/post');

const {
    validarActualizarPlataforma
} = require('../middleware/plataformas/put');

const {
    validarEliminarPlataforma
} = require('../middleware/plataformas/delete');

router.get('/', plataformas);

router.get(
    '/:id',
    validarObtenerPlataforma,
    plataformaPorId
);

router.post(
    '/',
    validarCrearPlataforma,
    crearPlataforma
);

router.put(
    '/:id',
    validarActualizarPlataforma,
    actualizarPlataforma
);

router.delete(
    '/:id',
    validarEliminarPlataforma,
    eliminarPlataforma
);

module.exports = router;