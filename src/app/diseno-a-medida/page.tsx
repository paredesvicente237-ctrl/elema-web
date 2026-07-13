import Link from 'next/link';

export default function CustomDesignPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Diseño a medida</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Proyectos concebidos desde la arquitectura y la intención.</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">Cada proyecto comienza con una conversación, evolucionando por diseño, materiales, fabricación e instalación.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[ 'Conversación inicial', 'Diseño', 'Selección de materiales', 'Fabricación', 'Instalación' ].map((step) => (
            <div key={step} className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-elema-steel">Etapa</p>
              <h2 className="mt-4 text-2xl font-semibold text-elema-warm">{step}</h2>
              <p className="mt-4 text-sm leading-7 text-elema-silver">Sección provisional para describir cómo se desarrolla un proyecto de diseño a medida en ELEMA.</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
          <Link href="/contacto" className="inline-flex items-center rounded-full bg-elema-warm px-6 py-3 text-sm font-medium text-elema-black">Comenzar un proyecto</Link>
        </div>
      </div>
    </main>
  );
}
