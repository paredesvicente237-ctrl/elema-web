import Link from 'next/link';

const collections = [
  { title: 'Cocinas', href: '/colecciones/cocinas', description: 'Composiciones arquitectónicas redefinidas para residencias de alto nivel.' },
  { title: 'Parrillas', href: '/colecciones/parrillas', description: 'Piezas de fuego con presencia, precisión y sofisticación.' },
  { title: 'Campanas', href: '/colecciones/campanas', description: 'Elementos escultóricos que articulan el espacio.' },
  { title: 'Soluciones personalizadas', href: '/colecciones/soluciones-personalizadas', description: 'Diseño, ingeniería y fabricación a medida para proyectos singulares.' },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Colecciones</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Una mirada editorial sobre cada propuesta.</h1>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <Link key={collection.title} href={collection.href} className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8 transition hover:border-elema-silver">
              <p className="text-sm uppercase tracking-[0.3em] text-elema-steel">Colección</p>
              <h2 className="mt-4 text-3xl font-semibold text-elema-warm">{collection.title}</h2>
              <p className="mt-4 text-base leading-8 text-elema-silver">{collection.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
