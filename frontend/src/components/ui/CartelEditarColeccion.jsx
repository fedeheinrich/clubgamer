import {useState} from 'react';
import CartelBase from "./CartelBase";

function CartelEditarColeccion({
    nombreActual,
    descripcionActual,
    funcionCerrar,
    funcionConfirmar
}){
    const [nombre, setNombre] = useState(nombreActual);
    const [descripcion, setDescripcion] = useState(descripcionActual);
    return (
        <CartelBase
            titulo ={"Editar colección"}
            funcionCerrar={funcionCerrar}
            textoBotonConfirmar="Guardar Cambios"
            funcionConfirmar={funcionConfirmar}
        >
            <div className="flex flex-col gap-2">
                <label className="text-blanco font-outfit font-bold text-lg">Nombre de la colección</label>
                <input value={nombre} onChange={(e)=> setNombre(e.target.value)} className="rounded-lg bg-white/5 text-blanco p-2 border border-white/20" type="text" placeholder={nombreActual}></input>
                <span className="text-sm text-slate-400 text-right">
                    {nombre.length}/30
                </span>
            </div>
            

            <div className="flex flex-col gap-2">
                <label className="text-blanco font-outfit font-bold text-lg">Descripción (opcional)</label>
                <textarea value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} className="rounded-lg bg-white/5 text-blanco p-2 border border-white/20 min-h-[7rem]" placeholder={descripcionActual}></textarea> 
                <span className="text-sm text-slate-400 text-right">
                    {descripcion.length}/120
                </span>
            </div>

        </CartelBase>
        
    );
};

export default CartelEditarColeccion; 