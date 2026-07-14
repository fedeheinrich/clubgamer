import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  SquaresPlusIcon,
  UserIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

import logoClubGamer from '../assets/images/logohorizontal.png';

function GamepadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7.4 9h9.2a4.6 4.6 0 0 1 4.45 5.78l-.48 1.73a2.45 2.45 0 0 1-4.2 1.02l-1.06-1.2a2.2 2.2 0 0 0-1.65-.74h-3.32c-.63 0-1.23.28-1.65.74l-1.06 1.2a2.45 2.45 0 0 1-4.2-1.02l-.48-1.73A4.6 4.6 0 0 1 7.4 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.2 12.1v2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.15 13.15h2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="15.8" cy="12.6" r="0.85" fill="currentColor" />
      <circle cx="17.9" cy="14.2" r="0.85" fill="currentColor" />
    </svg>
  );
}

function Colecciones() {
  const coleccionesMock = [
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

  const menu = [
    { id: 'inicio', label: 'Inicio', to: '/', icon: HomeIcon },
    { id: 'colecciones', label: 'Colecciones', to: '/colecciones', icon: SquaresPlusIcon, active: true },
    { id: 'juegos', label: 'Juegos', to: '/catalogo', icon: GamepadIcon },
    { id: 'perfil', label: 'Mi perfil', to: '/login', icon: UserIcon }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#04091f] via-[#070d2d] to-[#161f7d] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 p-6 lg:flex lg:flex-col">
          <img src={logoClubGamer} alt="Club Gamer" className="mb-10 h-auto w-48 object-contain" />

          <nav className="mx-auto mt-10 w-full max-w-[196px] space-y-5">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`group relative flex items-center gap-3.5 rounded-xl px-3 py-3 text-[1.12rem] font-semibold transition
                    ${item.active ? 'text-white' : 'text-slate-200/95 hover:text-white'}`}
                >
                  {item.active && (
                    <span className="absolute -left-6 top-1/2 h-11 w-3 -translate-y-1/2 rounded-r-full bg-[#3D63FF] shadow-[0_0_18px_rgba(61,99,255,0.95)]" />
                  )}
                  <Icon className={`h-6 w-6 shrink-0 ${item.active ? 'text-[#3D63FF]' : 'text-white'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#070d2b]/90 px-4 py-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar colecciones..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                />
              </label>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-cyan-400/20 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.2),transparent_45%),#0a1235] px-5 py-3">
              <p className="text-2xl font-extrabold leading-none">Hola, Tomas</p>
              <p className="mt-1 text-sm text-slate-300">Bienvenido de vuelta a la plataforma.</p>
            </div>

            <div className="lg:col-span-2 flex items-center justify-start lg:justify-end">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Avatar"
                className="h-14 w-14 rounded-full border-2 border-cyan-400/60 object-cover"
              />
            </div>
          </header>

          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black sm:text-4xl">Mis colecciones</h1>
              <p className="mt-1 text-slate-300">Organiza tus juegos como más te guste.</p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-bold shadow-lg shadow-cyan-900/40 hover:brightness-110">
              <PlusIcon className="h-5 w-5" />
              Nueva colección
            </button>
          </div>

          <div className="space-y-4">
            {coleccionesMock.map((col) => (
              <article
                key={col.id}
                className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#070c25]/85 p-4 shadow-xl shadow-black/25"
              >
                <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${col.color}`} />
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                  <div className="xl:w-72">
                    <h2 className="text-3xl font-extrabold leading-tight">{col.nombre}</h2>
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
                    <button className="rounded-lg border border-white/15 bg-white/5 p-2 hover:bg-white/10">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button className="rounded-lg border border-white/15 bg-white/5 p-2 hover:bg-white/10">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button className="rounded-lg border border-white/15 bg-white/5 p-2 hover:bg-white/10">
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Colecciones;