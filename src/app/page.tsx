import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { availableProducts } from '@/data/products';
import { HeroCarousel } from '@/components/hero-carousel';
import { MotionController } from '@/components/motion-controller';
import { AddToCartButton } from '@/components/add-to-cart-button';

const collections = [
  { title: 'Cocinas', description: 'Composiciones de alto impacto para residencias y proyectos singulares.', href: '/colecciones/cocinas', image: '/images/elema-generated/cocina-costera-hero.webp', scene: 'coast' },
  { title: 'Parrillas', description: 'Arte funcional para exteriores, hosting y experiencias de fuego.', href: '/colecciones/parrillas', image: '/images/elema-generated/parrilla-montana-hero.webp', scene: 'fire' },
  { title: 'Campanas', description: 'Elementos escultóricos que sostienen la narrativa del espacio.', href: '/colecciones/campanas', image: '/images/elema-generated/campana-noctis-editorial.webp', scene: 'daylight' },
  { title: 'Soluciones a medida', description: 'Proyectos de arquitectura, mobiliario y fabricación especial.', href: '/diseno-a-medida', image: '/images/elema-generated/taller-precision-editorial.webp', scene: 'studio' },
];

const principles = [
  { number: '01', title: 'Diseño', detail: 'Proporciones que ordenan el espacio.' },
  { number: '02', title: 'Ingeniería', detail: 'Soluciones pensadas para durar.' },
  { number: '03', title: 'Fabricación', detail: 'Materia trabajada con precisión.' },
];

const quickLinks = [
  { number: '01', label: 'Comprar online', detail: 'Piezas disponibles', href: '/tienda' },
  { number: '02', label: 'Cocinas', detail: 'Ver colección', href: '/colecciones/cocinas' },
  { number: '03', label: 'Parrillas', detail: 'Ver colección', href: '/colecciones/parrillas' },
  { number: '04', label: 'Diseño a medida', detail: 'Cotizar proyecto', href: '/diseno-a-medida' },
];

const materials = [
  { title: 'Acero inoxidable', description: 'Resistencia, higiene y terminaciones sobrias para cocinas, campanas y equipamiento de uso intensivo.' },
  { title: 'Acero al carbono', description: 'Estructura y presencia material para piezas especiales, parrillas y soluciones arquitectónicas.' },
  { title: 'Metales especiales', description: 'Aluminio, cobre, bronce y planchas perforadas o diamantadas según el lenguaje del proyecto.' },
  { title: 'Procesos de precisión', description: 'Corte, plegado, curvado y soldadura para convertir una intención de diseño en una pieza fabricable.' },
];

export default function HomePage() {
  const featured = availableProducts[0];

  return (
    <main className="overflow-x-hidden bg-[#f4f1ea] text-[#171717]">
      <MotionController />
      <HeroCarousel />

      <nav className="border-b border-black/10 bg-white" aria-label="Accesos principales">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item, index) => (
            <Link key={item.href} href={item.href} data-reveal data-reveal-delay={index * 80} className="group flex items-center justify-between border-b border-black/10 px-5 py-6 transition-colors hover:bg-[#f4f1ea] sm:border-r lg:border-b-0 lg:px-7">
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-[#8a837a]">{item.number} · {item.detail}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#171717]">{item.label}</p>
              </div>
              <ArrowUpRight size={17} className="text-[#777067] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" />
            </Link>
          ))}
        </div>
      </nav>

      <section id="comprar" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Link href={`/producto/${featured.slug}`} data-reveal="left" data-ambient="fire" className="ambient-frame group relative min-h-[440px] overflow-hidden bg-[#e9e4dc] lg:min-h-[620px]">
            <Image src={featured.images[0]} alt={featured.name} fill sizes="(min-width: 1024px) 56vw, 100vw" className="ambient-media ambient-media--push object-cover" />
            <span className="ambient-light ambient-light--fire" aria-hidden="true" />
            <span className="ambient-particles ambient-particles--embers" aria-hidden="true" />
            <div className="absolute left-5 top-5 z-10 bg-white px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.26em] text-[#171717]">Disponible online</div>
            <span className="absolute bottom-5 right-5 z-10 grid h-12 w-12 place-items-center bg-white text-black"><ArrowUpRight size={18} /></span>
          </Link>

          <div data-reveal="right" className="lg:px-8">
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-[#777067]">Compra directa · Parrillas</p>
            <h2 className="mt-5 font-serif text-4xl leading-[0.98] text-[#171717] sm:text-5xl">{featured.name}</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#56514b]">{featured.shortDescription} Una pieza ELEMA disponible para comprar directamente en nuestra tienda.</p>

            <div className="mt-8 flex items-end justify-between border-y border-black/12 py-5">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#8a837a]">Precio del producto</p>
                <p className="mt-2 flex items-baseline gap-2 text-[#171717]"><span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#777067]">CLP</span><span className="text-3xl font-medium tracking-[-0.04em] tabular-nums">{featured.price?.toLocaleString('es-CL')}</span></p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-[#4d7254] shadow-[0_0_0_5px_rgba(77,114,84,0.12)]" aria-label="Disponible" />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={{ id: featured.id, slug: featured.slug, name: featured.name, price: featured.price!, customizable: featured.customizable }} />
              <Link href={`/producto/${featured.slug}`} className="inline-flex items-center justify-center gap-2 border border-black/20 px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#171717] transition hover:bg-[#f4f1ea]">Ver detalles <ArrowRight size={14} /></Link>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#777067]">No se realizará un cobro al agregar al carrito. Confirmaremos disponibilidad, despacho y forma de pago antes de procesar la compra.</p>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-black/10 bg-[#e8e2d8] py-4" aria-hidden="true">
        <div className="material-marquee flex w-max items-center whitespace-nowrap text-[0.62rem] uppercase tracking-[0.35em] text-[#655f57]">
          {[...materials, ...materials].map((material, index) => <span key={`${material.title}-${index}`} className="flex items-center"><span className="px-8">{material.title}</span><span className="h-1 w-1 rounded-full bg-[#777067]" /></span>)}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 border-t border-[#1b1b1b]/10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div data-reveal="left">
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7a7269]">Más que productos. Presencia.</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#161616] sm:text-4xl">
              ELEMA combina diseño, ingeniería y fabricación para transformar espacios con precisión y autoridad.
            </h2>
          </div>
          <p data-reveal="right" className="max-w-xl text-base leading-8 text-[#4a453f] sm:text-lg">
            Cada pieza se concibe como una intervención sobria y poderosa: materialidad, proporción, fuego y presencia.
          </p>
        </div>

        <div className="mt-16 grid border-y border-[#1b1b1b]/15 sm:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.number} data-reveal data-reveal-delay={Number(principle.number) * 80} className="group grid grid-cols-[auto_1fr] gap-5 border-b border-[#1b1b1b]/15 py-7 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <span className="font-serif text-2xl text-[#9a9186] transition-colors group-hover:text-[#171717]">{principle.number}</span>
              <div className="sm:mt-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-[#171717]">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#655f57]">{principle.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div data-reveal className="mb-8 flex items-end justify-between border-b border-[#1b1b1b]/15 pb-5">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.36em] text-[#7a7269]">Áreas de trabajo</p>
            <h2 className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">Colecciones y soluciones</h2>
          </div>
          <Link href="/colecciones" className="hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-[#4a453f] transition hover:text-black sm:inline-flex">
            Ver todas <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Link href={collections[0].href} data-reveal="left" data-ambient={collections[0].scene} className="ambient-frame group relative min-h-[500px] overflow-hidden border border-white/10 bg-[#14161d] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
            <Image src={collections[0].image} alt="" fill sizes="(min-width: 1280px) 55vw, 100vw" className="ambient-media ambient-media--drift object-cover" />
            <span className={`ambient-light ambient-light--${collections[0].scene}`} aria-hidden="true" />
            <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(10,12,16,0.9)_0%,rgba(10,12,16,0.48)_55%,rgba(10,12,16,0.2)_100%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
              <div className="flex items-center justify-between border-b border-white/25 pb-4 text-[0.68rem] uppercase tracking-[0.34em] text-[#cfc7bc]">
                <span>Colección</span><span className="font-serif text-base tracking-normal">01</span>
              </div>
              <div>
              <h3 className="mt-4 font-serif text-3xl text-[#f6efe6] sm:text-4xl">{collections[0].title}</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-[#d8d0c4]">{collections[0].description}</p>
                <span className="mt-7 inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-white">Explorar <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </div>
          </Link>

          <div data-reveal="right" className="grid gap-6">
            {collections.slice(1).map((collection, index) => (
              <Link key={collection.title} href={collection.href} data-ambient={collection.scene} className="ambient-frame group relative min-h-[226px] overflow-hidden border border-white/10 bg-[#151922] shadow-[0_12px_45px_rgba(0,0,0,0.14)]">
                <Image src={collection.image} alt="" fill sizes="(min-width: 1280px) 45vw, 100vw" className="ambient-media ambient-media--drift object-cover" />
                <span className={`ambient-light ambient-light--${collection.scene}`} aria-hidden="true" />
                {collection.scene === 'studio' ? <span className="ambient-particles ambient-particles--sparks" aria-hidden="true" /> : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,16,0.18)_0%,rgba(10,12,16,0.8)_100%)]" />
                <div className="relative z-10 flex h-full flex-col justify-between p-7">
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#cfc7bc]">
                    <span>{index === 2 ? 'Servicio' : 'Colección'}</span><span className="font-serif text-sm tracking-normal">0{index + 2}</span>
                  </div>
                  <div>
                  <h3 className="mt-3 font-serif text-2xl text-[#f6efe6]">{collection.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-[#d8d0c4]">{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9e4dc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal="left" data-ambient="studio" className="ambient-frame relative min-h-[460px] overflow-hidden lg:min-h-[620px]">
            <Image src="/images/elema-generated/taller-precision-editorial.webp" alt="Trabajo de precisión sobre una pieza de acero" fill sizes="(min-width: 1024px) 58vw, 100vw" className="ambient-media ambient-media--detail object-cover object-center" />
            <span className="ambient-light ambient-light--studio" aria-hidden="true" />
            <span className="ambient-particles ambient-particles--sparks" aria-hidden="true" />
          </div>
          <div data-reveal="right" className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:p-14">
            <p className="text-[0.68rem] uppercase tracking-[0.36em] text-[#777067]">Del plano a la materia</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">Diseño que entiende cómo se fabrica.</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#56514b]">Cada unión, pliegue y terminación se resuelve como parte de una misma arquitectura. Precisión técnica sin perder presencia.</p>
            <Link href="/diseno-a-medida" className="mt-9 inline-flex w-fit items-center gap-3 bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.26em] text-white transition hover:bg-[#34312d]">
              Conocer el proceso <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div data-reveal="left" className="flex flex-col justify-center">
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-[#777067]">Diseño a medida</p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl text-[#171717] sm:text-4xl">Un proceso de arquitectura, ingeniería y fabricación pensado para espacios singulares.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#56514b]">
              Desde la primera conversación hasta la instalación, cada proyecto se desarrolla con precisión, soberbia materialidad y una lectura arquitectónica inequívoca.
            </p>
            <Link href="/diseno-a-medida" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.26em] text-[#171717] transition hover:text-[#777067]">
              Comenzar un proyecto <ArrowRight size={14} />
            </Link>
          </div>
          <div data-reveal="right" data-ambient="daylight" className="ambient-frame relative overflow-hidden bg-[#e9e4dc]">
            <Image src="/images/elema-generated/instalacion-metalica.webp" alt="Instalación arquitectónica de mobiliario metálico" width={1672} height={941} className="ambient-media ambient-media--push h-full w-full object-cover" />
            <span className="ambient-light ambient-light--daylight" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal="left">
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7a7269]">Materiales</p>
            <h2 className="mt-4 font-serif text-3xl text-[#171717] sm:text-4xl">Acero, piedra, fuego y precisión en cada terminación.</h2>
            <div data-ambient="material" className="ambient-frame relative mt-8 overflow-hidden bg-[#171717]">
              <Image src="/images/elema-generated/material-acero-piedra.webp" alt="Encuentro de acero cepillado y piedra clara" width={1774} height={887} className="ambient-media ambient-media--detail aspect-[2/1] w-full object-cover" />
              <span className="ambient-light ambient-light--material" aria-hidden="true" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {materials.map((material, index) => (
              <div key={material.title} data-reveal data-reveal-delay={index * 90} className="group border border-[#161616]/10 bg-white p-6 transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
                <div className="mb-5 h-1 w-12 origin-left bg-[#171717] transition-transform duration-500 group-hover:scale-x-150" />
                <h3 className="text-xl font-medium text-[#171717]">{material.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4a453f]">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="border border-black/10 bg-white p-6 text-[#171717] shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div data-reveal="left">
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#777067]">Profesionales</p>
              <h2 className="mt-4 max-w-xl font-serif text-3xl sm:text-4xl">Para arquitectos, constructoras, diseñadores e inmobiliarias de alta exigencia.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#56514b]">
                Una colaboración técnica, discreta y precisa para proyectos que no admiten improvisación.
              </p>
              <Link href="/profesionales" className="mt-8 inline-flex items-center gap-2 border border-black/20 px-5 py-3 text-sm uppercase tracking-[0.25em] text-[#171717] transition hover:bg-[#f4f1ea]">
                Trabajar con ELEMA <ArrowRight size={14} />
              </Link>
            </div>
            <div data-reveal="right" data-ambient="studio" className="ambient-frame relative overflow-hidden bg-[#e9e4dc]">
              <Image src="/images/elema-generated/colaboracion-arquitectos.webp" alt="Arquitectos y especialistas revisando detalles de fabricación" width={1536} height={1024} className="h-full w-full object-cover" />
              <span className="ambient-light ambient-light--studio" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div data-ambient="daylight" className="ambient-frame relative overflow-hidden bg-[#13161d]">
          <Image src="/images/elema-generated/isla-monumental.webp" alt="" fill sizes="100vw" className="ambient-media ambient-media--push object-cover object-center opacity-55" />
          <span className="ambient-light ambient-light--daylight" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,0.83)_0%,rgba(10,12,16,0.62)_100%)]" />
          <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-6 py-16 sm:px-8 lg:px-12">
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#c8c0b6]">Cierre</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl text-[#f6efe6] sm:text-4xl">Tu espacio puede decir más.</h2>
            <Link href="/contacto" className="mt-8 inline-flex w-fit items-center gap-2 bg-white px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#171717] transition-colors hover:bg-[#f4f1ea]">
              Solicitar asesoría privada <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
