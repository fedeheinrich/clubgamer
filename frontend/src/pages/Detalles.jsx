import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/gameService';
import toast from 'react-hot-toast';
import { Home, CopyPlus, Gamepad2, ChevronRight, User, Star} from 'lucide-react';
import Header from "../components/layout/Header";
import SidebarNavigation from "../components/layout/SidebarNavigation";
import useAuth from '../hooks/useAuth';


import {FaSteam, FaWindows, FaPlaystation, FaXbox, FaApple} from "react-icons/fa";


function Detalles() {

    const { id } = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth() || {};
    const [personalStats, setPersonalStats] = useState(null);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await api.get(`/videojuegos/${id}`);
                setGameInfo(response.data.data);
            } catch (error) {
                console.error("Error fetching game details:", error);
                toast.error("Error al cargar los detalles del juego");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchGame();
    }, [id]);

    // Fetchear la colección del usuario para ver si ya tiene el juego y mostrar sus stats
    useEffect(() => {
        const fetchPersonalStats = async () => {
            if (isAuthenticated && gameInfo?.id) {
                try {
                    const response = await api.get('/colecciones');
                    const myCollection = response.data.data || [];
                    const stats = myCollection.find(item => item.id_juego === gameInfo.id);
                    if (stats) {
                        setPersonalStats(stats);
                    }
                } catch (error) {
                    console.error("Error fetching personal collection:", error);
                }
            }
        };
        fetchPersonalStats();
    }, [gameInfo, isAuthenticated]);

    const handleAddColeccion = async () => {
        try {
            // Utilizamos el gameInfo.id que es el ID local de la base de datos, no el id de la URL que es el de RAWG
            await api.post('/colecciones', { id_juego: gameInfo.id });
            toast.success("Juego agregado a tu colección exitosamente");
            // Actualizamos la vista localmente
            setPersonalStats({
                estado: 'pendiente',
                tiempo_de_juego_horas: 0,
                calificacion_personal: 0
            });
        } catch (error) {
            console.error("Error al agregar a la colección:", error);
            // El backend devuelve el mensaje de error en error.response.data.error, lo mostramos si existe
            toast.error(error.response?.data?.error || "Ocurrió un error al agregar a la colección");
        }
    };

    const menu = [
        { id: 'inicio', label: 'Inicio', to: '/', icon: Home },
        { id: 'coleccion', label: 'Coleccion', to: '/coleccion', icon: CopyPlus },
        { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 }
      ];

    if (loading) {
        return <div className="min-h-screen bg-[#0b112c] text-white flex items-center justify-center">Cargando...</div>;
    }

    if (!gameInfo) {
        return <div className="min-h-screen bg-[#0b112c] text-white flex items-center justify-center">Juego no encontrado</div>;
    }

    return (
      <main className="min-h-screen bg-[#0b112c] text-white">
        
        <div className="px-4 pt-1 sm:px-6 sm:pt-2 lg:px-8 lg:pt-2 pb-2">
        <Header
          username="Username"
          textoBienvenida="Bienvenido de vuelta a la plataforma."
          avatarSrc="https://i.pravatar.cc/80?img=12"
          placeholderBuscador="Buscar juegos..."
          logoAlt="Club Gamer"
        />
      </div>

      <div className="flex flex-1">
        {/* Sidebar vertical sin logo */}
        <SidebarNavigation items={menu} activeId="juegos" />

        <section className="flex-1 p-4 sm:p-6 lg:p-8 pt-0 lg:pt-2">
          {/* Ruta */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-1">

            <div className="flex items-center gap-1 mt-1">

               <Link to="/juegos"> <p className="text-slate-300 font-medium">Juegos</p> </Link>

               <ChevronRight className="text-white relative top-0.5" size={15} />

               <p className="bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent font-medium relative top-0.3">{gameInfo.titulo}</p>

            </div>
          </div>

          {/* Info Principal */}
          <section className="flex gap-8">

            {/* Columna izquierda */}
            <div className="w-64 flex flex-col gap-4">

                <img src={gameInfo.url_imagen || "https://imgs.search.brave.com/Jv-c0OSofRle5ahVgoPdQ9fe1VuelA8umjr2li7aoAY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/Z3RhLXZpLWNvdmVy/LWFydC12MC10aGh2/OG16dGprYmcxLmpw/ZWc_d2lkdGg9NjQw/JmNyb3A9c21hcnQm/YXV0bz13ZWJwJnM9/YjE1NjAyNjZmYzU5/YWYyNjBjMTI4YzM0/ODQzYjhmMzc4Y2E0/YzE5ZQ"} alt={gameInfo.titulo} className="rounded-xl w-full object-cover"/>

                {!personalStats && (
                    <button onClick={handleAddColeccion} className="w-full bg-gradient-to-r from-purple-600 to-cyan-400 hover:from-purple-800 hover:to-cyan-800 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2">
                        <CopyPlus size={18}/>
                        Agregar a colección
                    </button>
                )}
                {personalStats && (
                    <div className="w-full bg-slate-800/50 border border-purple-500/30 text-purple-400 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-default shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <span>✓</span> En tu colección
                    </div>
                )}

            </div>

            {/* Columna derecha */}
            <div className="flex-1">

                <h1 className="font-bold text-white text-4xl">{gameInfo.titulo}</h1>

                <div className="flex flex-wrap items-center gap-3 mt-2"> 
                    <p className="text-slate-300 font-medium">Desarrolladora (N/A)</p>
                    <p className="text-slate-300 font-medium">•</p>
                    <p className="text-slate-300 font-medium">{gameInfo.lanzamiento || '2023'}</p>
                    <p className="text-slate-300 font-medium">•</p>
                    <p className="text-slate-300 font-medium">{gameInfo.Generos?.map(g => g.nombre).join(', ') || 'Varios géneros'}</p>
                </div>

                {/* Ratings */}
                <div className="mt-6 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            className={`${star <= Math.round(gameInfo.calificacion_global || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600 fill-slate-600'}`} 
                            size={15} 
                        />
                    ))}
                    <p className="ml-1 text-white font-bold">{gameInfo.calificacion_global || '0.0'}</p>
                </div>

                {/* Estadísticas Personales */}
                {personalStats && (
                    <div className="mt-8 relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-md p-6 shadow-2xl">
                        {/* Pequeño resplandor de fondo */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                        
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <User className="text-blue-400" size={20} />
                            Tus Estadísticas
                        </h3>
                        
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Estado</p>
                                <p className="text-white font-bold capitalize text-base flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${personalStats.estado === 'completado' ? 'bg-green-500' : personalStats.estado === 'jugando' ? 'bg-blue-500' : 'bg-slate-500'}`}></span>
                                    {personalStats.estado}
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Tiempo Jugado</p>
                                <p className="text-white font-bold text-lg">{personalStats.tiempo_de_juego_horas} <span className="text-sm font-medium text-slate-400">hs</span></p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Tu Puntaje</p>
                                {personalStats.calificacion_personal > 0 ? (
                                    <div className="flex items-center gap-1">
                                        <Star className="text-yellow-400 fill-yellow-400" size={18}/>
                                        <p className="text-white font-bold text-lg">{personalStats.calificacion_personal}</p>
                                    </div>
                                ) : (
                                    <p className="text-slate-500 font-medium text-sm mt-1">Sin calificar</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Descripción */}
                <div className="mt-6 flex items-center gap-2">
                    <p className="text-slate-400 font-medium leading-relaxed">{gameInfo.descripcion || 'Sin descripción disponible.'}</p>
                </div>

                {/* Plataformas */}
                <div className="mt-6 grid">
                    <p className="text-slate-300 font-bold">Plataformas</p>
                    <div className="mt-3 flex items-center gap-7 text-xl text-slate-100">
                      <FaSteam className="transition-transform duration-200 hover:scale-125"/>
                      <FaPlaystation className="transition-transform duration-200 hover:scale-125"/>
                      <FaXbox className="transition-transform duration-200 hover:scale-125"/>
                    </div>
                </div>

            </div>

           </section>

        </section>

      </div>

      </main>
    );
  }
  
  export default Detalles;