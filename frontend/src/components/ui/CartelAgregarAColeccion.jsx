import { useState } from 'react';
import CartelBase from './CartelBase';

function CartelAgregarAColeccion({
    colecciones,
    juegoSeleccionado,
    funcionCerrar,
    funcionConfirmar
}){
    
    
    return (
        <CartelBase
            titulo="Agregar a colección"
            funcionCerrar={funcionCerrar}
            textoBotonConfirmar="Agregar"
            funcionConfirmar={funcionConfirmar}
        >
            {/* Bloque 1: Info del juego (Imagen, Titulo, Año)*/}
            <div className="flex items-center gap-4">
                <img src={juegoSeleccionado.imagen} alt="Imagen del juego" className="rounded-md w-20 h-20 object-cover"></img>
                <div>
                    <h2 className="font-outfit font-bold text-xl">{juegoSeleccionado.titulo}</h2>
                    <p>{juegoSeleccionado.anioLanzamiento}</p>
                </div>
            </div>
            
            {/* Bloque 2: Seleccion de Coleccion (Checkbox de colecciones, boton de crearNuevaColeccion)*/}
            <div>
                <h2>1. Elegí una colección</h2>
                <select>
                    {/*Acá deberian cargarse todas las colecciones del usuario */}
                </select>
                <button className="inline-flex items-center gap-2 rounded-xl bg-gris-cartel px-5 py-3 text-sm font-bold text-blanco border border-white/20">Crear nueva colección</button>

            </div>
            
            {/* Bloque 3: Puntuacion personal (0 a 5 estrellas)*/}
            <div>
                <h2>2. ¿Cómo puntuarias este juego? (Opcional)</h2>
                {/*Boton de 0 a 5 estrellas*/}
                <button></button>
                <p>Tu calificacion personal</p>
            </div>
            
            {/* Bloque 4: Horas jugadas (input de numero entero)*/}
            <div>
                <h2>3. Horas jugadas (Opcional)</h2>
                <input type="number" min="0"></input>
                <p>Tiempo total que llevas jugando</p>
            </div>

        </CartelBase>
    );
}

export default CartelAgregarAColeccion;