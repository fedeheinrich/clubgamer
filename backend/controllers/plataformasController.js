// Comento esta linea temporalmente ya que no tenemos el modelo Plataforma creado, pero una vez que lo tengamos, descomentarla y usarla para obtener las plataformas desde la base de datos
// const { Plataforma } = require('../models');

// Base de datos falsa para pruebas
let plataformasMock = [
  { id: 4, nombre: 'PC' },
  { id: 18, nombre: 'PlayStation 4' },
  { id: 187, nombre: 'PlayStation 5' },
  { id: 1, nombre: 'Xbox One' },
  { id: 186, nombre: 'Xbox Series S/X' },
  { id: 7, nombre: 'Nintendo Switch' }
];


// Obtener todas las plataformas
const plataformas = async (req, res) => {
    try {
        // Descomentar esta línea una vez que tengamos el modelo Plataforma creado y la base de datos configurada
        // const data = await Plataforma.findAll();
        // Por ahora, devuelvo la base de datos falsa (mock) para pruebas
        res.status(200).json(plataformasMock);
    } catch (error) {
        console.error('Error al obtener plataformas', error);
        res.status(500).json({error: 'Error al obtener plataformas'});
    }
};

module.exports = {plataformas};

