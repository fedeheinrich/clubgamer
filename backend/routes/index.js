const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const plataformasRoutes = require('./plataformas');
const generosRoutes = require('./generos');
const coleccionesRoutes = require('./colecciones');
const userRoutes = require('./user');
const videojuegosRoutes = require('./videojuegos')

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas de autenticación
router.use('/auth', authRoutes);

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

// Rutas de plataformas
router.use('/plataformas', plataformasRoutes);

// Rutas de géneros
router.use('/generos', generosRoutes);

// Rutas de colecciones
router.use('/colecciones', coleccionesRoutes);

//Rutas de user
router.use('./usuarios', userRoutes);
// Rutas de videojuegos
router.use('/videojuegos', videojuegosRoutes);

module.exports = router;
