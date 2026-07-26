import { useState, useEffect, useCallback } from 'react';
import api from '../services/gameService';
import toast from 'react-hot-toast';
import { Home, CopyPlus, Gamepad2, Star } from 'lucide-react';
import Header from '../components/layout/Header';
import SidebarNavigation from '../components/layout/SidebarNavigation';
import Gamecard from '../components/ui/Gamecard';
import Footer from '../components/layout/Footer.jsx';
import Paginador from '../components/ui/Paginador';

const menu = [
  { id: 'inicio', label: 'Inicio', to: '/inicio', icon: Home },
  { id: 'coleccion', label: 'Colección', to: '/coleccion', icon: CopyPlus },
  { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 }
];

function Coleccion() {
  const [paginaActual, setPaginaActual] = useState(1);

  const [juegosColeccion, setJuegosColeccion] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para el Modal de Edición
  const [editingGame, setEditingGame] = useState(null);
  const [editForm, setEditForm] = useState({ calificacion_personal: 0, tiempo_de_juego_horas: 0, estado: 'pendiente' });

  useEffect(() => {
    const fetchColeccion = async () => {
      try {
        const response = await api.get('/colecciones');
        setJuegosColeccion(response.data.data || []);
      } catch (error) {
        console.error("Error al obtener la colección:", error);
        toast.error("Error al cargar tu colección");
      } finally {
        setLoading(false);
      }
    };

    fetchColeccion();
  }, []);

  const handleRemoveColeccion = useCallback(async (idJuego) => {
    try {
      await api.delete(`/colecciones/${idJuego}`);
      setJuegosColeccion(prev => {
        const newState = prev.filter(item => item.id_juego !== idJuego);
        // Ajustar paginaActual si al eliminar juegos nos quedamos en una página vacía
        const totalPagesCalculado = Math.ceil(newState.length / 10) || 1;
        setPaginaActual(prevPagina => (prevPagina > totalPagesCalculado ? totalPagesCalculado : prevPagina));
        return newState;
      });
      toast.success("Juego eliminado de tu colección");
    } catch (error) {
      console.error("Error al eliminar de la colección:", error);
      toast.error(error.response?.data?.error || "Error al eliminar el juego");
    }
  }, []);

  const handleEditClick = useCallback((idJuego) => {
    const game = juegosColeccion.find(item => item.id_juego === idJuego);
    if (game) {
      setEditingGame(game);
      setEditForm({
        calificacion_personal: game.calificacion_personal || 0,
        tiempo_de_juego_horas: game.tiempo_de_juego_horas || 0,
        estado: game.estado || 'pendiente'
      });
    }
  }, [juegosColeccion]);

  const handleSaveEdit = async () => {
    try {
      await api.put(`/colecciones/${editingGame.id_juego}`, editForm);
      toast.success("Estadísticas actualizadas");
      
      // Actualizamos el estado local
      setJuegosColeccion(prev => prev.map(item => {
        if (item.id_juego === editingGame.id_juego) {
          return { ...item, ...editForm };
        }
        return item;
      }));
      setEditingGame(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error(error.response?.data?.error || "Error al actualizar las estadísticas");
    }
  };

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
          {loading ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
              Cargando tu colección...
            </p>
          ) : juegosColeccion.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
              No tenés juegos en tu colección todavía.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {juegosColeccion
                .slice((paginaActual - 1) * 10, paginaActual * 10)
                .map((item) => (
                <Gamecard
                  key={item.id_juego}
                  id={item.id_juego}
                  idRawg={item.Juego?.id_rawg}
                  tituloJuego={item.Juego?.titulo || 'Juego sin título'}
                  tiempoJugado={item.tiempo_de_juego_horas || 0}
                  puntuacion={item.calificacion_personal || 0}
                  imagenJuego={item.Juego?.url_imagen || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300'}
                  onRemove={handleRemoveColeccion}
                  onEdit={handleEditClick}
                  variant="coleccion"
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {juegosColeccion.length > 0 && (
        <Paginador 
          totalPaginas={Math.ceil(juegosColeccion.length / 10) || 1} 
          paginaActual={paginaActual} 
          setPaginaActual={setPaginaActual} 
        />
      )}
      <Footer />

      {/* MODAL DE EDICIÓN */}
      {editingGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button 
              onClick={() => setEditingGame(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-1">Editar Estadísticas</h2>
            <p className="text-slate-400 text-sm mb-6">{editingGame.Juego?.titulo}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Estado</label>
                <select 
                  value={editForm.estado}
                  onChange={(e) => {
                    const newEstado = e.target.value;
                    if (newEstado === 'pendiente') {
                      setEditForm({...editForm, estado: newEstado, tiempo_de_juego_horas: 0, calificacion_personal: 0});
                    } else {
                      setEditForm({...editForm, estado: newEstado});
                    }
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="jugando">Jugando</option>
                  <option value="completado">Completado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tiempo de Juego (Horas)</label>
                <input 
                  type="number" 
                  min="0"
                  disabled={editForm.estado === 'pendiente'}
                  value={editForm.tiempo_de_juego_horas}
                  onChange={(e) => setEditForm({...editForm, tiempo_de_juego_horas: parseInt(e.target.value) || 0})}
                  className={`w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white outline-none ${editForm.estado === 'pendiente' ? 'opacity-50 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Calificación Personal</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star}
                      disabled={editForm.estado === 'pendiente'}
                      onClick={() => setEditForm({...editForm, calificacion_personal: star})}
                      className={`focus:outline-none transition-transform ${editForm.estado === 'pendiente' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                    >
                      <Star 
                        className={`w-8 h-8 ${star <= editForm.calificacion_personal ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600 fill-slate-600'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleSaveEdit}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-4 rounded-xl transition-all"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Coleccion;     