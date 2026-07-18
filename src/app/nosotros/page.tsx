import Link from 'next/link';
import Image from 'next/image';

const principles = [
  { title: 'Diseño fabricable', description: 'Cada decisión estética se contrasta con materiales, tolerancias, uniones y condiciones reales de montaje.' },
  { title: 'Ingeniería aplicada', description: 'Desarrollamos desde planos, modelos o requerimientos funcionales para anticipar interferencias antes de fabricar.' },
  { title: 'Precisión material', description: 'Trabajamos el acero y otros metales mediante procesos de corte, plegado, curvado, armado y soldadura.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">La marca</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">Más que productos. Presencia.</h1>
            <p className="mt-6 text-lg leading-8 text-[#57514b]">ELEMA reúne diseño, ingeniería y fabricación metalmecánica para crear cocinas, parrillas, campanas y piezas arquitectónicas con carácter propio.</p>
          </div>
          <div className="overflow-hidden border border-black/10 bg-[#e3ddd3] shadow-[0_24px_70px_rgba(20,16,10,0.10)]">
            <Image src="/images/editorial-nosotros.jpg" alt="Detalle editorial de mobiliario metálico y cubierta de piedra" width={1536} height={1024} className="aspect-[16/10] w-full object-cover" priority />
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="border border-black/10 bg-[#f8f5ef] p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(20,16,10,0.07)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8a837a]">Principio</p>
              <h2 className="mt-4 font-serif text-3xl">{principle.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#625c55]">{principle.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5 border border-black/10 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-serif text-3xl">Conversemos sobre una pieza o proyecto para tu espacio.</p>
          <Link href="/contacto" className="inline-flex w-fit bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white">Solicitar asesoría</Link>
        </div>
      </div>
    </main>
  );
}
