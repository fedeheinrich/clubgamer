import { Home, CopyPlus, Gamepad2, ChevronRight, User, Star} from 'lucide-react';
import Header from "../components/layout/Header";
import SidebarNavigation from "../components/layout/SidebarNavigation";

import { Link } from "react-router-dom";

import {FaSteam, FaWindows, FaPlaystation, FaXbox, FaApple} from "react-icons/fa";


function Detalles() {

    const menu = [
        { id: 'inicio', label: 'Inicio', to: '/', icon: Home },
        { id: 'coleccion', label: 'Coleccion', to: '/coleccion', icon: CopyPlus },
        { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 }
      ];

    return (
      <main className="min-h-screen bg-[#0b112c] text-white">
        
        <div className="px-4 pt-1 sm:px-6 sm:pt-2 lg:px-8 lg:pt-2 pb-2">
        <Header
          username="Tomas"
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

               <p className="bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent font-medium relative top-0.3">titulo del juego</p>

            </div>
          </div>

          {/* Info Principal */}
          <section className="flex gap-8">

            {/* Columna izquierda */}
            <div className="w-64 flex flex-col gap-4">

                <img src="https://imgs.search.brave.com/Jv-c0OSofRle5ahVgoPdQ9fe1VuelA8umjr2li7aoAY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/Z3RhLXZpLWNvdmVy/LWFydC12MC10aGh2/OG16dGprYmcxLmpw/ZWc_d2lkdGg9NjQw/JmNyb3A9c21hcnQm/YXV0bz13ZWJwJnM9/YjE1NjAyNjZmYzU5/YWYyNjBjMTI4YzM0/ODQzYjhmMzc4Y2E0/YzE5ZQ" alt="Titulo Juego" className="rounded-xl"/>

                <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-400 hover:from-purple-800 hover:to-cyan-800 text-white px-6 py-3 rounded-xl transition-all duration-300 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <CopyPlus size={18}/>
                    Agregar a colección
                </button>

            </div>

            {/* Columna derecha */}
            <div className="flex-1">

                <h1 className="font-bold text-white">Grand Theft Auto VI</h1>

                <div className="flex flex-wrap items-center justify-between"> 
                    <p className="mt-1 text-slate-300 font-medium">Rockstar Games</p>
                    <p className="mt-1 text-slate-300 font-medium">•</p>
                    <p className="mt-1 text-slate-300 font-medium">2026</p>
                    <p className="mt-1 text-slate-300 font-medium">•</p>
                    <p className="mt-1 text-slate-300 font-medium">Accion, Mundo Abierto, Adultos</p>
                </div>

                {/* Ratings */}
                <div className="mt-6 flex items-center gap-2">

                    <Star className="text-yellow-400 fill-yellow-400" size={15} />
                    <Star className="text-yellow-400 fill-yellow-400" size={15} />
                    <Star className="text-yellow-400 fill-yellow-400" size={15} />
                    <Star className="text-yellow-400 fill-yellow-400" size={15} />
                    <Star className="text-trasparent fill-trasparent" size={15} />
                    <p className="ml-1 text-white font-bold">4.0</p>
                 
                </div>

                {/* Descripción */}
                <div className="mt-6 flex items-center gap-2">
                    <p className="text-slate-400 font-medium">Jason y Lucía siempre han sabido que las cartas estaban en su contra, pero cuando un golpe que parecía fácil sale mal, se ven atrapados en el lado más oscuro del lugar más soleado de América, en medio de una conspiración criminal que se extiende por todo el estado de Leónida, y obligados a depender más que nunca el uno del otro si quieren salir con vida.</p>
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