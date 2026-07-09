import React from 'react';
import { Link } from 'react-router-dom';

function PlaceholderPage({ title, description, backTo = '/', backLabel = 'Volver al inicio' }) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-md">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
          Club Gamer
        </p>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          {description}
        </p>
        <Link
          to={backTo}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.02]"
        >
          {backLabel}
        </Link>
      </section>
    </main>
  );
}

export default PlaceholderPage;