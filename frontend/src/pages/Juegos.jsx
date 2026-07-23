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
    <main className="min-h-screen bg-gradient-to-b from-[#04091f] via-[#070d2d] to-[#161f7d] text-white flex flex-col">
      {/* Header ocupando todo el ancho */}
      <div className="px-4 pt-1 sm:px-6 sm:pt-2 lg:px-8 lg:pt-2 pb-2">
        <Header
          username="Tomas"
          textoBienvenida="Bienvenido de vuelta a la plataforma."
          avatarSrc="https://i.pravatar.cc/80?img=12"
          placeholderBuscador="Buscar juegos, contenido y mas..."
          logoAlt="Club Gamer"
        />
      </div>

      <div className="flex flex-1">
        {/* Sidebar vertical sin logo */}
        <SidebarNavigation items={menu} activeId="juegos" />

        <section className="flex-1 p-4 sm:p-6 lg:p-8 pt-0 lg:pt-2">
          {/* Título */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-sora font-bold sm:text-4xl">Explorar juegos</h1>
              <p className="mt-1 text-slate-300 font-medium">Descubrí y agrega juegos a tus colecciones.</p>
            </div>
          </div>

          {/* Grilla de juegos */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {gamesList.map((game) => (
              <Gamecard
                key={game.id}
                tituloJuego={game.titulo}
                anioLanzamiento={game.anio}
                imagenJuego={game.imagen}
              />
            ))}
          </div>
        </section>
      </div>

      <Paginador 
        totalPaginas={totalPaginas} 
        paginaActual={paginaActual} 
        setPaginaActual={setPaginaActual} 
      />
      <Footer />
    </main>
  );
}

export default Juegos;