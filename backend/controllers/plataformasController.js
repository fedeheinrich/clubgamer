// ==========================================
// 1. BASE DE DATOS REAL (Descomentar después)
// ==========================================
// const { Plataforma } = require('../models');


// ==========================================
// 2. MOCK / BD FALSA (Borrar después)
// ==========================================
let plataformasMock = [
  { id: 4, nombre: 'PC' },
  { id: 18, nombre: 'PlayStation 4' },
  { id: 187, nombre: 'PlayStation 5' },
  { id: 1, nombre: 'Xbox One' },
  { id: 186, nombre: 'Xbox Series S/X' },
  { id: 7, nombre: 'Nintendo Switch' }
];


// ==========================================
// 3. CONTROLADORES
// ==========================================


// Obtener todas las plataformas
const plataformas = async (req, res) => {
    try {
        // BD REAL (Comentado por ahora):
        // const data = await Plataforma.findAll();
        // return res.status(200).json(data);
        
        // Por ahora, devuelvo la base de datos falsa (mock) para pruebas
        res.status(200).json(plataformasMock);
    } catch (error) {
        console.error('Error al obtener plataformas', error);
        res.status(500).json({error: 'Error al obtener plataformas'});
    }
};

// Obtener una plataforma por ID
const plataformaPorId = async (req, res) => {
    try{
        const { id } = req.params;
        // BD REAL (Comentado por ahora):
        // const plataforma = await Plataforma.findByPk(id);
        // if (!plataforma) {
        //   return res.status(404).json({ error: 'Plataforma no encontrada en la BD' });
        // }
        // return res.status(200).json(plataforma);

        // Por ahora, busco la plataforma en la base de datos falsa (mock) para pruebas
        const plataforma = plataformasMock.find(i => i.id === parseInt(id));
        if (!plataforma) {
            return res.status(404).json({error: 'Plataforma no encontrada'});
        }
        res.status(200).json(plataforma);
    } catch (error) {
        console.error('Error al obtener plataforma por ID', error);
        res.status(500).json({error: 'Error al obtener plataforma por ID'});
    }
}


// ==========================================
// 4. EXPORTACIÓN
// ==========================================
module.exports = {plataformas, plataformaPorId};

