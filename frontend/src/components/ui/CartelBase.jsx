/*
  Propiedaes
  Titulo de cartel
  Boton X
  Casillero de respuesta con su titulo (puede ser de seleccion de numeros o input text)
  Background gris, bordes redondeados
  Boton cancelar
  Boton guardar o agregar a la coleccion

*/

function CartelBase({
    titulo,
    funcionCerrar,
    children,
    textoBotonConfirmar,
    funcionConfirmar,
}){
    return (
        <div className="flex flex-col justify-between bg-gris-cartel rounded-lg p-6 gap-4">
            
            <div className="flex justify-between gap-4">
                <h2 className="text-blanco font-outfit font-bold text-xl">{titulo}</h2>
                <button className="text-blanco font-outfit font-medium text-xl " onClick={funcionCerrar}> X </button>
            </div>
            
            {children}
            
            <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 rounded-xl bg-gris-cartel text-blanco" onClick={funcionCerrar}>Cancelar</button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-bold shadow-lg shadow-cyan-900/40 hover:brightness-110" onClick={funcionConfirmar}>{textoBotonConfirmar}</button>
            </div>
        </div>

    );

};

export default CartelBase; 