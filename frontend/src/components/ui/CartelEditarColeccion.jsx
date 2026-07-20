import CartelBase from "./CartelBase";

function CartelEditarColeccion({
    nombreActual,
    descripcionActual,
    funcionCerrar,
    funcionConfirmar
}){
    return (
        <CartelBase
            titulo ={"Editar colección"}
            funcionCerrar={funcionCerrar}
            textoBotonConfirmar="Guardar Cambios"
            funcionConfirmar={funcionConfirmar}
        >
            <div className="flex flex-col gap-2">
                <label className="text-blanco font-outfit font-bold text-lg">Nombre de la colección</label>
                <input className="rounded-lg bg-white/5 text-blanco p-2 border border-white/20" type="text" placeholder={nombreActual}></input>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-blanco font-outfit font-bold text-lg">Descripción (opcional)</label>
                <textarea className="rounded-lg bg-white/5 text-blanco p-2 border border-white/20 min-h-[7rem]" placeholder={descripcionActual}></textarea> 
            </div>
        </CartelBase>
        
    );
};

export default CartelEditarColeccion; 