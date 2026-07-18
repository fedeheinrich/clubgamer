import { useState } from 'react';
import { HomeIcon, SquaresPlusIcon, UserIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Header from '../components/layout/Header';
import SidebarNavigation from '../components/layout/SidebarNavigation';
import Gamecard from '../components/ui/Gamecard';

function GamepadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7.4 9h9.2a4.6 4.6 0 0 1 4.45 5.78l-.48 1.73a2.45 2.45 0 0 1-4.2 1.02l-1.06-1.2a2.2 2.2 0 0 0-1.65-.74h-3.32c-.63 0-1.23.28-1.65.74l-1.06 1.2a2.45 2.45 0 0 1-4.2-1.02l-.48-1.73A4.6 4.6 0 0 1 7.4 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.2 12.1v2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.15 13.15h2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="15.8" cy="12.6" r="0.85" fill="currentColor" />
      <circle cx="17.9" cy="14.2" r="0.85" fill="currentColor" />
    </svg>
  );
}

function Juegos() {
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = 10;

  const gamesList = [
    {
      id: 1,
      titulo: 'Call Of Duty: MW2',
      anio: 2023,
      imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300'
    },
    {
      id: 2,
      titulo: 'NBA2K26',
      anio: 2025,
      imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300'
    },
    {
      id: 3,
      titulo: 'EAFC26',
      anio: 2025,
      imagen: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=300'
    },
    {
      id: 4,
      titulo: 'GTA VI',
      anio: 2026,
      imagen: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?q=80&w=300'
    },
    {
      id: 5,
      titulo: 'Spider-Man 2',
      anio: 2023,
      imagen: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=300'
    },
    {
      id: 6,
      titulo: 'Call Of Duty: MW2',
      anio: 2023,
      imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300'
    },
    {
      id: 7,
      titulo: 'NBA2K26',
      anio: 2025,
      imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300'
    },
    {
      id: 8,
      titulo: 'EAFC26',
      anio: 2025,
      imagen: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=300'
    },
    {
      id: 9,
      titulo: 'GTA VI',
      anio: 2026,
      imagen: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?q=80&w=300'
    },
    {
      id: 10,
      titulo: 'Spider-Man 2',
      anio: 2023,
      imagen: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=300'
    }
  ];

  const menu = [
    { id: 'inicio', label: 'Inicio', to: '/', icon: HomeIcon },
    { id: 'colecciones', label: 'Colecciones', to: '/colecciones', icon: SquaresPlusIcon },
    { id: 'juegos', label: 'Juegos', to: '/juegos', icon: GamepadIcon },
    { id: 'perfil', label: 'Mi perfil', to: '/perfil', icon: UserIcon }
  ];

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

  return (
    <main className="h-screen bg-gradient-to-b from-[#04091f] via-[#070d2d] to-[#161f7d] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-4 sm:px-6 lg:px-8 py-0">
        <Header
          username="Tomas"
          textoBienvenida="Bienvenido de vuelta a la plataforma."
          avatarSrc="https://i.pravatar.cc/80?img=12"
          placeholderBuscador="Buscar juegos, contenido y mas..."
          logoAlt="Club Gamer"
        />
      </div>

      <div className="flex flex-1 min-h-0">
        <SidebarNavigation items={menu} activeId="juegos" />

        <section className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-2 pb-1">
          {/* Título */}
          <div className="shrink-0 mb-3">
            <h1 className="text-3xl font-black">Explorar juegos</h1>
            <p className="text-sm text-slate-300">Descubrí y agrega juegos a tus colecciones.</p>
          </div>

          {/* Grilla de juegos */}
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-min content-start">
            {gamesList.map((game) => (
              <Gamecard
                key={game.id}
                tituloJuego={game.titulo}
                anioLanzamiento={game.anio}
                imagenJuego={game.imagen}
              />
            ))}
          </div>

          {/* Paginador */}
          <nav className="shrink-0 mt-2 pb-1 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
              disabled={paginaActual === 1}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-3.5 w-3.5" />
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
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
          </nav>
        </section>
      </div>
    </main>
  );
}

export default Juegos;