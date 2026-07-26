const { Juego, JuegoUser } = require('../../models');

const validarAgregarJuego = async (req, res, next) => {
    try {
        const {
            id_juego,
            estado,
            calificacion_personal,
            tiempo_de_juego_horas
        } = req.body;

        const id_usuario = req.user.id;

        if (
            id_juego === undefined ||
            id_juego === null ||
            id_juego === ''
        ) {
            return res.status(400).json({
                success: false,
                error: "El campo id_juego es obligatorio."
            });
        }

        const idJuegoNumero = Number(id_juego);

        if (
            !Number.isInteger(idJuegoNumero) ||
            idJuegoNumero <= 0
        ) {
            return res.status(400).json({
                success: false,
                error: "El campo id_juego debe ser un número entero positivo."
            });
        }

        const estadosPermitidos = [
            'completado',
            'jugando',
            'pendiente'
        ];

        if (
            estado !== undefined &&
            estado !== null
        ) {
            if (
                typeof estado !== 'string' ||
                estado.trim() === ''
            ) {
                return res.status(400).json({
                    success: false,
                    error: "El campo estado debe ser una cadena no vacía."
                });
            }

            const estadoNormalizado = estado.trim().toLowerCase();

            if (!estadosPermitidos.includes(estadoNormalizado)) {
                return res.status(400).json({
                    success: false,
                    error: "El estado debe ser 'completado', 'jugando' o 'pendiente'."
                });
            }

            req.body.estado = estadoNormalizado;
        }

        if (
            calificacion_personal !== undefined &&
            calificacion_personal !== null &&
            calificacion_personal !== ''
        ) {
            const calificacionNumero = Number(calificacion_personal);

            if (
                !Number.isInteger(calificacionNumero) ||
                calificacionNumero < 0 ||
                calificacionNumero > 5
            ) {
                return res.status(400).json({
                    success: false,
                    error: "La calificacion_personal debe ser un número entero entre 0 y 5."
                });
            }

            req.body.calificacion_personal = calificacionNumero;
        } else {
            req.body.calificacion_personal = null;
        }

        if (
            tiempo_de_juego_horas !== undefined &&
            tiempo_de_juego_horas !== null &&
            tiempo_de_juego_horas !== ''
        ) {
            const tiempoNumero = Number(tiempo_de_juego_horas);

            if (
                Number.isNaN(tiempoNumero) ||
                !Number.isFinite(tiempoNumero) ||
                tiempoNumero < 0
            ) {
                return res.status(400).json({
                    success: false,
                    error: "El tiempo_de_juego_horas debe ser un número mayor o igual a 0."
                });
            }

            req.body.tiempo_de_juego_horas = tiempoNumero;
        } else {
            req.body.tiempo_de_juego_horas = 0;
        }

        const juego = await Juego.findByPk(idJuegoNumero);

        if (!juego) {
            return res.status(404).json({
                success: false,
                error: "El videojuego indicado no existe."
            });
        }

        const juegoYaAgregado = await JuegoUser.findOne({
            where: {
                id_usuario,
                id_juego: idJuegoNumero
            }
        });

        if (juegoYaAgregado) {
            return res.status(409).json({
                success: false,
                error: "Este juego ya figura en tu colección."
            });
        }

        req.body.id_juego = idJuegoNumero;

        if (
            req.body.estado === undefined ||
            req.body.estado === null
        ) {
            req.body.estado = 'pendiente';
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error interno al validar los datos de la colección.",
            detalle: error.message
        });
    }
};

module.exports = {
    validarAgregarJuego
};