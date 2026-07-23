import type { Metadata } from 'next';
import { StoreCatalog } from '@/components/store-catalog';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Explora los elementos ELEM para parrillas, cocinas y campanas, disponibles o desarrollados a medida.',
};

export default function StorePage() {
  return (
    <main className="min-h-screen bg-[#eee7dc] px-4 pb-24 pt-36 text-[#171717] sm:px-6 lg:px-8 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#777067]">Elementos ELEM</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.96] sm:text-6xl">Elementos para elegir. Conjuntos para imaginar.</h1>
          </div>
          <p className="max-w-md text-base leading-8 text-[#56514b]">Elige un elemento disponible o comienza desde un concepto para desarrollar una solución propia.</p>
        </div>
        <StoreCatalog products={products} />
      </div>
    </main>
  );
}
