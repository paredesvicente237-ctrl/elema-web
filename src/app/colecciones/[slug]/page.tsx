import Image from 'next/image';
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
    <main className="min-h-screen bg-[#eee7dc] px-4 pb-24 pt-40 text-[#171717] sm:px-6 lg:px-8 lg:pt-48">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-black/15 pb-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#777067]">Colección</p>
            <h1 className="mt-5 font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">{collection.title}</h1>
          </div>
          <p className="max-w-md text-base leading-8 text-[#56514b]">{collection.description}</p>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {products.filter((product) => product.category.toLowerCase() === collection.title.toLowerCase()).map((product) => (
            <article key={product.id} className="group">
              <div className="overflow-hidden bg-[#171717]">
                <Image src={product.images[0]} alt={product.name} width={1200} height={900} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
              </div>
              <div className="mt-5 border-t border-black/20 pt-5">
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#777067]">{product.category}</p>
                <h2 className="mt-3 font-serif text-3xl">{product.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[#56514b]">{product.shortDescription}</p>
              </div>
              <Link href={`/producto/${product.slug}`} className="mt-6 inline-flex border-b border-black/30 pb-2 text-[0.7rem] uppercase tracking-[0.28em] transition group-hover:border-black">
                Ver producto
              </Link>
            </article>
          ))}
          {products.filter((product) => product.category.toLowerCase() === collection.title.toLowerCase()).length === 0 ? (
            <div className="col-span-full grid min-h-[420px] place-items-center border border-black/15 bg-[#e7ded1] px-6 text-center">
              <div className="max-w-xl">
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#777067]">Fabricación especial</p>
                <h2 className="mt-5 font-serif text-4xl">Cada solución comienza con tu espacio.</h2>
                <Link href="/contacto" className="mt-8 inline-flex border-b border-black/30 pb-2 text-[0.7rem] uppercase tracking-[0.28em]">Conversar sobre un proyecto</Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
