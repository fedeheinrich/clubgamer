import { ChevronLeft, ChevronRight } from 'lucide-react';

function Paginador({
    totalPaginas,
    paginaActual,
    setPaginaActual
}){
    // Genera los números de página a mostrar
    const getPaginasVisibles = () => {
    const paginas = [];
    const maxVisibles = 4;
    for (let i = 1; i <= Math.min(maxVisibles, totalPaginas); i++) {
      paginas.push(i);
    }
    if (totalPaginas > maxVisibles + 1) {
      paginas.push('...');
    }
    if (totalPaginas > maxVisibles) {
      paginas.push(totalPaginas);
    }
    return paginas;
  };

    return(
        <nav className="shrink-0 -mt-2 mb-4 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
              disabled={paginaActual === 1}
              className="flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-md font-semibold text-slate-300 transition hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
              Anterior
            </button>

            {getPaginasVisibles().map((pagina, idx) =>
              pagina === '...' ? (
                <span key={`dots-${idx}`} className="flex h-8 w-8 items-center justify-center text-xs text-slate-400">
                  ...
                </span>
              ) : (
                <button
                  key={pagina}
                  onClick={() => setPaginaActual(pagina)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition
                    ${paginaActual === pagina
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {pagina}
                </button>
              )
            )}

            <button
              onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
              disabled={paginaActual === totalPaginas}
              className="flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-md font-semibold text-slate-300 transition hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </nav>
    );
};

export default Paginador;