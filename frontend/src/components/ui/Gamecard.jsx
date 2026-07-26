import { Link, useLocation } from "react-router-dom";
import { CirclePlus, Clock4, Star, Trash2, Edit } from "lucide-react";

function Gamecard({
  imagenJuego = 'https://i.pravatar.cc/150?img=3',
  tituloJuego = 'Juego',
  anioLanzamiento = 2022,
  tiempoJugado = 0,
  puntuacion = 0,
  id,
  idRawg,
  onAdd,
  onRemove,
  onEdit,
}) {
  const {pathname} = useLocation();

  if (pathname === "/juegos") {
    return(
      <div className="relative flex w-full max-w-[140px] mx-auto flex-col overflow-hidden rounded-xl border border-white/10 bg-[#080d1e] transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5">
      {/* Imagen del Juego */}
      <Link to={`/detalles/${idRawg || id}`} className="group relative aspect-[10/11] w-full overflow-hidden">
        <img
          src={imagenJuego}
          alt={tituloJuego}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Información y Botón */}
      <div className="flex flex-col gap-1 px-2 py-1">
        <div>
          <Link to={`/detalles/${idRawg || id}`}>
            <h3 className="text-xs font-bold text-white hover:text-blue-400 transition-colors line-clamp-1">
              {tituloJuego}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] font-medium text-slate-400">{anioLanzamiento}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500/20" />
              <span className="text-[11px] font-medium text-slate-400">{puntuacion || 'N/A'}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onAdd(id)}
          className="flex w-full items-center justify-center gap-1 rounded-md border border-blue-500/20 bg-blue-950/20 py-1 px-2 text-[10px] font-semibold text-white transition-all hover:border-blue-500/40 hover:bg-blue-900/30 active:scale-[0.97]">
          <CirclePlus className="h-3.5 w-3.5 text-blue-500 shrink-0" />
          Agregar a coleccion
        </button>
      </div>
    </div>
    )
  }

  if(pathname === "/coleccion"){
    return(
      <div className="relative flex w-full max-w-[140px] mx-auto flex-col overflow-hidden rounded-xl border border-white/10 bg-[#080d1e] transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5">
      {/* Imagen del Juego */}
      <Link to={`/detalles/${idRawg || id}`} className="group relative aspect-[10/11] w-full overflow-hidden">
        <img
          src={imagenJuego}
          alt={tituloJuego}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Información y Botón */}
      <div className="flex flex-col gap-1 px-2 py-1">
        <div>
            <Link to={`/detalles/${idRawg || id}`}>
              <h3 className="text-xs font-bold text-white hover:text-blue-400 transition-colors line-clamp-1">
                {tituloJuego}
              </h3>
            </Link>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2  items-center">
                <Clock4 className="w-4 h-4 font-medium text-slate-400 "></Clock4>
                <p className="text-[11px] font-medium text-slate-400">
                  {tiempoJugado}
                </p>
              </div>
              <div className="flex gap-2 items-center ">
                <Star className="w-4 h-4 font-medium text-slate-400 "> </Star>
                <p className="text-[11px] font-medium text-slate-400">
                  {puntuacion}
                </p>
              </div>
            </div>
        </div>
        <div className="mt-2 flex w-full gap-1">
          <button 
            onClick={() => onEdit(id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-md border border-blue-500/20 bg-blue-950/20 py-1 px-1 text-[10px] font-semibold text-white transition-all hover:border-blue-500/40 hover:bg-blue-900/30 active:scale-[0.97]">
            <Edit className="h-3 w-3 text-blue-500 shrink-0" />
            Editar
          </button>
          <button 
            onClick={() => onRemove(id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-md border border-red-500/20 bg-red-950/20 py-1 px-1 text-[10px] font-semibold text-white transition-all hover:border-red-500/40 hover:bg-red-900/30 active:scale-[0.97]">
            <Trash2 className="h-3 w-3 text-red-500 shrink-0" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
    )
  }

  return null;
}

export default Gamecard;