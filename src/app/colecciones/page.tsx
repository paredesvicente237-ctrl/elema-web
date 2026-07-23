import Image from 'next/image';
import Link from 'next/link';

const collections = [
  { title: 'Cocinas', href: '/colecciones/cocinas', description: 'Elementos de trabajo, encuentro y materia integrados en una sola arquitectura.', image: '/images/cocina-aurora.png' },
  { title: 'Parrillas', href: '/colecciones/parrillas', description: 'Elementos que ordenan el fuego y lo convierten en el centro del espacio.', image: '/images/parrilla-lumen.png' },
  { title: 'Campanas', href: '/colecciones/campanas', description: 'Elementos de aire y extracción concebidos como presencia arquitectónica.', image: '/images/campana-noctis.png' },
  { title: 'Soluciones personalizadas', href: '/colecciones/soluciones-personalizadas', description: 'Elementos diseñados, coordinados y fabricados para una arquitectura específica.', image: '/images/editorial-diseno.jpg' },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#eee7dc] pb-24 text-[#171717]">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-40 sm:px-6 lg:px-8 lg:pb-24 lg:pt-48">
        <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#777067]">Colecciones · 01—04</p>
        <div className="mt-6 grid gap-8 border-t border-black/15 pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">Cuatro familias de elementos. Un solo lenguaje.</h1>
          <p className="max-w-md text-base leading-8 text-[#56514b]">Cocinas, parrillas, campanas y soluciones propias, unidas por proporción, precisión y una materia que mejora con el tiempo.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-20 lg:space-y-32">
          {collections.map((collection, index) => (
            <Link key={collection.title} href={collection.href} className={`group grid gap-6 lg:grid-cols-12 lg:items-end ${index % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
              <div className="overflow-hidden bg-[#171717] lg:col-span-8">
                <Image src={collection.image} alt="" width={1400} height={900} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
              </div>
              <div className="border-t border-black/20 pt-5 lg:col-span-4 lg:pb-4">
                <p className="text-[0.68rem] uppercase tracking-[0.35em] text-[#777067]">0{index + 1} · Colección</p>
                <h2 className="mt-5 font-serif text-4xl sm:text-5xl">{collection.title}</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[#56514b]">{collection.description}</p>
                <span className="mt-8 inline-flex border-b border-black/30 pb-2 text-[0.7rem] uppercase tracking-[0.28em] transition group-hover:border-black">Explorar sus elementos</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
