const { JuegoUser } = require('../models');

// Middleware para verificar si el juego ya está en la colección
const verificarJuegoEnColeccion = async (req, res, next) => {
    try {
        console.log("🟢 Middleware verificarJuegoEnColeccion ejecutado");

        const { id_juego } = req.body;
        const id_usuario = req.body.id_usuario || 1;

        console.log("📌 id_usuario:", id_usuario);
        console.log("📌 id_juego:", id_juego);

        if (!id_juego) {
            console.log("❌ Falta id_juego");

            return res.status(400).json({
                success: false,
                error: "El campo id_juego es obligatorio."
            });
        }

        const juegoExistente = await JuegoUser.findOne({
            where: { id_usuario, id_juego }
        });

        console.log("🔍 Resultado búsqueda:", juegoExistente);

        if (juegoExistente) {
            console.log("⚠️ El juego ya existe en la colección");

            return res.status(409).json({
                success: false,
                error: "Este juego ya figura en tu colección."
            });
        }

        console.log("✅ Middleware aprobado, continúa al controller");
        next();

    } catch (error) {
        console.log("💥 Error en middleware:", error);

        return res.status(500).json({
            success: false,
            error: "Error al verificar el juego en la colección.",
            detalle: error.message
        });
    }
};

module.exports = { verificarJuegoEnColeccion };