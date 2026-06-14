const { Router } = require('express');
const router = Router();
const videojuegosController = require('../controllers/videojuegosController');

router.post('/', videojuegosController.crearJuego);                      // C - Crear
router.get('/', videojuegosController.obtenerTodosLosJuegos);             // R - Leer todos
router.get('/:id', videojuegosController.obtenerJuegoPorId);              // R - Leer por ID (Intermediario)
router.put('/:id', videojuegosController.actualizarJuego);                // U - Actualizar
router.delete('/:id', videojuegosController.eliminarJuego);             // D - Eliminar

router.post('/coleccion', videojuegosController.agregarAColeccion);       // Agregar a colección
router.put('/coleccion/:id_juego', videojuegosController.actualizarEstadoColeccion); // Cambiar estado/calificar/tiempo

module.exports = router;