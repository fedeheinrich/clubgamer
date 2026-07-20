import {Link} from 'react-router-dom';

/*
  Propiedaes
  Titulo de cartel
  Boton X
  Casillero de respuesta con su titulo (puede ser de seleccion de numeros o input text)
  Background gris, bordes redondeados
  Boton cancelar
  Boton guardar o agregar a la coleccion

*/

// Colores: 
// #0f171f -- gris cartel
// #511BFD -- color principial violeta
// #03021F -- color secundario azul oscuro
// #01C3E8 -- color terciario turquesa
// #FFFFFF -- blanco
// Fuentes: Outfit Bold, Sora Bold, Outfit Medium

function CartelBase({
    titulo,
    funcionCerrar,
    children,
    textoBotonConfirmar,
    funcionConfirmar,
}){
    return (
        <div className="bg-[#0f171f] rounded-lg">
            <h2 className="">{titulo}</h2>
            <button onClick={funcionCerrar}> X </button>
            {children}
            <div className="">
                <button onClick={funcionCerrar}>Cancelar</button>
                <button onClick={funcionConfirmar}>{textoBotonConfirmar}</button>
            </div>
        </div>

    );

};

export default CartelBase; 