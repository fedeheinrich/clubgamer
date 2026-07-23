import { useState } from 'react';
import { Home, CopyPlus, Gamepad2, User } from 'lucide-react';
import Header from '../components/layout/Header';
import SidebarNavigation from '../components/layout/SidebarNavigation';
import Gamecard from '../components/ui/Gamecard';
import Footer from '../components/layout/Footer.jsx';
import Paginador from '../components/ui/Paginador';

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
    { id: 'inicio', label: 'Inicio', to: '/', icon: Home },
    { id: 'colecciones', label: 'Colecciones', to: '/colecciones', icon: CopyPlus },
    { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 },
    { id: 'perfil', label: 'Mi perfil', to: '/perfil', icon: User }
  ];

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
            <h1 className="text-3xl font-sora font-bold">Explorar juegos</h1>
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

          <Paginador 
            totalPaginas={totalPaginas} 
            paginaActual={paginaActual} 
            setPaginaActual={setPaginaActual} 
          />
        </section>
      </div>
      
    </main>
  );
}

export default Juegos;