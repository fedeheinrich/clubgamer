import { useState, useEffect } from 'react';
import api from '../services/gameService';
import toast from 'react-hot-toast';
import { Home, CopyPlus, Gamepad2, User } from 'lucide-react';
import Header from '../components/layout/Header';
import SidebarNavigation from '../components/layout/SidebarNavigation';
import Gamecard from '../components/ui/Gamecard';
import Footer from '../components/layout/Footer.jsx';
import Paginador from '../components/ui/Paginador';

function Juegos() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get(`/videojuegos?page=${paginaActual}`);
        setGamesList(response.data.data || []);
        if (response.data.paginacion) {
          setTotalPaginas(response.data.paginacion.total_paginas);
        }
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        toast.error("Ocurrió un error al cargar los juegos");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [paginaActual]);

  const handleAddColeccion = async (idJuego) => {
    try {
      await api.post('/colecciones', { id_juego: idJuego });
      toast.success("Juego agregado a tu colección exitosamente");
    } catch (error) {
      console.error("Error al agregar a la colección:", error);
      toast.error(error.response?.data?.message || "Ocurrió un error al agregar a la colección");
    }
  };

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
          {loading ? (
            <p className="text-slate-300">Cargando juegos...</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {gamesList.map((game) => (
                <Gamecard
                  key={game.id}
                  id={game.id}
                  idRawg={game.id_rawg}
                  tituloJuego={game.titulo}
                  anioLanzamiento={game.lanzamiento || '2023'}
                  puntuacion={game.calificacion_global}
                  imagenJuego={game.url_imagen || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300'}
                  onAdd={handleAddColeccion}
                />
              ))}
            </div>
          )}
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