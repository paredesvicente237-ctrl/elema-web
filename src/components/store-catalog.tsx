'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';

const categories = ['Todas', 'Cocinas', 'Parrillas', 'Campanas'];

export function StoreCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('Todas');
  const visibleProducts = useMemo(
    () => category === 'Todas' ? products : products.filter((product) => product.category === category),
    [category, products],
  );

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 border-y border-black/15 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filtrar productos por categoría">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] transition ${category === item ? 'bg-[#171717] text-[#f6efe6]' : 'border border-black/15 text-[#56514b] hover:border-black/40'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#777067]">{visibleProducts.length} piezas</p>
      </div>

      <div className="mt-10 grid gap-x-7 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => (
          <article key={product.id} className="group">
            <Link href={`/producto/${product.slug}`} className="block overflow-hidden bg-[#171717]">
              <Image src={product.images[0]} alt={product.name} width={900} height={700} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
            </Link>
            <div className="mt-5 flex items-center justify-between border-t border-black/15 pt-4">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#777067]">{product.category}</p>
              <span className="text-[0.64rem] uppercase tracking-[0.22em] text-[#777067]">{product.demo ? 'Concepto' : product.tag}</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl text-[#171717]">{product.name}</h2>
            <p className="mt-3 min-h-14 text-sm leading-7 text-[#56514b]">{product.shortDescription}</p>
            <div className="mt-5 flex items-end justify-between gap-4">
              <p className="text-sm text-[#35312d]">
                {product.demo ? 'Proyecto a cotizar' : product.priceOnRequest ? 'Precio a solicitud' : `$${product.price?.toLocaleString('es-CL')} CLP`}
              </p>
              <Link href={`/producto/${product.slug}`} aria-label={`Ver ${product.name}`} className="inline-flex items-center gap-2 border-b border-black/25 pb-1 text-[0.68rem] uppercase tracking-[0.22em] transition hover:border-black">
                Ver pieza <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
