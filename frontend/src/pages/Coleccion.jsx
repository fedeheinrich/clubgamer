import { useState, useEffect } from 'react';
import { Home, CopyPlus, Gamepad2, User } from 'lucide-react';
import Header from '../components/layout/Header';
import SidebarNavigation from '../components/layout/SidebarNavigation';
import Gamecard from '../components/ui/Gamecard';
import Footer from '../components/layout/Footer.jsx';
import Paginador from '../components/ui/Paginador';

function Coleccion() {
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = 1;
  const [juegosColeccion, setJuegosColeccion] = useState([]);

  // Mock de datos, simulando los juegos agregados a la colección
  useEffect(() => {
    const fetchColeccion = async () => {
      // Aquí iría la llamada al backend para obtener los juegos de la colección del usuario (GET /api/coleccion)
      // const response = await fetch(...);
      // const data = await response.json();
      const mockColeccion = [
        {
          id: 1,
          titulo: 'Call Of Duty: MW2',
          anio: 2023,
          imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300'
        },
        {
          id: 4,
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
      setJuegosColeccion(mockColeccion);
    };

    fetchColeccion();
  }, []);

  const menu = [
    { id: 'inicio', label: 'Inicio', to: '/', icon: Home },
    { id: 'coleccion', label: 'Colección', to: '/coleccion', icon: CopyPlus },
    { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#04091f] via-[#070d2d] to-[#161f7d] text-white flex flex-col">
      {/* Header ocupando todo el ancho */}
      <div className="px-4 pt-1 sm:px-6 sm:pt-2 lg:px-8 lg:pt-2 pb-2">
        <Header
          username="Tomas"
          textoBienvenida="Bienvenido a tu colección."
          avatarSrc="https://i.pravatar.cc/80?img=12"
          placeholderBuscador="Buscar en mi colección..."
          logoAlt="Club Gamer"
        />
      </div>

      <div className="flex flex-1">
        {/* Sidebar vertical */}
        <SidebarNavigation items={menu} activeId="coleccion" />

        <section className="flex-1 p-4 sm:p-6 lg:p-8 pt-0 lg:pt-2">
          {/* Título */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-sora font-bold sm:text-4xl">Mi Colección</h1>
              <p className="mt-1 text-slate-300 font-medium">Tus juegos guardados en un solo lugar.</p>
            </div>
          </div>

          {/* Grilla de juegos de la colección */}
          {juegosColeccion.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
              No tenés juegos en tu colección todavía.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {juegosColeccion.map((game) => (
                <Gamecard
                  key={game.id}
                  tituloJuego={game.titulo}
                  anioLanzamiento={game.anio}
                  imagenJuego={game.imagen}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {juegosColeccion.length > 0 && (
        <Paginador 
          totalPaginas={totalPaginas} 
          paginaActual={paginaActual} 
          setPaginaActual={setPaginaActual} 
        />
      )}
      <Footer />
    </main>
  );
}

export default Coleccion;     