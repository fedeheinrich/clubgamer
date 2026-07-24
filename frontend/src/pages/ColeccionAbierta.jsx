import Header from '../components/layout/Header';
import SidebarNavigation from '../components/layout/SidebarNavigation';
import Footer from '../components/layout/Footer';
import {Home, CopyPlus, Gamepad2, User, ChevronLeft, ChevronRight, Trash2, PencilLine, Plus} from 'lucide-react';
import Colecciones from './Colecciones';
import {useLocation} from 'react-router-dom'; 
import Gamecard from '../components/ui/Gamecard';

function ColeccionAbierta(){
    const menu = [
    { id: 'inicio', label: 'Inicio', to: '/', icon: Home },
    { id: 'colecciones', label: 'Colecciones', to: '/colecciones', icon: CopyPlus },
    { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 },
    { id: 'perfil', label: 'Mi perfil', to: '/perfil', icon: User }
    ];
    const {state} = useLocation()
    const juegos = state.juegoDetalles;
    console.log(state)
    return(
        <main className="min-h-screen bg-gradient-to-b from-[#04091f] via-[#070d2d] to-[#161f7d] text-white flex flex-col">
            <Header />

            <div className="flex flex-1">
                <SidebarNavigation items={menu} activeId={"colecciones"}/>

                <section className="flex-1 p-4 sm:p-6 lg:p-8 pt-0 lg:pt-2">
                    <div className= "flex">
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500"> Mis colecciones</p>
                        <ChevronRight/>
                        <span className="text-[#919191]">
                            {state.nombre}
                        </span>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-sora font-bold sm:text-4xl">{state.nombre}</h1>
                            <p className="mt-1 text-slate-300 font-medium">{state.descripcion}</p>
                        </div>
                        <div className="flex gap-3 items-stretch">
                            <button
                                onClick={console.log("Colección eliminada")}
                                className="inline-flex items-center gap-2 rounded-xl  px-5 py-3 text-sm font-sora font-bold border-2 border-[#f40b0b]"
                            >
                            <Trash2 className="text-[#f40b0b]"/>
                            <span className="text-[#f40b0b]">
                                Eliminar Coleccion
                            </span>
                            </button>
                            <div className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 p-px">
                                <button
                                    onClick={console.log("Colección eliminada")}
                                    className="inline-flex items-center gap-2 block w-full rounded-[11px] bg-[#060c2b] px-5 py-3 text-white"
                                >
                                <PencilLine className="text-[#ffffff]"/>
                                <span className="text-white">
                                    Editar colección
                                </span>
                                </button>
                            </div>
                            <div className="flex gap-3 items-stretch">
                                <button
                                    onClick={console.log("Colección eliminada")}
                                    className="inline-flex items-center gap-2 rounded-xl  px-5 py-3 text-sm font-sora font-bold  bg-gradient-to-r from-violet-600 to-cyan-500"
                                > 
                                    <Plus className="h-5 w-5"/>
                                    <span className="text-white"> 
                                        Agregar juegos
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className= "grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {juegos.map((game) => (
                            <div className="flex w-fit h-fit rounded-xl border-2 border-[#ffffff]"> 
                                <Gamecard
                                key={game.id}
                                tituloJuego={game.titulo}
                                anioLanzamiento={game.anio}
                                imagenJuego={game.imagen}
                                />
                            </div>
                        ))}
                    </div>    
                </section>
            </div>

            <Footer/>
        </main>
    );
}
export default ColeccionAbierta;