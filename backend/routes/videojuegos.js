const { Router } = require('express');
const router = Router();
const videojuegosController = require('../controllers/videojuegosController');

router.post('/', videojuegosController.crearJuego);                       // C - Crear
router.get('/', videojuegosController.obtenerTodosLosJuegos);             // R - Leer todos      // R - Leer por título
router.get('/:id', videojuegosController.obtenerJuegoPorId);              // R - Leer por ID (Intermediario)
router.put('/:id', videojuegosController.actualizarJuego);                // U - Actualizar
router.delete('/:id', videojuegosController.eliminarJuego);               // D - Eliminar

router.get('/buscar', videojuegosController.buscarJuegosPorTitulo);      // R - Buscar por título (RAWG) - Este endpoint se mantiene al final para evitar conflictos con el GET por ID

module.exports = router;