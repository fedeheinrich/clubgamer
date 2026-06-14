// Importamos la base de datos falsa que creamos para simular PostgreSQL
const mockDatabase = require('../config/mockDatabase');

// Clave de la API de RAWG 
const RAWG_API_KEY = process.env.RAWG_API_KEY || 'TU_API_KEY_AQUÍ';
const RAWG_BASE_URL = 'https://api.rawg.io/api';

const videojuegosController = {

    obtenerJuegoPorId: async (req, res) => {
        const { id } = req.params;
        const juegoId = parseInt(id);

        // Validación del ID del juego en la URL
        if (isNaN(juegoId) || juegoId <= 0) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El ID provisto en la URL debe ser un número entero positivo." });
        }

        const juegoLocal = mockDatabase.juegos.find(j => j.id === juegoId);
        if (juegoLocal) {
            return res.status(200).json({ mensaje: "Recuperado de la DB Local", data: juegoLocal });
        }

        try {
            const response = await fetch(`${RAWG_BASE_URL}/games/${juegoId}?key=${RAWG_API_KEY}`);
            if (response.status === 404) {
                return res.status(404).json({ mensaje: "El juego no existe en la API de RAWG." });
            }

            const data = await response.json();
            const nuevoJuego = {
                id: data.id,
                titulo: data.name,
                calificacion: Math.round(data.rating) || 0,
                lanzamiento: data.released || null,
                url_imagen: data.background_image || null
            };

            mockDatabase.juegos.push(nuevoJuego);
            return res.status(201).json({ mensaje: "Juego importado de RAWG y guardado", data: nuevoJuego });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error de conexión", error: error.message });
        }
    },

    obtenerTodosLosJuegos: (req, res) => {
        return res.status(200).json(mockDatabase.juegos);
    },

    crearJuego: (req, res) => {
        const { id, titulo, calificacion, lanzamiento, url_imagen } = req.body;

        // Validación de campos obligatorios y formato
        if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El campo 'id' es obligatorio y debe ser un entero positivo." });
        }
        // Validación de título
        if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
            return res.status(400).json({ error: "Bad Request", mensaje: "El campo 'titulo' es obligatorio y debe ser un texto válido." });
        }

        // Validación de calificación, si se proporciona
        if (calificacion !== undefined && (isNaN(parseInt(calificacion)) || calificacion < 0 || calificacion > 5)) {
            return res.status(400).json({ error: "Bad Request", mensaje: "La 'calificacion' debe ser un entero entre 0 y 5." });
        }
        // Validación de fecha de lanzamiento, si se proporciona
        if (lanzamiento && isNaN(Date.parse(lanzamiento))) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El 'lanzamiento' debe ser una fecha válida (YYYY-MM-DD)." });
        }

        const existe = mockDatabase.juegos.some(j => j.id === parseInt(id));
        if (existe) {
            return res.status(409).json({ mensaje: "El ID de este juego ya está registrado." });
        }

        const nuevoJuego = { id: parseInt(id), titulo, calificacion: parseInt(calificacion) || 0, lanzamiento, url_imagen };
        mockDatabase.juegos.push(nuevoJuego);
        return res.status(201).json({ mensaje: "Juego creado localmente", data: nuevoJuego });
    },

    actualizarJuego: (req, res) => {
        const { id } = req.params;
        const juegoId = parseInt(id);
        const { titulo, calificacion, lanzamiento, url_imagen } = req.body;

        // Validación del ID del juego en la URL
        if (isNaN(juegoId) || juegoId <= 0) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El ID de la URL debe ser un entero positivo." });
        }

        // Validación opcional de campos, si se proporcionan
        if (calificacion !== undefined && (isNaN(parseInt(calificacion)) || calificacion < 0 || calificacion > 5)) {
            return res.status(400).json({ error: "Bad Request", mensaje: "La 'calificacion' debe ser un entero entre 0 y 5." });
        }
        // Validación de fecha de lanzamiento, si se proporciona
        if (lanzamiento && isNaN(Date.parse(lanzamiento))) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El 'lanzamiento' debe ser una fecha válida." });
        }

        const indice = mockDatabase.juegos.findIndex(j => j.id === juegoId);
        if (indice === -1) {
            return res.status(404).json({ mensaje: "Juego no encontrado para actualizar." });
        }

        mockDatabase.juegos[indice] = {
            ...mockDatabase.juegos[indice],
            ...(titulo && { titulo }),
            ...(calificacion && { calificacion: parseInt(calificacion) }),
            ...(lanzamiento && { lanzamiento }),
            ...(url_imagen && { url_imagen })
        };

        return res.status(200).json({ mensaje: "Juego actualizado", data: mockDatabase.juegos[indice] });
    },

    eliminarJuego: (req, res) => {
        const { id } = req.params;
        const juegoId = parseInt(id);

        // Validación del ID del juego en la URL
        if (isNaN(juegoId) || juegoId <= 0) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El ID de la URL debe ser un entero positivo." });
        }

        const existe = mockDatabase.juegos.some(j => j.id === juegoId);
        if (!existe) {
            return res.status(404).json({ mensaje: "El juego que intentás eliminar no existe." });
        }

        mockDatabase.juegos = mockDatabase.juegos.filter(j => j.id !== juegoId);
        mockDatabase.coleccion = mockDatabase.coleccion.filter(c => c.id_juego !== juegoId);
        return res.status(200).json({ mensaje: "Juego eliminado con éxito." });
    },

    agregarAColeccion: (req, res) => {
        const { id_juego, estado, calificacion_personal, tiempo_de_juego } = req.body;
        const id_usuario = req.body.id_usuario || 1;

        // Validación de campos obligatorios
        if (!id_juego || isNaN(parseInt(id_juego))) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El 'id_juego' es requerido y debe ser numérico." });
        }
        // Validación de estado
        if (!estado || typeof estado !== 'string' || !ESTADOS_PERMITIDOS.includes(estado.toLowerCase())) {
            return res.status(400).json({ error: "Bad Request", mensaje: `El 'estado' es requerido. Valores válidos: ${ESTADOS_PERMITIDOS.join(', ')}` });
        }

        // Validación de existencia del juego en la base de datos local
        const juegoExiste = mockDatabase.juegos.some(j => j.id === parseInt(id_juego));
        if (!juegoExiste) {
            return res.status(400).json({ mensaje: "Primero debes registrar o buscar el juego para que exista localmente." });
        }

        const enColeccion = mockDatabase.coleccion.some(c => c.id_usuario === id_usuario && c.id_juego === parseInt(id_juego));
        if (enColeccion) {
            return res.status(409).json({ mensaje: "Este juego ya forma parte de tu colección." });
        }

        const nuevaInteraccion = {
            id_usuario,
            id_juego: parseInt(id_juego),
            estado: estado.toLowerCase(),
            calificacion_personal: calificacion_personal || "",
            tiempo_de_juego: tiempo_de_juego || "0 horas"
        };

        mockDatabase.coleccion.push(nuevaInteraccion);
        return res.status(201).json({ mensaje: "Juego añadido a tu colección personal", data: nuevaInteraccion });
    },

    actualizarEstadoColeccion: (req, res) => {
        const { id_juego } = req.params;
        const juegoId = parseInt(id_juego);
        const { estado, calificacion_personal, tiempo_de_juego } = req.body;
        const id_usuario = req.body.id_usuario || 1;

        // Validación del ID del juego en la URL
        if (isNaN(juegoId) || juegoId <= 0) {
            return res.status(400).json({ error: "Bad Request", mensaje: "El ID del juego en la URL debe ser un entero positivo." });
        }

        // Validación opcional de estado, si se proporciona
        if (estado && (!typeof estado === 'string' || !ESTADOS_PERMITIDOS.includes(estado.toLowerCase()))) {
            return res.status(400).json({ error: "Bad Request", mensaje: `Estado inválido. Valores permitidos: ${ESTADOS_PERMITIDOS.join(', ')}` });
        }

        const registro = mockDatabase.coleccion.find(c => c.id_usuario === id_usuario && c.id_juego === juegoId);
        if (!registro) {
            return res.status(404).json({ mensaje: "Este juego no está en la colección del usuario." });
        }

        if (estado) registro.estado = estado.toLowerCase();
        if (calificacion_personal) registro.calificacion_personal = calificacion_personal;
        if (tiempo_de_juego) registro.tiempo_de_juego = tiempo_de_juego;

        return res.status(200).json({ mensaje: "Colección personal modificada", data: registro });
    }
};

module.exports = videojuegosController;