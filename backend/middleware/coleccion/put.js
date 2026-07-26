const { JuegoUser } = require('../../models');

const validarActualizarColeccion = async (req, res, next) => {
    try {
        const { id_juego } = req.params;
        const {
            estado,
            calificacion_personal,
            tiempo_de_juego_horas
        } = req.body;

        const id_usuario = req.user.id;

        const idJuegoNumero = Number(id_juego);

        if (
            !Number.isInteger(idJuegoNumero) ||
            idJuegoNumero <= 0
        ) {
            return res.status(400).json({
                success: false,
                error: "El parámetro id_juego debe ser un número entero positivo."
            });
        }

        if (
            estado === undefined &&
            calificacion_personal === undefined &&
            tiempo_de_juego_horas === undefined
        ) {
            return res.status(400).json({
                success: false,
                error: "Debe enviar al menos un campo para actualizar."
            });
        }

        if (estado !== undefined) {
            if (
                estado === null ||
                typeof estado !== 'string' ||
                estado.trim() === ''
            ) {
                return res.status(400).json({
                    success: false,
                    error: "El campo estado debe ser una cadena no vacía."
                });
            }

            const estadoNormalizado = estado.trim().toLowerCase();

            const estadosPermitidos = [
                'completado',
                'jugando',
                'pendiente'
            ];

            if (!estadosPermitidos.includes(estadoNormalizado)) {
                return res.status(400).json({
                    success: false,
                    error: "El estado debe ser 'completado', 'jugando' o 'pendiente'."
                });
            }

            req.body.estado = estadoNormalizado;
        }

        if (calificacion_personal !== undefined) {
            if (
                calificacion_personal === null ||
                calificacion_personal === ''
            ) {
                req.body.calificacion_personal = null;
            } else {
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
            }
        }

        if (tiempo_de_juego_horas !== undefined) {
            if (
                tiempo_de_juego_horas === null ||
                tiempo_de_juego_horas === ''
            ) {
                return res.status(400).json({
                    success: false,
                    error: "El tiempo_de_juego_horas no puede ser nulo ni estar vacío."
                });
            }

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
        }

        const registro = await JuegoUser.findOne({
            where: {
                id_usuario,
                id_juego: idJuegoNumero
            }
        });

        if (!registro) {
            return res.status(404).json({
                success: false,
                error: "El videojuego no se encuentra en la colección."
            });
        }

        req.params.id_juego = idJuegoNumero;
        req.registroColeccion = registro;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error interno al validar la actualización de la colección.",
            detalle: error.message
        });
    }
};

module.exports = {
    validarActualizarColeccion
};