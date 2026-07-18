import Link from 'next/link';
import Image from 'next/image';

const capabilities = [
  { title: 'Desarrollo técnico', description: 'Interpretación de planos, modelado CAD/Inventor, revisión de factibilidad y preparación para fabricación.' },
  { title: 'Transformación del metal', description: 'Corte láser y guillotina, plegado y curvado de tubos para resolver piezas y conjuntos especiales.' },
  { title: 'Armado y terminaciones', description: 'Soldadura MIG/TIG y láser, armado controlado y terminaciones definidas según el uso del proyecto.' },
  { title: 'Materiales', description: 'Acero inoxidable y carbono, galvanizado, aluminio, cobre, bronce y planchas especiales según especificación.' },
];

export default function ProfessionalsPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Profesionales</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">Colaboraciones para arquitectos, diseñadores y constructoras.</h1>
            <p className="mt-6 text-lg leading-8 text-[#57514b]">ELEMA trabaja con equipos que exigen detalle y coordinación, transformando planos, prototipos o requerimientos funcionales en soluciones fabricables.</p>
          </div>
          <div className="overflow-hidden border border-black/10 bg-[#e3ddd3] shadow-[0_24px_70px_rgba(20,16,10,0.10)]">
            <Image src="/images/editorial-profesionales.jpg" alt="Equipo profesional revisando planos junto a una pieza metálica" width={1536} height={1024} className="aspect-[16/10] w-full object-cover" priority />
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <article key={capability.title} className="border border-black/10 bg-[#f8f5ef] p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(20,16,10,0.07)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8a837a]">Capacidad</p>
              <h2 className="mt-4 font-serif text-3xl">{capability.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#625c55]">{capability.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5 border border-black/10 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-serif text-3xl">Integramos diseño y fabricación desde el inicio del proyecto.</p>
          <Link href="/contacto" className="inline-flex w-fit bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white">Trabajar con ELEMA</Link>
        </div>
      </div>
    </main>
  );
}
