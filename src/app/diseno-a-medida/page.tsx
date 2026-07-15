import Link from 'next/link';

const steps = [
  { number: '01', title: 'Levantamiento', description: 'Definimos el uso, las medidas, la materialidad, las tolerancias y la factibilidad técnica de la propuesta.' },
  { number: '02', title: 'Diseño e ingeniería', description: 'Desarrollamos la solución en CAD y preparamos cada componente para una fabricación precisa y coordinada.' },
  { number: '03', title: 'Selección de materiales', description: 'Especificamos aceros, metales, terminaciones y elementos complementarios según el espacio y su nivel de exigencia.' },
  { number: '04', title: 'Fabricación', description: 'Integramos corte, plegado, curvado, armado y soldadura con control en cada etapa del proceso.' },
  { number: '05', title: 'Entrega e instalación', description: 'Verificamos terminaciones y funcionamiento antes de coordinar el montaje o la entrega de la pieza terminada.' },
];

export default function CustomDesignPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Diseño a medida</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Proyectos concebidos desde la arquitectura y la intención.</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">Cada proyecto avanza desde un requerimiento concreto hasta una solución fabricable, con decisiones visibles sobre proporción, materialidad, tolerancias y montaje.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-elema-steel">{step.number} · Etapa</p>
              <h2 className="mt-4 text-2xl font-semibold text-elema-warm">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-elema-silver">{step.description}</p>
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
