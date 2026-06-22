const express = require('express');
const router = express.Router();
const { generos, obtenerGeneroPorId, modificarGeneroPorId, crearGenero, eliminarGeneroPorId } = require('../controllers/generoController');

const { verificarPost } = require('../middleware/generos/post');
const { verificarGet} = require('../middleware/generos/get');
const { verificarPut } = require('../middleware/generos/put');
const { verificarDelete } = require('../middleware/generos/delete');

// Rutas para géneros
router.get('/', generos);
router.get('/:id', verificarGet, obtenerGeneroPorId);
router.put('/:id', verificarPut, modificarGeneroPorId);
router.post('/', verificarPost, crearGenero);
router.delete('/:id', verificarDelete, eliminarGeneroPorId);

module.exports = router;
