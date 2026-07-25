import { useState } from 'react';
import CartelBase from "./CartelBase";

function CartelNuevaColeccion({ funcionCerrar, funcionConfirmar }) {
    // 1. Creamos estados locales para guardar lo que el usuario escribe
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // 2. Armamos una funcion para validar antes de confirmar
    const manejarConfirmacion = () => {
        if (nombre.trim() === '') {
            alert("El nombre de la colección no puede estar vacío");
            return;
        }
        funcionConfirmar(nombre, descripcion);
    };

    return (
        <CartelBase
            titulo={"Nueva colección"}
            funcionCerrar={funcionCerrar}
            textoBotonConfirmar="Crear Colección"
            funcionConfirmar={manejarConfirmacion}
        >
            {/* Bloque 1: Nombre de la coleccion */}
            <div className="flex flex-col gap-2">
                <label className="ml-2 font-sora text-lg">Nombre de la colección:</label>
                <input 
                    className="py-2 px-2 rounded-xl border border-white/30 bg-secundario-azul-oscuro text-blanco" 
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} // 3. Guardamos lo que se escribe
                    placeholder="Ej. Mis Favoritos"
                />
            </div>

            {/* Bloque 2: Descripcion de la coleccion */}
            <div className="flex flex-col gap-2">
                <label className="ml-2 font-sora text-lg">Descripción:</label>
                <textarea 
                    className="bg-secundario-azul-oscuro rounded-xl border border-white/30 text-blanco min-h-[100px] p-2" 
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)} // 3. Guardamos lo que se escribe
                    placeholder="Una breve descripción..."
                />
            </div>
        </CartelBase>
    );
}

export default CartelNuevaColeccion;