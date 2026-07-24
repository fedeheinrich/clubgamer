import CartelBase from "./CartelBase";

/* 
 Tengo que utilizar de la API Colecciones: 

PUT Editar una coleccion (Nombre, Descripcion)  
DELETE Eliminar una coleccion
POST Crear una coleccion (Nombre, Descripcion)
GET Obtener coleccion cuando se cliquea el boton flecha que lleva a ColeccionAbierta para cargar la coleccion con sus juegos

*/

function CartelNuevaColeccion({
    funcionCerrar,
    funcionConfirmar,
    nombre,
    descripcion
}){
    return (
        <CartelBase
            titulo ={"Nueva colección"}
            funcionCerrar={funcionCerrar}
            textoBotonConfirmar="Crear Colección"
            funcionConfirmar={()=> funcionConfirmar(nombre, descripcion)}
        >
            {/* Bloque 1: Nombre de la coleccion */}
            <div className="flex flex-col gap-2">
                <label className="ml-2 font-sora text-lg">Nombre de la colección:</label>
                <input className="py-2 px-2 rounded-xl border border-white/30 bg-secundario-azul-oscuro text-blanco" type="text"></input>
            </div>

            {/* Bloque 2: Descripcion de la coleccion */}
            <div className="flex flex-col gap-2">
                <label className="ml-2 font-sora text-lg">Descripcion:</label>
                <textarea className="bg-secundario-azul-oscuro rounded-xl border border-white/30 text-blanco" type="text"></textarea>
            </div>
        </CartelBase>
    )
   };


export default CartelNuevaColeccion;