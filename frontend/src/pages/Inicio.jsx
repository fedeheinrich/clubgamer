import {useState, useEffect, useMemo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import api from '../services/gameService';
import useAuth from '../hooks/useAuth';

import Header from "../components/layout/Header";
import SidebarNavigation from "../components/layout/SidebarNavigation";
import Footer from "../components/layout/Footer";
import { Star, ChevronRight, PlayCircle, Monitor, Gamepad2, Home, CopyPlus } from 'lucide-react';
import { FaWindows } from "react-icons/fa";

const menu = [
    { id: 'inicio', label: 'Inicio', to: '/inicio', icon: Home },
    { id: 'coleccion', label: 'Colección', to: '/coleccion', icon: CopyPlus },
    { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 }
];

function Inicio(){
    const [juegosDestacados, setJuegosDestacados] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const fetchDestacados = async () => {
            try {
                const response = await api.get('/videojuegos?limit=20');
                const todos = response.data.data || [];
                const mejores = todos.sort((a,b) => b.calificacion_global - a.calificacion_global).slice(0, 5);
                setJuegosDestacados(mejores);
            } catch (error) {
                console.error("Error cargando destacados:", error);
            }
        };
        fetchDestacados();
    }, []);

    useEffect(() => {
        if (juegosDestacados.length === 0) return;
        
        const interval = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % juegosDestacados.length);
                setFading(false);
            }, 300);
        }, 5000); 
        
        return () => clearInterval(interval);
    }, [juegosDestacados]);

    const handleDotClick = useCallback((idx) => {
        setFading(true);
        setTimeout(() => {
            setCurrentIndex(idx);
            setFading(false);
        }, 300);
    }, []);

    const currentGame = juegosDestacados[currentIndex];

    if (!currentGame) {
        return (
            <main className="h-screen w-screen flex flex-col bg-[#070d2d] text-white overflow-hidden">
                <Header/>
                <div className="flex flex-1 overflow-hidden">
                    <SidebarNavigation items={menu} activeId="inicio" />
                    <div className="flex-1 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                </div>
            </main>
        );
    }

    const imageUrl = currentGame.url_imagen || currentGame.imagenUrl;

    return (
        <main className="h-screen w-screen flex flex-col bg-gradient-to-br from-[#04091f] via-[#070d2d] to-[#161f7d] text-white overflow-hidden">
            
            <div className="shrink-0">
                <Header/>
            </div>

            <div className="flex flex-1 overflow-hidden">
                
                <div className="shrink-0 h-full">
                    <SidebarNavigation items={menu} activeId="inicio" />
                </div>

                <div className="flex-1 flex flex-col gap-4 p-4 lg:p-6 lg:pl-0 h-full overflow-hidden">
                     
                    <div className="flex-[2] min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
                        
                        <div className="lg:col-span-8 flex flex-col h-full">
                            <div className="relative w-full flex-1 rounded-3xl overflow-hidden border border-[#3D63FF]/30 shadow-[0_0_30px_rgba(61,99,255,0.1)] group">
                                <img 
                                    src={imageUrl} 
                                    alt={currentGame.titulo} 
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-90'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#04091f]/90 via-[#04091f]/20 to-transparent"></div>
                                
                                <div className="absolute top-4 left-5 flex gap-2">
                                    <span className="px-3 py-1 rounded-full border border-cyan-500 text-[10px] font-bold tracking-wider bg-black/60 shadow-[0_0_10px_rgba(0,242,254,0.3)]">DESTACADO</span>
                                </div>

                                <div className="absolute bottom-14 left-5 pr-4">
                                    <h1 className="text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight drop-shadow-lg truncate">{currentGame.titulo}</h1>
                                </div>

                                <Link to={`/detalles/${currentGame.id_rawg || currentGame.id}`} className="absolute bottom-4 left-5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#3D63FF] to-[#00f2fe] border-none text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_15px_rgba(0,242,254,0.4)]">
                                    VER MÁS <ChevronRight size={14} />
                                </Link>
                            </div>
                            
                            <div className="shrink-0 flex justify-center items-center gap-2 mt-3 h-4">
                                {juegosDestacados.map((_, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => handleDotClick(idx)}
                                        className={`h-1.5 rounded-full cursor-pointer transition-[width,background-color] duration-300 ${
                                            idx === currentIndex 
                                            ? 'w-8 bg-gradient-to-r from-[#3D63FF] to-[#00f2fe]' 
                                            : 'w-2 bg-white/20 hover:bg-white/40'
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col h-full overflow-hidden">
                            
                            <div className="bg-[#0b1336] rounded-3xl border border-white/10 p-6 2xl:p-8 shadow-xl flex flex-col justify-between flex-1 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#0b1336]/90 to-[#0b1336]"></div>

                                <div className="relative z-10 flex flex-col min-h-0 flex-1">
                                    <div className="flex flex-col gap-3 2xl:gap-4 mt-2 shrink-0">
                                        <div className="flex items-center gap-2 text-xs 2xl:text-sm font-bold tracking-widest text-cyan-400">
                                            <Star className="text-cyan-400 fill-cyan-400" size={16} /> 
                                            JUEGO DESTACADO
                                        </div>
                                        <h2 className="text-3xl 2xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                                            {currentGame.titulo}
                                        </h2>
                                    </div>
                                    <div className="mt-4 flex-1 min-h-0">
                                        <p className="text-slate-300 text-sm 2xl:text-base leading-relaxed font-medium line-clamp-4 2xl:line-clamp-6">
                                            {currentGame.descripcion?.trim() ? currentGame.descripcion : "Un increíble título que no puede faltar en tu colección de juegos favoritos."}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-6 shrink-0">
                                    <Link to={`/detalles/${currentGame.id_rawg || currentGame.id}`} className="w-full bg-[#151d4a] border border-white/10 hover:bg-[#1c2660] transition-colors rounded-xl py-2.5 px-4 flex justify-between items-center text-xs 2xl:text-sm font-bold">
                                        VER DETALLES <ChevronRight size={16} />
                                    </Link>

                                    <div className="flex justify-between items-center mt-3 px-1">
                                        <div className="flex items-center gap-1.5 border border-[#3D63FF]/30 rounded-lg px-3 py-1 bg-[#3D63FF]/10">
                                            <Star size={12} className="text-[#00f2fe]" />
                                            <span className="font-bold text-xs text-[#00f2fe]">{currentGame.calificacion_global || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <FaWindows size={16} className="hover:text-white transition-colors cursor-pointer" />
                                            <Gamepad2 size={18} className="hover:text-white transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Spacer invisible para igualar la altura de los indicadores del carrusel y alinear perfectamente las tarjetas */}
                            <div className="shrink-0 mt-4 h-4"></div>
                        </div>
                    </div>

                    <div className="flex-[1] min-h-0 flex flex-col mt-2">
                        <div className="flex justify-between items-end mb-3 shrink-0 px-1">
                            <h3 className="text-lg 2xl:text-xl font-bold tracking-wide">Más populares</h3>
                            <Link to="/juegos" className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors">
                                Explorar catálogo <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="flex-1 min-h-0 grid grid-cols-4 gap-4 2xl:gap-6">
                            {juegosDestacados.slice(0, 4).map((game, i) => {
                                const imgSrc = game.url_imagen || game.imagenUrl || '';
                                const optimizedImg = imgSrc.includes('media.rawg.io/media/games/')
                                    ? imgSrc.replace('media/games/', 'media/crop/600/400/games/')
                                    : imgSrc;
                                return (
                                <Link to={`/detalles/${game.id_rawg || game.id}`} key={`other-${i}`} className="h-full rounded-2xl overflow-hidden border border-white/5 hover:border-[#3D63FF]/30 bg-[#0b1336] group cursor-pointer relative transition-[border-color] duration-300 block">
                                    <img src={optimizedImg} alt={game.titulo} loading="lazy" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 2xl:p-4">
                                        <h4 className="font-bold text-xs 2xl:text-sm truncate drop-shadow-md">{game.titulo}</h4>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Star size={10} className="text-[#00f2fe]" />
                                            <span className="text-[10px] 2xl:text-xs text-slate-300">{game.calificacion_global}</span>
                                        </div>
                                    </div>
                                </Link>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

        </main>
    );
}

export default Inicio;