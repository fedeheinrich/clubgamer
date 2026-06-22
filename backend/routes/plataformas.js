const express = require('express');
const router = express.Router();
const { plataformas, plataformaPorId, crearPlataforma, actualizarPlataforma, eliminarPlataforma } = require('../controllers/plataformasController');

const { verificarPost } = require('../middleware/plataformas/post');
const { verificarGet} = require('../middleware/plataformas/get');
const { verificarPut } = require('../middleware/plataformas/put');
const { verificarDelete } = require('../middleware/plataformas/delete');

router.get('/', plataformas);
router.get('/:id', verificarGet, plataformaPorId);
router.post('/', verificarPost, crearPlataforma);
router.put('/:id', verificarPut, actualizarPlataforma);
router.delete('/:id', verificarDelete, eliminarPlataforma);

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