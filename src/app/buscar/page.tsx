import Link from 'next/link';
import { products } from '@/data/products';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Buscar</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Exploración editorial y búsqueda de piezas.</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">La búsqueda inicial está preparada para integrarse con contenido real posteriormente.</p>
        </div>
        <div className="mt-10 rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-6">
          <input className="w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3 text-elema-warm" placeholder="Buscar por producto o colección" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <Link key={product.id} href={`/producto/${product.slug}`} className="rounded-[1.5rem] border border-elema-steel/20 bg-elema-black/50 p-4 text-elema-silver transition hover:border-elema-silver">
                <p className="text-sm uppercase tracking-[0.28em] text-elema-steel">{product.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-elema-warm">{product.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
