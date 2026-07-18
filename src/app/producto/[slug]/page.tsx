import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { AddToCartButton } from '@/components/add-to-cart-button';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  const formattedPrice = product.price?.toLocaleString('es-CL');

  return (
    <main className="min-h-screen bg-[#eee7dc] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="contents lg:block lg:space-y-4">
          <div className="order-1 overflow-hidden bg-[#171717]">
            <Image src={product.images[0]} alt={product.name} width={1200} height={900} sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[4/3] w-full object-cover" priority />
          </div>
          {product.images.length > 1 ? (
            <div className="order-3 grid gap-4 sm:grid-cols-2">
              {product.images.slice(1).map((image, index) => (
                <div key={`${image}-${index}`} className="overflow-hidden bg-[#171717]">
                  <Image src={image} alt={`${product.name}, vista ${index + 2}`} width={900} height={700} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="order-2 lg:order-none lg:sticky lg:top-28 lg:self-start">
          <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#777067]">{product.category} · {product.tag}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] sm:text-6xl">{product.name}</h1>
          <p className="mt-7 text-base leading-8 text-[#56514b]">{product.description}</p>
          <div className="mt-9 border-y border-black/15 py-6">
            <div className="flex items-end justify-between gap-8">
              <p className="pb-1 text-[0.68rem] uppercase tracking-[0.28em] text-[#777067]">{product.demo ? 'Modalidad' : product.priceOnRequest ? 'Modalidad' : 'Precio del producto'}</p>
              {product.demo || product.priceOnRequest ? (
                <p className="max-w-[15rem] text-right text-sm font-medium uppercase tracking-[0.18em] text-[#24221f]">
                  {product.demo ? 'Proyecto a cotizar' : 'Precio a solicitud'}
                </p>
              ) : (
                <p className="flex shrink-0 items-baseline gap-2.5 text-[#171717]">
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#777067]">CLP</span>
                  <span className="text-[1.65rem] font-medium tracking-[-0.045em] tabular-nums sm:text-[1.8rem]">{formattedPrice}</span>
                </p>
              )}
            </div>
            {product.demo || product.priceOnRequest ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={`/contacto?producto=${product.slug}`} className="bg-[#171717] px-5 py-3 text-center text-xs uppercase tracking-[0.22em] text-[#f6efe6]">Cotizar esta pieza</Link>
                <Link href="/diseno-a-medida" className="border border-black/20 px-5 py-3 text-center text-xs uppercase tracking-[0.22em]">Diseñar mi espacio</Link>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton product={{ id: product.id, slug: product.slug, name: product.name, price: product.price!, customizable: product.customizable }} />
                <Link href="/carrito" className="border border-black/20 px-5 py-3 text-center text-xs uppercase tracking-[0.22em]">Ver carrito</Link>
              </div>
            )}
            {!product.demo && !product.priceOnRequest ? <p className="mt-4 text-xs leading-6 text-[#777067]">No se realizará un cobro en esta etapa. Confirmaremos disponibilidad, despacho y forma de pago antes de procesar la compra.</p> : null}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-[0.68rem] uppercase tracking-[0.3em] text-[#777067]">Materiales</h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#56514b]">{product.materials.map((material) => <li key={material}>{material}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-[0.68rem] uppercase tracking-[0.3em] text-[#777067]">Dimensiones</h2>
              <p className="mt-3 text-sm leading-7 text-[#56514b]">{product.dimensions}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-[0.68rem] uppercase tracking-[0.3em] text-[#777067]">Características</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-[#56514b]">{product.features.map((feature) => <li key={feature}>— {feature}</li>)}</ul>
          </div>
          <div className="mt-8 border-t border-black/15 pt-6 text-sm leading-7 text-[#56514b]">
            <p><span className="text-[#171717]">Tiempo estimado:</span> {product.estimatedTime}</p>
            <p className="mt-3"><span className="text-[#171717]">Despacho:</span> {product.shipping}</p>
            <p className="mt-3"><span className="text-[#171717]">Fabricación:</span> Corte, plegado, armado y soldadura definidos según la materialidad y configuración final.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
