const { Router } = require('express');
const router = Router();
const videojuegosController = require('../controllers/videojuegosController');

const { verificarPost } = require('../middleware/plataformas/post');
const { verificarGet} = require('../middleware/plataformas/get');
const { verificarPut } = require('../middleware/plataformas/put');
const { verificarDelete } = require('../middleware/plataformas/delete');

router.post('/', verificarPost, videojuegosController.crearJuego);                      // C - Crear
router.get('/', videojuegosController.obtenerTodosLosJuegos);             // R - Leer todos
router.get('/:id', verificarGet, videojuegosController.obtenerJuegoPorId);              // R - Leer por ID (Intermediario)
router.put('/:id', verificarPut, videojuegosController.actualizarJuego);                // U - Actualizar
router.delete('/:id', verificarDelete, videojuegosController.eliminarJuego);             // D - Eliminar

module.exports = router;