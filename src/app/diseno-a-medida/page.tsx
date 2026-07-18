import Link from 'next/link';
import Image from 'next/image';

const steps = [
  { number: '01', title: 'Levantamiento', description: 'Definimos el uso, las medidas, la materialidad, las tolerancias y la factibilidad técnica de la propuesta.' },
  { number: '02', title: 'Diseño e ingeniería', description: 'Desarrollamos la solución en CAD y preparamos cada componente para una fabricación precisa y coordinada.' },
  { number: '03', title: 'Selección de materiales', description: 'Especificamos aceros, metales, terminaciones y elementos complementarios según el espacio y su nivel de exigencia.' },
  { number: '04', title: 'Fabricación', description: 'Integramos corte, plegado, curvado, armado y soldadura con control en cada etapa del proceso.' },
  { number: '05', title: 'Entrega e instalación', description: 'Verificamos terminaciones y funcionamiento antes de coordinar el montaje o la entrega de la pieza terminada.' },
];

export default function CustomDesignPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Diseño a medida</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">Proyectos concebidos desde la arquitectura y la intención.</h1>
            <p className="mt-6 text-lg leading-8 text-[#57514b]">Cada proyecto avanza desde un requerimiento concreto hasta una solución fabricable, con decisiones visibles sobre proporción, materialidad, tolerancias y montaje.</p>
          </div>
          <div className="overflow-hidden border border-black/10 bg-[#e3ddd3] shadow-[0_24px_70px_rgba(20,16,10,0.10)]">
            <Image src="/images/editorial-diseno.jpg" alt="Mesa editorial de diseño técnico con planos y muestras metálicas" width={1536} height={1024} className="aspect-[16/10] w-full object-cover" priority />
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="border border-black/10 bg-[#f8f5ef] p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(20,16,10,0.07)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8a837a]">{step.number} · Etapa</p>
              <h2 className="mt-4 font-serif text-3xl">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#625c55]">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5 border border-black/10 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-serif text-3xl">Una solución precisa comienza con una buena conversación.</p>
          <Link href="/contacto" className="inline-flex w-fit items-center bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white">Comenzar un proyecto</Link>
        </div>
      </div>
    </main>
  );
}
