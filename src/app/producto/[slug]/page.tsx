import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] border border-elema-steel/20 bg-elema-soft">
            <Image src={product.images[0]} alt={product.name} width={1200} height={900} className="aspect-[4/3] w-full object-cover" priority />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.images.map((image, index) => (
              <div key={`${image}-${index}`} className="overflow-hidden rounded-[1.5rem] border border-elema-steel/20 bg-elema-graphite">
                <Image src={image} alt={`${product.name}, vista ${index + 1}`} width={900} height={700} className="aspect-[4/3] w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">{product.category}</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">{product.name}</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">{product.description}</p>
          <div className="mt-8 rounded-[1.5rem] border border-elema-steel/20 bg-elema-soft p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.28em] text-elema-steel">Precio</p>
              <p className="text-2xl font-semibold text-elema-warm">{product.priceOnRequest ? 'Precio a solicitud' : `CLP ${product.price?.toLocaleString('es-CL')}`}</p>
            </div>
            {product.priceOnRequest ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={`/contacto?producto=${product.slug}`} className="rounded-full bg-elema-warm px-5 py-3 text-center text-sm font-medium text-elema-black">Solicitar propuesta</Link>
                <Link href="/diseno-a-medida" className="rounded-full border border-elema-steel/40 px-5 py-3 text-center text-sm text-elema-warm">Diseñar mi espacio</Link>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/carrito" className="rounded-full bg-elema-warm px-5 py-3 text-center text-sm font-medium text-elema-black">Agregar al carrito</Link>
                <Link href="/checkout" className="rounded-full border border-elema-steel/40 px-5 py-3 text-center text-sm text-elema-warm">Ver carrito</Link>
              </div>
            )}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-elema-warm">Materiales</h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-elema-silver">{product.materials.map((material) => <li key={material}>{material}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-elema-warm">Dimensiones</h2>
              <p className="mt-3 text-sm leading-7 text-elema-silver">{product.dimensions}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-sm uppercase tracking-[0.3em] text-elema-warm">Características</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-elema-silver">{product.features.map((feature) => <li key={feature}>• {feature}</li>)}</ul>
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-elema-steel/20 bg-elema-soft p-6 text-sm leading-7 text-elema-silver">
            <p><span className="text-elema-warm">Tiempo estimado:</span> {product.estimatedTime}</p>
            <p className="mt-3"><span className="text-elema-warm">Despacho:</span> {product.shipping}</p>
            <p className="mt-3"><span className="text-elema-warm">Fabricación:</span> Corte, plegado, armado y soldadura definidos según la materialidad y configuración final.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
