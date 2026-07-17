'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Product } from '@/data/products';

export function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es');
    if (!normalized) return products;
    return products.filter((product) => [product.name, product.category, product.shortDescription, ...product.materials]
      .some((value) => value.toLocaleLowerCase('es').includes(normalized)));
  }, [products, query]);

  return (
    <div className="mt-10">
      <label className="relative block">
        <span className="sr-only">Buscar productos</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#777067]" size={19} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border border-black/20 bg-[#f6efe6] py-4 pl-12 pr-4 text-[#171717] outline-none transition placeholder:text-[#8a837a] focus:border-black/50"
          placeholder="Buscar por nombre, colección o material"
          autoFocus
        />
      </label>
      <p className="mt-5 text-[0.68rem] uppercase tracking-[0.26em] text-[#777067]">{results.length} resultados</p>
      <div className="mt-5 divide-y divide-black/15 border-y border-black/15">
        {results.map((product) => (
          <Link key={product.id} href={`/producto/${product.slug}`} className="grid gap-3 py-6 transition hover:pl-2 sm:grid-cols-[0.3fr_1fr_auto] sm:items-center">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[#777067]">{product.category}</p>
            <div><h2 className="font-serif text-2xl">{product.name}</h2><p className="mt-1 text-sm text-[#56514b]">{product.shortDescription}</p></div>
            <span className="text-[0.68rem] uppercase tracking-[0.22em]">Ver pieza</span>
          </Link>
        ))}
        {results.length === 0 ? <div className="py-12 text-center text-[#56514b]">No encontramos piezas con ese término.</div> : null}
      </div>
    </div>
  );
}
