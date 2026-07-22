import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { products, type Product } from '@/data/products';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { MotionController } from '@/components/motion-controller';
import { ProductGallery, type ProductGalleryImage } from '@/components/product-gallery';

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

function ProductTechnicalSheet({ product, variant }: { product: Product; variant: 'desktop' | 'mobile' }) {
  const headingId = `technical-sheet-${product.id}-${variant}`;

  return (
    <section aria-labelledby={headingId} className="mt-9">
      <div className="flex items-end justify-between border-b border-black/15 pb-4">
        <h2 id={headingId} className="text-[0.62rem] uppercase tracking-[0.28em] text-[#554f48]">Ficha de fabricación</h2>
        <span className="text-right font-serif text-lg text-[#948b80] sm:text-xl">{product.demo ? 'ELEMA / PIEZA A COTIZAR' : `ELEMA / ${product.id.toUpperCase()}`}</span>
      </div>
      <dl className="divide-y divide-black/10 text-sm">
        <div className="grid grid-cols-[7rem_1fr] gap-5 py-4">
          <dt className="text-[0.58rem] uppercase tracking-[0.22em] text-[#81786e]">Dimensiones</dt>
          <dd className="text-right text-[#3f3a35]">{product.dimensions}</dd>
        </div>
        <div className="grid grid-cols-[7rem_1fr] gap-5 py-4">
          <dt className="text-[0.58rem] uppercase tracking-[0.22em] text-[#81786e]">Materiales</dt>
          <dd className="text-right leading-6 text-[#3f3a35]">{product.materials.join(' · ')}</dd>
        </div>
        <div className="grid grid-cols-[7rem_1fr] gap-5 py-4">
          <dt className="text-[0.58rem] uppercase tracking-[0.22em] text-[#81786e]">Terminación</dt>
          <dd className="text-right leading-6 text-[#3f3a35]">{product.finishes.join(' · ')}</dd>
        </div>
        <div className="grid grid-cols-[7rem_1fr] gap-5 py-4">
          <dt className="text-[0.58rem] uppercase tracking-[0.22em] text-[#81786e]">Entrega</dt>
          <dd className="text-right leading-6 text-[#3f3a35]">{product.estimatedTime}</dd>
        </div>
      </dl>
    </section>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  const formattedPrice = product.price?.toLocaleString('es-CL');
  const canPurchase = !product.demo && !product.priceOnRequest && typeof product.price === 'number';
  const isLumen = product.slug === 'parrilla-mediterranea-lumen';
  const collectionSlug = product.category === 'Parrillas' ? 'parrillas' : product.category === 'Cocinas' ? 'cocinas' : 'campanas';
  const galleryImages: ProductGalleryImage[] = [
    ...product.images.map((image, index) => ({
      src: image,
      alt: index === 0 ? product.name : `${product.name}, vista ${index + 1}`,
      label: product.demo ? 'Referencia de configuración' : index === 0 ? 'La pieza' : `Vista ${String(index + 1).padStart(2, '0')}`,
      caption: product.demo ? 'Visual referencial ELEMA' : index === 0 ? 'Vista principal' : 'Detalle de la pieza',
    })),
    ...(isLumen ? [
      {
        src: '/images/elema-generated/parrilla-montana-hero.webp',
        alt: 'Parrilla arquitectónica integrada en una terraza de montaña al atardecer',
        label: 'Atmósfera de colección',
        caption: 'El fuego como centro del espacio exterior',
      },
      {
        src: '/images/elema-generated/material-acero-piedra.webp',
        alt: 'Encuentro de acero cepillado y piedra clara',
        label: 'Referencia material',
        caption: 'Acero, piedra y precisión en el encuentro',
      },
    ] satisfies ProductGalleryImage[] : []),
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      <MotionController />

      <div className="mx-auto max-w-[1480px] px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pb-32 lg:pt-32">
        <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 border-b border-black/12 pb-5 text-[0.58rem] uppercase tracking-[0.24em] text-[#746d64]">
          <Link href="/tienda" className="transition-colors hover:text-black">Piezas</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href={`/colecciones/${collectionSlug}`} className="transition-colors hover:text-black">{product.category}</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span aria-current="page" className="text-[#27231f]">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.17fr)_minmax(360px,0.63fr)] xl:gap-20">
          <div data-reveal="left">
            <ProductGallery images={galleryImages} productName={product.name} />
          </div>

          <aside data-reveal="right" className="order-first lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center justify-between gap-5">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#746d64]">Colección {product.category}</p>
              <p className={`flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] ${canPurchase ? 'text-[#3f5d43]' : 'text-[#746d64]'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${canPurchase ? 'bg-[#55765b]' : 'bg-[#948b80]'}`} aria-hidden="true" /> {canPurchase ? product.tag : 'A cotizar'}
              </p>
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[0.9] sm:text-6xl lg:text-[4.5rem]">{product.name}</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#575149]">{product.description}</p>

            <div className="mt-9 border-y border-black/15 py-6">
              <div className="flex items-end justify-between gap-6">
                <p className="pb-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#746d64]">{canPurchase ? 'Precio de la pieza' : 'Modalidad'}</p>
                {canPurchase ? (
                  <p className="flex shrink-0 items-baseline gap-2.5 text-[#171717]">
                    <span className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[#746d64]">CLP</span>
                    <span className="text-[1.9rem] font-medium tracking-[-0.05em] tabular-nums">{formattedPrice}</span>
                  </p>
                ) : (
                  <p className="max-w-[15rem] text-right text-sm font-medium uppercase tracking-[0.18em] text-[#24221f]">{product.demo ? 'Proyecto a cotizar' : 'Precio a solicitud'}</p>
                )}
              </div>

              {canPurchase ? (
                <div className="mt-6 space-y-3">
                  <AddToCartButton className="min-h-12 w-full" product={{ id: product.id, slug: product.slug, name: product.name, price: product.price!, customizable: product.customizable }} />
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/carrito" className="inline-flex min-h-12 items-center justify-center border border-black/20 px-4 text-center text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:bg-white">Ver carrito</Link>
                    <Link href={`/contacto?producto=${product.slug}`} className="inline-flex min-h-12 items-center justify-center border border-black/20 px-4 text-center text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:bg-white">Consultar</Link>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link href={`/contacto?producto=${product.slug}`} className="inline-flex min-h-12 items-center justify-center bg-[#171717] px-5 text-center text-[0.65rem] uppercase tracking-[0.2em] text-[#f6efe6]">Cotizar esta pieza</Link>
                  <Link href="/diseno-a-medida" className="inline-flex min-h-12 items-center justify-center border border-black/20 px-5 text-center text-[0.65rem] uppercase tracking-[0.2em]">Diseñar mi espacio</Link>
                </div>
              )}

              {canPurchase ? (
                <div className="mt-5 flex gap-3 text-xs leading-6 text-[#6b645c]">
                  <Check size={14} className="mt-1 shrink-0 text-[#55765b]" aria-hidden="true" />
                  <p>La disponibilidad, el despacho y la forma de pago se confirman personalmente antes de procesar la compra.</p>
                </div>
              ) : null}
            </div>

            <div className="hidden lg:block"><ProductTechnicalSheet product={product} variant="desktop" /></div>
          </aside>

          <div className="lg:hidden"><ProductTechnicalSheet product={product} variant="mobile" /></div>
        </div>
      </div>

      <section className="border-y border-black/10 bg-[#ece6dc] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div data-reveal="left" className="lg:sticky lg:top-28">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#746d64]">Presencia y función</p>
              <h2 className="mt-5 max-w-lg font-serif text-5xl leading-[0.92] sm:text-6xl">{product.category === 'Parrillas' ? 'El fuego ordena el espacio.' : 'La materia ordena el espacio.'}</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-[#575149]">{product.name} reúne una materialidad precisa y una escala arquitectónica para convertir el uso y el encuentro en una misma escena.</p>
              <Link href={`/colecciones/${collectionSlug}`} className="mt-8 inline-flex items-center gap-3 border-b border-black/30 pb-2 text-[0.65rem] uppercase tracking-[0.22em] transition-colors hover:border-black">
                Explorar la colección <ArrowRight size={13} />
              </Link>
            </div>

            <div data-reveal="right" className="border-t border-black/15">
              {product.features.map((feature, index) => (
                <div key={feature} className="grid grid-cols-[3rem_1fr] gap-5 border-b border-black/15 py-7 sm:grid-cols-[5rem_1fr]">
                  <span className="font-serif text-xl text-[#948b80]">0{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-[#302c28]">{feature}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-[#625b53]">Definido en relación con la materialidad, la configuración de la pieza y su contexto de uso.</p>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[3rem_1fr] gap-5 border-b border-black/15 py-7 sm:grid-cols-[5rem_1fr]">
                <span className="font-serif text-xl text-[#948b80]">04</span>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-[#302c28]">Despacho coordinado</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-[#625b53]">{product.shipping}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div data-reveal className="mx-auto grid max-w-7xl gap-10 border-t border-black/15 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#746d64]">Asesoría privada</p>
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.92] sm:text-6xl">Antes de decidir, conversemos sobre el espacio.</h2>
          </div>
          <Link href={`/contacto?producto=${product.slug}`} className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#171717] px-7 text-[0.68rem] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#303030]">
            Solicitar una conversación <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
