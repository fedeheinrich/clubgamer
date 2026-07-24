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
            <div className="">
                <label>Nombre de la colección:</label>
                <input type="text"></input>
            </div>

            {/* Bloque 2: Descripcion de la coleccion */}
            <div className="">
                <label>Descripcion:</label>
                <input type="text"></input>
            </div>
        </CartelBase>
    )
   };


export default CartelNuevaColeccion;