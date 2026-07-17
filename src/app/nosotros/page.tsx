import Link from 'next/link';
import Image from 'next/image';

const principles = [
  { title: 'Diseño fabricable', description: 'Cada decisión estética se contrasta con materiales, tolerancias, uniones y condiciones reales de montaje.' },
  { title: 'Ingeniería aplicada', description: 'Desarrollamos desde planos, modelos o requerimientos funcionales para anticipar interferencias antes de fabricar.' },
  { title: 'Precisión material', description: 'Trabajamos el acero y otros metales mediante procesos de corte, plegado, curvado, armado y soldadura.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">La marca</p>
            <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Más que productos. Presencia.</h1>
            <p className="mt-6 text-lg leading-8 text-elema-silver">ELEMA reúne diseño, ingeniería y fabricación metalmecánica para crear cocinas, parrillas, campanas y piezas arquitectónicas con carácter propio.</p>
          </div>
          <div className="overflow-hidden border border-white/10 bg-elema-soft">
            <Image src="/images/editorial-nosotros.jpg" alt="Detalle editorial de mobiliario metálico y cubierta de piedra" width={1536} height={1024} className="aspect-[16/10] w-full object-cover" priority />
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-elema-steel">Principio</p>
              <h2 className="mt-4 text-2xl font-semibold text-elema-warm">{principle.title}</h2>
              <p className="mt-4 text-sm leading-7 text-elema-silver">{principle.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
          <Link href="/contacto" className="inline-flex rounded-full bg-elema-warm px-6 py-3 text-sm font-medium text-elema-black">Solicitar asesoría privada</Link>
        </div>
      </div>
    </main>
  );
}
