import Link from 'next/link';

const capabilities = [
  { title: 'Desarrollo técnico', description: 'Interpretación de planos, modelado CAD/Inventor, revisión de factibilidad y preparación para fabricación.' },
  { title: 'Transformación del metal', description: 'Corte láser y guillotina, plegado y curvado de tubos para resolver piezas y conjuntos especiales.' },
  { title: 'Armado y terminaciones', description: 'Soldadura MIG/TIG y láser, armado controlado y terminaciones definidas según el uso del proyecto.' },
  { title: 'Materiales', description: 'Acero inoxidable y carbono, galvanizado, aluminio, cobre, bronce y planchas especiales según especificación.' },
];

export default function ProfessionalsPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Profesionales</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Colaboraciones para arquitectos, diseñadores y constructoras.</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">ELEMA trabaja con equipos que exigen detalle y coordinación, transformando planos, prototipos o requerimientos funcionales en soluciones fabricables.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <article key={capability.title} className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-elema-steel">Capacidad</p>
              <h2 className="mt-4 text-2xl font-semibold text-elema-warm">{capability.title}</h2>
              <p className="mt-4 text-sm leading-7 text-elema-silver">{capability.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
          <Link href="/contacto" className="inline-flex rounded-full bg-elema-warm px-6 py-3 text-sm font-medium text-elema-black">Trabajar con ELEMA</Link>
        </div>
      </div>
    </main>
  );
}
