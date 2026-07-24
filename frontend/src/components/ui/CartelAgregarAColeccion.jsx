import CartelBase from './CartelBase';
import {useState} from 'react';
import {Star, ChevronDown, Plus, Minus} from 'lucide-react';

function CartelAgregarAColeccion({
    colecciones,
    juegoSeleccionado,
    funcionCerrar,
    funcionConfirmar
}){
    const [puntuacion, setPuntuacion] = useState(0);
    const [hoverEstrella, setHoverEstrella] = useState(0);
    const [coleccionSeleccionada, setColeccionSeleccionada] = useState(null);
    const [horasJugadas, setHorasJugadas] = useState(0);

    return (
        <CartelBase
            titulo="Agregar a colección"
            funcionCerrar={funcionCerrar}
            textoBotonConfirmar="Agregar"
            funcionConfirmar={funcionConfirmar}
        >
            {/* Bloque 1: Info del juego (Imagen, Titulo, Año)*/}
            <div className="flex items-center gap-4">
                <img 
                    src={juegoSeleccionado.imagen} 
                    alt={juegoSeleccionado.titulo} 
                    className="w-20 h-28 object-cover rounded-xl border border-white/10 shadow-md"
                />
                <div className="flex flex-col gap-1">
                    <h2 className="font-sora font-bold text-lg">{juegoSeleccionado.titulo}</h2>
                    <p className="font-outfit font-medium text-sm text-white/60">{juegoSeleccionado.anioLanzamiento}</p>
                </div>
            </div>
            
            {/* Bloque 2: Seleccion de Coleccion (Checkbox de colecciones, boton de crearNuevaColeccion)*/}
            <div className="flex flex-col gap-3 my-1">
                <h2 className="font-sora font-bold text-base">1. Elegí una colección</h2>
                <div className="relative">
                    <select defaultValue={coleccionSeleccionada} onChange={(e) => setColeccionSeleccionada(e.target.value)} className="font-outfit text-base text-blanco bg-secundario-azul-oscuro border border-white/30 rounded-lg py-2.5 px-4 appearance-none w-full cursor-pointer">
                        {/*Acá deberian cargarse todas las colecciones del usuario */}
                        <option value="">Selecciona una colección</option>
                        {colecciones.map((coleccion) => (
                            <option key={coleccion.id} value={coleccion.id}>
                                {coleccion.nombre}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={24} className="absolute right-4 top-3 text-white pointer-events-none" />
                </div>  
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gris-cartel px-4 py-2.5 text-sm font-sora font-bold text-blanco border border-white/20 hover:bg-white/5 transition-colors">Crear nueva colección</button>
            </div>
            
            {/* Bloque 3: Puntuacion personal (0 a 5 estrellas)*/}
            <div className="flex flex-col gap-2 my-1">
                <h2 className="font-sora font-bold text-base">2. ¿Cómo puntuarias este juego? (Opcional)</h2>
            {/*Bloque de boton de 5 estrellas */}
                <div className="flex items-center gap-1">
                    {/* Estrella 1 */}
                    <button 
                        type="button"
                        onClick={() => setPuntuacion(1)}
                        onMouseEnter={() => setHoverEstrella(1)}
                        onMouseLeave={() => setHoverEstrella(puntuacion)}
                        className="transition-colors focus:outline-none"
                    >
                        <Star 
                            size={24} 
                            className={1 <= (hoverEstrella || puntuacion) ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                        />
                    </button>

                    {/* Estrella 2 */}
                    <button 
                        type="button"
                        onClick={() => setPuntuacion(2)}
                        onMouseEnter={() => setHoverEstrella(2)}
                        onMouseLeave={() => setHoverEstrella(puntuacion)}
                        className="transition-colors focus:outline-none"
                    >
                        <Star 
                            size={24} 
                            className={2 <= (hoverEstrella || puntuacion) ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                        />
                    </button>

                    {/* Estrella 3 */}
                    <button 
                        type="button"
                        onClick={() => setPuntuacion(3)}
                        onMouseEnter={() => setHoverEstrella(3)}
                        onMouseLeave={() => setHoverEstrella(puntuacion)}
                        className="transition-colors focus:outline-none"
                    >
                        <Star 
                            size={24} 
                            className={3 <= (hoverEstrella || puntuacion) ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                        />
                    </button>

                    {/* Estrella 4 */}
                    <button 
                        type="button"
                        onClick={() => setPuntuacion(4)}
                        onMouseEnter={() => setHoverEstrella(4)}
                        onMouseLeave={() => setHoverEstrella(puntuacion)}
                        className="transition-colors focus:outline-none"
                    >
                        <Star 
                            size={24} 
                            className={4 <= (hoverEstrella || puntuacion) ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                        />
                    </button>

                    {/* Estrella 5 */}
                    <button 
                        type="button"
                        onClick={() => setPuntuacion(5)}
                        onMouseEnter={() => setHoverEstrella(5)}
                        onMouseLeave={() => setHoverEstrella(puntuacion)}
                        className="transition-colors focus:outline-none"
                    >
                        <Star 
                            size={24} 
                            className={5 <= (hoverEstrella || puntuacion) ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                        />
                    </button>

                    <p className="text-white/60 ml-2">{puntuacion}/5</p>
                </div>
            </div>
            

            {/* Bloque 4: Horas jugadas (input de numero entero)*/}
            <div className="flex flex-col gap-2">
                <h2 className="font-sora font-bold text-base">3. Horas jugadas (Opcional)</h2>
                <div className="relative flex items-center">
                    <input 
                        type="number" 
                        min="0"
                        value={horasJugadas}
                        onChange={(e) => setHorasJugadas(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-transparent border border-white/20 rounded-xl pl-4 pr-20 py-2 text-white font-outfit focus:outline-none focus:border-morado-principal transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="absolute right-3 flex items-center gap-2 text-white/90">
                        <button
                            type="button"
                            onClick={() => setHorasJugadas(prev => Math.max(0, Number(prev) - 1))}
                            className="hover:text-white transition-colors p-1 focus:outline-none"
                            title="Restar 1 hora"
                        >
                            <Minus size={22} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setHorasJugadas(prev => Number(prev) + 1)}
                            className="hover:text-white transition-colors p-1 focus:outline-none"
                            title="Sumar 1 hora"
                        >
                            <Plus size={22} />
                        </button>
                    </div>
                </div>
                <p className="text-white/60 text-base ml-1">Tiempo total que llevas jugando</p>
            </div>

        </CartelBase>
    );
}

export default CartelAgregarAColeccion;