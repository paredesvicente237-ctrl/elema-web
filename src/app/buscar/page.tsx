import type { Metadata } from 'next';
import { ProductSearch } from '@/components/product-search';
import { products } from '@/data/products';

export const metadata: Metadata = { title: 'Buscar piezas' };

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#eee7dc] px-4 pb-24 pt-36 text-[#171717] sm:px-6 lg:px-8 lg:pt-44">
      <div className="mx-auto max-w-5xl">
        <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#777067]">Explorar</p>
        <h1 className="mt-5 font-serif text-5xl sm:text-6xl">Encuentra una pieza ELEMA.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#56514b]">Busca dentro de las colecciones por producto, categoría o materialidad.</p>
        <ProductSearch products={products} />
      </div>
    </main>
  );
}
