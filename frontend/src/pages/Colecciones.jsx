import { useState } from 'react';
import {
  Home,
  Gamepad2,
  User,
  CopyPlus,
  Pencil,
  Trash2,
  Plus,
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';

import Header from '../components/layout/Header';
import SidebarNavigation from '../components/layout/SidebarNavigation';
import CartelEditarColeccion from '../components/ui/CartelEditarColeccion';
import Footer from '../components/layout/Footer';
function Colecciones() {
  const coleccionesIniciales = [
    {
      id: 1,
      nombre: 'Favoritos',
      descripcion: 'Mis juegos preferidos de todos los tiempos.',
      total: 7,
      color: 'from-violet-500 to-indigo-500',
      badge: 'text-violet-300 border-violet-400/40',
      extra: '+2 más',
      juegos: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300',
        'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=300',
        'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=300',
        'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=300'
      ]
    },
    {
      id: 2,
      nombre: 'Sin terminar',
      descripcion: 'Juegos que quiero terminar antes del 2027.',
      total: 7,
      color: 'from-amber-500 to-orange-500',
      badge: 'text-amber-300 border-amber-400/40',
      extra: '+2 más',
      juegos: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300',
        'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=300',
        'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=300',
        'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=300'
      ]
    },
    {
      id: 3,
      nombre: 'Multijugador',
      descripcion: 'Juegos para disfrutar con mis amigos de manera online.',
      total: 7,
      color: 'from-cyan-500 to-blue-500',
      badge: 'text-cyan-300 border-cyan-400/40',
      extra: '+2 más',
      juegos: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300',
        'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=300',
        'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=300',
        'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=300'
      ]
    }
  ];

  const [colecciones, setColecciones] = useState(coleccionesIniciales);
  const [coleccionAEditar, setColeccionAEditar] = useState(null);

// Funciones de prueba, editar despues
  const funcionCerrar = () => {
    setColeccionAEditar(null);
  };
  const funcionConfirmar = (nuevoNombre, nuevaDescripcion) => {
    setColecciones((prevColecciones) =>
      prevColecciones.map((coleccion) =>
        coleccion.id === coleccionAEditar.id
          ? { ...coleccion, nombre: nuevoNombre, descripcion: nuevaDescripcion }
          : coleccion
      )
    );
    setColeccionAEditar(null);
  };

  const agregarColeccion = () => {
    const nuevaColeccion = {
      id: Date.now(),
      nombre: 'Nueva colección',
      descripcion: 'Colección creada localmente',
      total: 0,
      color: 'from-fuchsia-500 to-pink-500',
      badge: 'text-fuchsia-300 border-fuchsia-400/40',
      extra: '+0 más',
      juegos: []
    };

    setColecciones((prevColecciones) => [nuevaColeccion, ...prevColecciones]);
  };

  const eliminarColeccion = (id) => {
    setColecciones((prevColecciones) =>
      prevColecciones.filter((coleccion) => coleccion.id !== id)
    );
  };

  const menu = [
    { id: 'inicio', label: 'Inicio', to: '/', icon: Home },
    { id: 'colecciones', label: 'Colecciones', to: '/colecciones', icon: CopyPlus },
    { id: 'juegos', label: 'Juegos', to: '/juegos', icon: Gamepad2 },
    { id: 'perfil', label: 'Mi perfil', to: '/login', icon: User }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#04091f] via-[#070d2d] to-[#161f7d] text-white flex flex-col">
      {/* Header ocupando todo el ancho */}
      <div className="px-4 pt-1 sm:px-6 sm:pt-2 lg:px-8 lg:pt-2 pb-2">
        <Header
          username="Tomas"
          textoBienvenida="Bienvenido de vuelta a la plataforma."
          avatarSrc="https://i.pravatar.cc/80?img=12"
          placeholderBuscador="Buscar colecciones..."
          logoAlt="Club Gamer"
        />
      </div>

      <div className="flex flex-1">
        {/* Sidebar vertical sin logo */}
        <SidebarNavigation items={menu} activeId="colecciones" />

        <section className="flex-1 p-4 sm:p-6 lg:p-8 pt-0 lg:pt-2">

          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-sora font-bold sm:text-4xl">Mis colecciones</h1>
              <p className="mt-1 text-slate-300 font-medium">Organiza tus juegos como más te guste.</p>
            </div>

            <button
              onClick={agregarColeccion}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-sora font-bold shadow-lg shadow-cyan-900/40 hover:brightness-110"
            >
              <Plus className="h-5 w-5" />
              Nueva colección
            </button>
          </div>

          <div className="space-y-4">
            {colecciones.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                No tenés colecciones todavía.
              </p>
            ) : (
              colecciones.map((col) => (
                <article
                  key={col.id}
                  className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#070c25]/85 p-4 shadow-xl shadow-black/25"
                >
                  <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${col.color}`} />
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    <div className="xl:w-72">
                      <h2 className="text-3xl font-sora font-bold leading-tight">{col.nombre}</h2>
                      <p className="mt-1 text-sm text-slate-300">{col.descripcion}</p>
                      <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${col.badge}`}>
                        {col.total} Juegos
                      </span>
                    </div>

                    <div className="flex flex-1 items-center gap-3 overflow-x-auto">
                      {col.juegos.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Juego ${idx + 1}`}
                          className="h-24 w-24 shrink-0 rounded-xl border border-white/10 object-cover"
                        />
                      ))}

                      <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xl font-black text-slate-300">
                        {col.extra}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end xl:self-center">
                      <button
                        onClick={() => setColeccionAEditar(col)}
                        className="rounded-lg border border-white/15 bg-white/5 p-2 hover:bg-white/10"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => eliminarColeccion(col.id)}
                        className="rounded-lg border border-white/15 bg-white/5 p-2 hover:bg-white/10"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="rounded-lg border border-white/15 bg-white/5 p-2 hover:bg-white/10">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>  
      {coleccionAEditar && (
        <CartelEditarColeccion
          nombreActual={coleccionAEditar.nombre}
          descripcionActual={coleccionAEditar.descripcion}
          funcionCerrar={funcionCerrar}
          funcionConfirmar={funcionConfirmar}
        />
      )}
      <Footer />
    </main>
  );
}

export default Colecciones;