import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';

const COLLECTIONS = {
  cocinas: { title: 'Cocinas', description: 'Espacios de cocina que combinan precisión, composición y presencia.', href: '/colecciones/cocinas' },
  parrillas: { title: 'Parrillas', description: 'Una propuesta de fuego y diseño para jardines, patios y espacios de hosting.', href: '/colecciones/parrillas' },
  campanas: { title: 'Campanas', description: 'Elementos que unen arquitectura, proporciones y presencia.', href: '/colecciones/campanas' },
  'soluciones-personalizadas': { title: 'Soluciones personalizadas', description: 'Fabricación y diseño a medida para proyectos de arquitectura y construcción.', href: '/colecciones/soluciones-personalizadas' },
};

export function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((slug) => ({ slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = COLLECTIONS[slug as keyof typeof COLLECTIONS];
  if (!collection) notFound();

  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Colección</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">{collection.title}</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">{collection.description}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {products.filter((product) => product.category.toLowerCase() === collection.title.toLowerCase()).map((product) => (
            <article key={product.id} className="rounded-[1.75rem] border border-elema-steel/20 bg-elema-soft p-5">
              <div className="aspect-[4/3] rounded-[1.25rem] bg-elema-graphite" />
              <h2 className="mt-5 text-2xl font-semibold text-elema-warm">{product.name}</h2>
              <p className="mt-3 text-sm leading-7 text-elema-silver">{product.shortDescription}</p>
              <Link href={`/producto/${product.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-elema-warm">
                Ver producto
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
