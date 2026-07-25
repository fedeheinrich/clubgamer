const { Router } = require('express');
const router = Router();
const videojuegosController = require('../controllers/videojuegosController');

const {
    validarObtenerJuego
} = require('../middleware/videojuegos/get');

const {
    validarCrearJuego
} = require('../middleware/videojuegos/post');

const {
    validarActualizarJuego
} = require('../middleware/videojuegos/put');

const {
    validarEliminarJuego
} = require('../middleware/videojuegos/delete');

// Esta ruta se mantiene al principio para evitar conflictos con el GET por ID,
// ya que si se colocara después, el endpoint de búsqueda podría ser interpretado
// como un ID no válido y no se ejecutaría correctamente.
router.get(
    '/buscar',
    videojuegosController.buscarJuegosPorTitulo
);

// C - Crear
router.post(
    '/',
    validarCrearJuego,
    videojuegosController.crearJuego
);

// R - Leer todos
router.get(
    '/',
    videojuegosController.obtenerTodosLosJuegos
);

// R - Leer por ID (Intermediario)
router.get(
    '/:id',
    validarObtenerJuego,
    videojuegosController.obtenerJuegoPorId
);

// U - Actualizar
router.put(
    '/:id',
    validarActualizarJuego,
    videojuegosController.actualizarJuego
);

// D - Eliminar
router.delete(
    '/:id',
    validarEliminarJuego,
    videojuegosController.eliminarJuego
);

module.exports = router;