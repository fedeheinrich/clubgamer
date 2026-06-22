const express = require('express');
const router = express.Router();
const { generos, obtenerGeneroPorId, modificarGeneroPorId, crearGenero, eliminarGeneroPorId } = require('../controllers/generoController');

// Rutas para géneros
router.get('/', generos);
router.get('/:id', obtenerGeneroPorId);
router.put('/:id', modificarGeneroPorId);
router.post('/', crearGenero);
router.delete('/:id', eliminarGeneroPorId);

module.exports = router;
