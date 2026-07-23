import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";

function Gamecard({
  imagenJuego = 'https://i.pravatar.cc/150?img=3',
  tituloJuego = 'Juego',
  anioLanzamiento = 2022
}) {
  return (
    <div className="relative flex w-full max-w-[140px] mx-auto flex-col overflow-hidden rounded-xl border border-white/10 bg-[#080d1e] transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5">
      {/* Imagen del Juego */}
      <Link to="/" className="group relative aspect-square w-full overflow-hidden">
        <img
          src={imagenJuego}
          alt={tituloJuego}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Información y Botón */}
      <div className="flex flex-col gap-1 px-2 py-1">
        <div>
          <Link to="/">
            <h3 className="text-xs font-bold text-white hover:text-blue-400 transition-colors line-clamp-1">
              {tituloJuego}
            </h3>
          </Link>
          <span className="text-[11px] font-medium text-slate-400">{anioLanzamiento}</span>
        </div>

        <button className="flex w-full items-center justify-center gap-1 rounded-md border border-blue-500/20 bg-blue-950/20 py-1 px-2 text-[10px] font-semibold text-white transition-all hover:border-blue-500/40 hover:bg-blue-900/30 active:scale-[0.97]">
          <CirclePlus className="h-3 w-3 text-blue-500 shrink-0" />
          Agregar a coleccion
        </button>
      </div>
    </div>
  );
}

export default Gamecard;