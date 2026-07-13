import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">La marca</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Más que productos. Presencia.</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">ELEMA reúne diseño, ingeniería, fabricación y materiales premium para transformar espacios extraordinarios.</p>
        </div>
        <div className="mt-10 rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
          <Link href="/contacto" className="inline-flex rounded-full bg-elema-warm px-6 py-3 text-sm font-medium text-elema-black">Solicitar asesoría privada</Link>
        </div>
      </div>
    </main>
  );
}
