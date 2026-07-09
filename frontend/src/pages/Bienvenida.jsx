// src/pages/Bienvenida.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedGames } from '../services/gameService';

// IMPORTACIONES CON TUS NOMBRES REALES DE CARPETA
import fondoGamer from '../assets/images/fondo 3.jpg'; 
import logoClubGamer from '../assets/images/clubgamer-logo.png';
import iconColecciona from '../assets/images/coleccion1.png';
import iconPuntua from '../assets/images/estrella 1.png';
import iconDescubri from '../assets/images/lupa.png'; // La lupa

function Bienvenida() {
  // Datos mockeados iniciales (funcionales y directos)
  const mockGames = [
    { id: 1, titulo: 'GTA V', imagenUrl: 'https://via.placeholder.com/150x220' },
    { id: 2, titulo: 'NBA 2K', imagenUrl: 'https://via.placeholder.com/150x220' },
    { id: 3, titulo: 'EA FC 26', imagenUrl: 'https://via.placeholder.com/150x220' },
  ];

  /* // Descomenta esto cuando quieras conectarlo al back con React Query:
  const { data: featuredGames, isLoading } = useQuery({
    queryKey: ['featuredGames'],
    queryFn: fetchFeaturedGames,
    initialData: mockGames
  });
  const gamesToShow = featuredGames || mockGames;
  */
  const gamesToShow = mockGames;

  return (
    <div 
      className="min-h-screen bg-[#0b112c] text-white flex flex-col justify-between p-6 sm:p-12 relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${fondoGamer})` }}
    >
      {/* Contenedor Principal Centrado */}
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        
        {/* COLUMNA IZQUIERDA: Textos y Botones */}
        <div className="md:col-span-7 flex flex-col space-y-6">
          {/* Logo en formato PNG */}
          <div className="w-48 sm:w-56">
            <img src={logoClubGamer} alt="ClubGamer Logo" className="w-full h-auto object-contain" />
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-5xl font-black tracking-wide leading-none">
            TU MUNDO.<br />
            <span className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">
              TUS JUEGOS.
            </span>
          </h1>

          {/* Descripción con la X cyan */}
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-medium leading-relaxed">
            <span className="text-[#00f2fe] font-bold text-lg mr-1">✕</span> 
            CREA TUS COLECCIONES, AGREGA TUS JUEGOS FAVORITOS, OPINA Y ORGANIZALOS.
            <span className="block text-[#0072ff] font-extrabold mt-2 tracking-wide">
              ¡TODO EN UN SOLO LUGAR!
            </span>
          </p>

          {/* Botones de Autenticación */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:opacity-90 text-white font-bold px-6 py-3 rounded-lg shadow-[0_4px_15px_rgba(0,198,255,0.3)] transition-transform active:scale-95 text-sm sm:text-base">
              <span>🎮</span> REGISTRARME
            </button>
            <button className="flex items-center gap-2 bg-transparent border-2 border-[#1e293b] hover:border-[#00f2fe] text-white font-bold px-6 py-3 rounded-lg transition-colors active:scale-95 text-sm sm:text-base">
              <span>👤</span> INGRESAR
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: Contenedor de Juegos Destacados */}
        <div className="md:col-span-5">
          {/* Caja derecha con color semi-transparente personalizado */}
          <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-2xl">
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-slate-400">
                <span>🎮</span> JUEGOS DESTACADOS
              </div>
              <span className="text-slate-400 hover:text-white cursor-pointer text-sm font-bold">❯</span>
            </div>

            {/* Grid de Portadas */}
            <div className="grid grid-cols-3 gap-3">
              {gamesToShow.map((game) => (
                <div 
                  key={game.id} 
                  className="rounded-xl overflow-hidden border border-white/5 bg-slate-800 aspect-[3/4] shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <img 
                    src={game.imagenUrl} 
                    alt={game.titulo} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER: Características inferiores (Tres columnas simples) */}
      <div className="w-full max-w-4xl mx-auto border-t border-white/5 pt-6 mt-12 z-10 flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-4">
        
        {/* Item 1 */}
        <div className="flex items-center gap-4">
          <img src={iconColecciona} alt="Colecciona" className="w-8 h-8 object-contain" />
          <div>
            <h3 className="text-sm font-black tracking-wider leading-tight">COLECCIONA</h3>
            <p className="text-[10px] text-slate-500 font-bold tracking-wide">TUS JUEGOS</p>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-white/10"></div>

        {/* Item 2 */}
        <div className="flex items-center gap-4">
          <img src={iconPuntua} alt="Puntúa" className="w-8 h-8 object-contain" />
          <div>
            <h3 className="text-sm font-black tracking-wider leading-tight">PUNTUA</h3>
            <p className="text-[10px] text-slate-500 font-bold tracking-wide">Y OPINA</p>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-white/10"></div>

        {/* Item 3 */}
        <div className="flex items-center gap-4">
          <img src={iconDescubri} alt="Descubrí" className="w-8 h-8 object-contain" />
          <div>
            <h3 className="text-sm font-black tracking-wider leading-tight">DESCUBRI</h3>
            <p className="text-[10px] text-slate-500 font-bold tracking-wide">JUEGOS</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Bienvenida;