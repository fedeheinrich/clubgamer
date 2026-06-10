const express = require('express');
const router = express.Router();
const { plataformas } = require('../controllers/plataformasController');


router.get('/', plataformas);
router.get('/:id', plataformaPorId);
router.post('/', crearPlataforma);
router.put('/:id', actualizarPlataforma);
router.delete('/:id', eliminarPlataforma);

// router.get('/plataformas', (req, res) => {
//   res.json({
//     message: 'Endpoint de prueba',
//     data: {
//       backend: 'Express',
//       database: 'PostgreSQL',
//       orm: 'Sequelize'
//     }
//   });
// });

module.exports = router;