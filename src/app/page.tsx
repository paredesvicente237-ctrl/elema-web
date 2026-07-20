import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { availableProducts } from '@/data/products';
import { HeroCarousel } from '@/components/hero-carousel';
import { MotionController } from '@/components/motion-controller';
import { AddToCartButton } from '@/components/add-to-cart-button';

const projectStages = [
  { number: '01', title: 'Conversación', detail: 'El espacio, el uso y la intención material definen el punto de partida.' },
  { number: '02', title: 'Desarrollo', detail: 'Diseño e ingeniería se resuelven como una sola decisión.' },
  { number: '03', title: 'Fabricación', detail: 'Cada unión, pliegue y terminación responde al proyecto.' },
];

const capabilities = [
  'Corte y plegado',
  'Curvado',
  'Armado y soldadura',
  'Terminaciones metálicas',
];

export default function HomePage() {
  const featured = availableProducts[0];

  return (
    <main className="overflow-x-hidden bg-[#f4f1ea] text-[#171717]">
      <MotionController />
      <HeroCarousel />

      <section id="pieza-emblematica" className="scroll-mt-20 bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="flex items-end justify-between border-b border-black/15 pb-5">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#80786f]">01 · Pieza emblemática</p>
              <h2 className="mt-3 font-serif text-4xl leading-none sm:text-5xl">Arquitectura para el fuego.</h2>
            </div>
            <Link href="/tienda" className="hidden items-center gap-2 text-[0.64rem] uppercase tracking-[0.26em] text-[#59534d] transition-colors hover:text-black sm:inline-flex">
              Ver todas las piezas <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:items-center">
            <Link href={`/producto/${featured.slug}`} data-reveal data-ambient="fire" className="ambient-frame relative min-h-[500px] overflow-hidden bg-[#171717] lg:min-h-[700px]">
              <Image src={featured.images[0]} alt={featured.name} fill sizes="(min-width: 1024px) 58vw, 100vw" className="ambient-media ambient-media--push object-cover" />
              <span className="ambient-light ambient-light--fire" aria-hidden="true" />
              <span className="ambient-particles ambient-particles--embers" aria-hidden="true" />
              <span className="absolute left-5 top-5 z-10 bg-[#f4f1ea] px-4 py-2 text-[0.58rem] font-medium uppercase tracking-[0.26em] text-[#171717]">Pieza disponible</span>
              <span className="absolute bottom-5 right-5 z-10 grid h-12 w-12 place-items-center bg-[#f4f1ea] text-black"><ArrowUpRight size={17} /></span>
            </Link>

            <div data-reveal className="lg:px-7">
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#80786f]">Colección fuego · Lumen</p>
              <h3 className="mt-5 max-w-lg font-serif text-5xl leading-[0.92] sm:text-6xl">{featured.name}</h3>
              <p className="mt-7 max-w-lg text-base leading-8 text-[#56514b]">
                {featured.description} Una composición en acero inoxidable, piedra y cromo.
              </p>

              <dl className="mt-9 grid grid-cols-2 border-y border-black/15 py-5 text-sm">
                <div className="border-r border-black/15 pr-5">
                  <dt className="text-[0.58rem] uppercase tracking-[0.25em] text-[#8a837a]">Dimensiones</dt>
                  <dd className="mt-2 text-[#332f2b]">{featured.dimensions}</dd>
                </div>
                <div className="pl-5">
                  <dt className="text-[0.58rem] uppercase tracking-[0.25em] text-[#8a837a]">Material principal</dt>
                  <dd className="mt-2 text-[#332f2b]">{featured.materials[0]}</dd>
                </div>
              </dl>

              <div className="mt-7 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[0.58rem] uppercase tracking-[0.25em] text-[#8a837a]">Precio de la pieza</p>
                  <p className="mt-2 flex items-baseline gap-2"><span className="text-[0.58rem] uppercase tracking-[0.2em] text-[#777067]">CLP</span><span className="text-3xl font-medium tracking-[-0.04em] tabular-nums">{featured.price?.toLocaleString('es-CL')}</span></p>
                </div>
                <span className="h-2 w-2 rounded-full bg-[#4d7254]" aria-label="Disponible" />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton product={{ id: featured.id, slug: featured.slug, name: featured.name, price: featured.price!, customizable: featured.customizable }} />
                <Link href={`/producto/${featured.slug}`} className="inline-flex items-center justify-center gap-2 border border-black/20 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] transition-colors hover:bg-[#f4f1ea]">Ver especificaciones <ArrowRight size={13} /></Link>
              </div>
              <p className="mt-5 max-w-lg text-xs leading-6 text-[#777067]">La disponibilidad, el despacho y la forma de pago se confirman personalmente antes de procesar la compra.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e3d9] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-t border-black/15 pt-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div data-reveal>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#777067]">02 · Proyectos privados</p>
              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.94] sm:text-6xl">Nada se adapta. Todo se resuelve.</h2>
            </div>
            <div data-reveal className="lg:justify-self-end">
              <p className="max-w-xl text-base leading-8 text-[#56514b]">Cada proyecto parte del espacio, la materialidad y sus condiciones reales. Diseño, ingeniería y fabricación avanzan como una misma disciplina.</p>
              <Link href="/diseno-a-medida" className="mt-7 inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.25em] text-[#171717] transition-colors hover:text-[#6c655e]">Iniciar un proyecto privado <ArrowRight size={13} /></Link>
            </div>
          </div>

          <div data-reveal data-ambient="daylight" className="ambient-frame relative mt-14 min-h-[540px] overflow-hidden bg-[#191919] lg:min-h-[720px]">
            <Image src="/images/elema-generated/isla-monumental.webp" alt="Isla metálica de diseño arquitectónico" fill sizes="100vw" className="ambient-media ambient-media--push object-cover object-center" />
            <span className="ambient-light ambient-light--daylight" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 z-10 max-w-sm text-[0.58rem] uppercase tracking-[0.28em] text-white/75 sm:bottom-8 sm:left-8">Cocinas · Islas · Mobiliario metálico · Piezas especiales</p>
          </div>

          <div className="mt-10 grid border-y border-black/15 sm:grid-cols-3">
            {projectStages.map((stage) => (
              <div key={stage.number} data-reveal className="grid grid-cols-[auto_1fr] gap-5 border-b border-black/15 py-7 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                <span className="font-serif text-2xl text-[#968d83]">{stage.number}</span>
                <div className="sm:mt-8">
                  <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.27em]">{stage.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#625c55]">{stage.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div data-reveal data-ambient="studio" className="ambient-frame relative min-h-[520px] overflow-hidden bg-[#171717] lg:min-h-[720px]">
              <Image src="/images/elema-generated/taller-precision-editorial.webp" alt="Trabajo de precisión sobre una pieza de acero" fill sizes="(min-width: 1024px) 57vw, 100vw" className="ambient-media ambient-media--detail object-cover" />
              <span className="ambient-light ambient-light--studio" aria-hidden="true" />
              <span className="ambient-particles ambient-particles--sparks" aria-hidden="true" />
            </div>

            <div data-reveal className="lg:px-7 lg:pt-6">
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#80786f]">03 · Materia y fabricación</p>
              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.94] sm:text-6xl">La precisión también se ve.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-[#56514b]">El diseño se contrasta con materiales, tolerancias, uniones y condiciones reales de fabricación antes de convertirse en una pieza.</p>

              <ul className="mt-10 border-t border-black/15">
                {capabilities.map((capability, index) => (
                  <li key={capability} className="flex items-center justify-between border-b border-black/15 py-4 text-sm text-[#35312d]"><span>{capability}</span><span className="font-serif text-lg text-[#9a9186]">0{index + 1}</span></li>
                ))}
              </ul>

              <div data-ambient="material" className="ambient-frame relative mt-10 overflow-hidden bg-[#171717]">
                <Image src="/images/elema-generated/material-acero-piedra.webp" alt="Encuentro de acero cepillado y piedra clara" width={1774} height={887} className="ambient-media ambient-media--detail aspect-[2/1] w-full object-cover" />
                <span className="ambient-light ambient-light--material" aria-hidden="true" />
              </div>
              <Link href="/nosotros" className="mt-8 inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.25em] transition-colors hover:text-[#6c655e]">Conocer el estudio <ArrowRight size={13} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1ea] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div data-reveal data-ambient="daylight" className="ambient-frame relative mx-auto min-h-[560px] max-w-7xl overflow-hidden bg-[#111] text-white lg:min-h-[680px]">
          <Image src="/images/elema-generated/campana-noctis-editorial.webp" alt="" fill sizes="100vw" className="ambient-media ambient-media--push object-cover object-center opacity-75" />
          <span className="ambient-light ambient-light--daylight" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,9,0.82)_0%,rgba(7,8,9,0.48)_55%,rgba(7,8,9,0.16)_100%)]" />
          <div className="relative z-10 flex min-h-[560px] flex-col justify-between p-7 sm:p-10 lg:min-h-[680px] lg:p-14">
            <div className="flex items-center justify-between border-b border-white/25 pb-5 text-[0.58rem] uppercase tracking-[0.28em] text-white/65">
              <span>04 · Asesoría privada</span><span>Santiago, Chile</span>
            </div>
            <div className="max-w-3xl">
              <h2 className="font-serif text-5xl leading-[0.92] sm:text-7xl">Una conversación antes que un catálogo.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#ded7cc]">Cuéntanos sobre el espacio, el uso y la materialidad que buscas. ELEMA revisará los antecedentes para definir el siguiente paso.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contacto" className="inline-flex items-center justify-center gap-3 bg-[#f4f1ea] px-6 py-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#171717] transition-colors hover:bg-white">Solicitar una conversación <ArrowRight size={13} /></Link>
                <Link href="/profesionales" className="inline-flex items-center justify-center border border-white/30 px-6 py-4 text-[0.68rem] uppercase tracking-[0.24em] transition-colors hover:bg-white/10">Acceso profesionales</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
