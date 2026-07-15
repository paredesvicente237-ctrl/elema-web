import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

const categories = ['Todas', 'Cocinas', 'Parrillas', 'Campanas', 'Soluciones personalizadas'];

export default function StorePage() {
  return (
    <main className="min-h-screen bg-[#ece4d8] px-4 py-24 text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7a7269]">Tienda</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Colecciones para proyectos de alto nivel.</h1>
          <p className="mt-6 text-lg leading-8 text-[#4a453f]">Explora piezas comprables y propuestas personalizadas con una experiencia elegante, discreta y precisa.</p>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-[#161616]/10 bg-[#f6efe6] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button key={category} className="border border-[#161616]/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-[#4a453f] transition hover:border-[#161616]/20 hover:text-[#171717]">
                {category}
              </button>
            ))}
          </div>
          <div className="text-sm uppercase tracking-[0.24em] text-[#7a7269]">Ordenar por: Destacados</div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-[1.75rem] border border-[#161616]/10 bg-[#f6efe6] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
              <div className="overflow-hidden rounded-[1.25rem] bg-[#101010]">
                <Image src={product.images[0]} alt={product.name} width={900} height={700} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.02]" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#7a7269]">{product.category}</p>
                <span className="border border-[#161616]/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-[#4a453f]">{product.tag}</span>
              </div>
              <h2 className="mt-3 font-serif text-2xl text-[#171717]">{product.name}</h2>
              <p className="mt-3 min-h-[56px] text-sm leading-7 text-[#4a453f]">{product.shortDescription}</p>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-[#4a453f]">{product.priceOnRequest ? 'Precio a solicitud' : `CLP ${product.price?.toLocaleString('es-CL')}`}</p>
                <Link href={`/producto/${product.slug}`} className="border border-[#171717]/15 px-4 py-2 text-sm uppercase tracking-[0.24em] text-[#171717] transition hover:bg-[#171717] hover:text-[#f6efe6]">
                  Ver producto
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
