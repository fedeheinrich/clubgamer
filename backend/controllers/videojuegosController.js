// Importamos la base de datos falsa simulada del diagrama
const mockDatabase = require('../config/mockDatabase');

// Clave de la API de RAWG (lo ideal es que vaya en un archivo .env)
const RAWG_API_KEY = process.env.RAWG_API_KEY || 'TU_API_KEY_AQUÍ';
const RAWG_BASE_URL = 'https://api.rawg.io/api';

const videojuegosController = {

    obtenerJuegoPorId: async (req, res) => {
        const { id } = req.params;
        const juegoId = parseInt(id);

        //Revisar si ya lo tenemos guardado en nuestra base local
        const juegoLocal = mockDatabase.juegos.find(j => j.id === juegoId);
        
        if (juegoLocal) {
            // Código 200: Éxito normativo
            return res.status(200).json({
                mensaje: "Juego recuperado de la Base de Datos Local (PostgreSQL Mock)",
                data: juegoLocal
            });
        }

        //Si no lo tenemos, consultamos a RAWG
        try {
            const response = await fetch(`${RAWG_BASE_URL}/games/${juegoId}?key=${RAWG_API_KEY}`);
            
            if (response.status === 404) {
                // Código 404: No encontrado en el proveedor externo
                return res.status(404).json({ mensaje: "El juego no existe en la API de RAWG." });
            }

            const data = await response.json();

            // Mapeamos la respuesta externa al diseño de nuestro modelo de datos
            const nuevoJuego = {
                id: data.id,
                titulo: data.name,
                calificacion: Math.round(data.rating) || 0,
                lanzamiento: data.released || null,
                url_imagen: data.background_image || null
            };

            //Guardarlo en nuestra base de datos local
            mockDatabase.juegos.push(nuevoJuego);

            // Código 201: Creado con éxito tras la importación externa
            return res.status(201).json({
                mensaje: "Juego importado de RAWG y guardado localmente",
                data: nuevoJuego
            });

        } catch (error) {
            return res.status(500).json({ mensaje: "Error de conexión con el servidor externo", error: error.message });
        }
    },

    obtenerTodosLosJuegos: (req, res) => {
        return res.status(200).json(mockDatabase.juegos);
    },

    crearJuego: (req, res) => {
        const { id, titulo, calificacion, lanzamiento, url_imagen } = req.body;

        if (!id || !titulo) {
            // Código 400: Solicitud incorrecta por falta de datos obligatorios
            return res.status(400).json({ mensaje: "Faltan datos obligatorios (id, titulo)." });
        }

        const existe = mockDatabase.juegos.some(j => j.id === parseInt(id));
        if (existe) {
            // Código 409: Conflicto (El recurso ya existe)
            return res.status(409).json({ mensaje: "El ID de este juego ya está registrado." });
        }

        const nuevoJuego = { id: parseInt(id), titulo, calificacion, lanzamiento, url_imagen };
        mockDatabase.juegos.push(nuevoJuego);

        return res.status(201).json({ mensaje: "Juego creado localmente", data: nuevoJuego });
    },

    actualizarJuego: (req, res) => {
        const { id } = req.params;
        const { titulo, calificacion, lanzamiento, url_imagen } = req.body;
        
        const indice = mockDatabase.juegos.findIndex(j => j.id === parseInt(id));

        if (indice === -1) {
            return res.status(404).json({ mensaje: "Juego no encontrado para actualizar." });
        }

        // Actualización parcial o total
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

        const existe = mockDatabase.juegos.some(j => j.id === juegoId);
        if (!existe) {
            return res.status(404).json({ mensaje: "El juego que intentás eliminar no existe." });
        }

        // Borramos el juego de la lista local
        mockDatabase.juegos = mockDatabase.juegos.filter(j => j.id !== juegoId);
        
        // También limpiamos las dependencias en cascada de la colección por consistencia
        mockDatabase.coleccion = mockDatabase.coleccion.filter(c => c.id_juego !== juegoId);

        return res.status(200).json({ mensaje: "Juego eliminado de la base de datos local de manera exitosa." });
    },

    agregarAColeccion: (req, res) => {
        const { id_juego, estado, calificacion_personal, tiempo_de_juego } = req.body;
        const id_usuario = req.body.id_usuario || 1; // Por ahora usamos el usuario 1 de tu mock DB

        if (!id_juego || !estado) {
            return res.status(400).json({ mensaje: "El id_juego y el estado son obligatorios." });
        }

        // Validamos que el juego exista localmente antes de vincularlo a una colección
        const juegoExiste = mockDatabase.juegos.some(j => j.id === parseInt(id_juego));
        if (!juegoExiste) {
            return res.status(400).json({ mensaje: "Primero debes registrar o buscar el juego para que exista localmente." });
        }

        // Evitar duplicados en la colección de un mismo usuario
        const enColeccion = mockDatabase.coleccion.some(c => c.id_usuario === id_usuario && c.id_juego === parseInt(id_juego));
        if (enColeccion) {
            return res.status(409).json({ mensaje: "Este juego ya forma parte de tu colección." });
        }

        const nuevaInteraccion = {
            id_usuario,
            id_juego: parseInt(id_juego),
            estado, // completado, jugando, pendiente
            calificacion_personal: calificacion_personal || "",
            tiempo_de_juego: tiempo_de_juego || "0 horas"
        };

        mockDatabase.coleccion.push(nuevaInteraccion);
        return res.status(201).json({ mensaje: "Juego añadido a tu colección personal", data: nuevaInteraccion });
    },

    actualizarEstadoColeccion: (req, res) => {
        const { id_juego } = req.params;
        const { estado, calificacion_personal, tiempo_de_juego } = req.body;
        const id_usuario = req.body.id_usuario || 1; 

        const registro = mockDatabase.coleccion.find(
            c => c.id_usuario === id_usuario && c.id_juego === parseInt(id_juego)
        );

        if (!registro) {
            return res.status(404).json({ mensaje: "Este juego no está en la colección del usuario." });
        }

        // Aplicamos los cambios solicitados (Requisito: cambiar estado, calificar y registrar tiempo)
        if (estado) registro.estado = estado;
        if (calificacion_personal) registro.calificacion_personal = calificacion_personal;
        if (tiempo_de_juego) registro.tiempo_de_juego = tiempo_de_juego;

        return res.status(200).json({ mensaje: "Colección personal modificada correctamente", data: registro });
    }
};

module.exports = videojuegosController;