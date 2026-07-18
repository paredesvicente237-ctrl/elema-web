import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { availableProducts } from '@/data/products';
import { HeroCarousel } from '@/components/hero-carousel';

const collections = [
  { title: 'Cocinas', description: 'Composiciones de alto impacto para residencias y proyectos singulares.', href: '/colecciones/cocinas', image: '/images/elema-generated/cocina-costera-hero.webp' },
  { title: 'Parrillas', description: 'Arte funcional para exteriores, hosting y experiencias de fuego.', href: '/colecciones/parrillas', image: '/images/elema-generated/parrilla-montana-hero.webp' },
  { title: 'Campanas', description: 'Elementos escultóricos que sostienen la narrativa del espacio.', href: '/colecciones/campanas', image: '/images/elema-generated/campana-noctis-editorial.webp' },
  { title: 'Soluciones a medida', description: 'Proyectos de arquitectura, mobiliario y fabricación especial.', href: '/diseno-a-medida', image: '/images/elema-generated/taller-precision-editorial.webp' },
];

const principles = [
  { number: '01', title: 'Diseño', detail: 'Proporciones que ordenan el espacio.' },
  { number: '02', title: 'Ingeniería', detail: 'Soluciones pensadas para durar.' },
  { number: '03', title: 'Fabricación', detail: 'Materia trabajada con precisión.' },
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
    <main className="overflow-x-hidden bg-[#efe8dc] text-[#171717]">
      <HeroCarousel />

      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 border-t border-[#1b1b1b]/10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7a7269]">Más que productos. Presencia.</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#161616] sm:text-4xl">
              ELEMA combina diseño, ingeniería y fabricación para transformar espacios con precisión y autoridad.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[#4a453f] sm:text-lg">
            Cada pieza se concibe como una intervención sobria y poderosa: materialidad, proporción, fuego y presencia.
          </p>
        </div>

        <div className="mt-16 grid border-y border-[#1b1b1b]/15 sm:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.number} className="group grid grid-cols-[auto_1fr] gap-5 border-b border-[#1b1b1b]/15 py-7 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <span className="font-serif text-2xl text-[#9a9186] transition-colors group-hover:text-[#171717]">{principle.number}</span>
              <div className="sm:mt-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-[#171717]">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#655f57]">{principle.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between border-b border-[#1b1b1b]/15 pb-5">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.36em] text-[#7a7269]">Áreas de trabajo</p>
            <h2 className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">Colecciones y soluciones</h2>
          </div>
          <Link href="/colecciones" className="hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-[#4a453f] transition hover:text-black sm:inline-flex">
            Ver todas <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Link href={collections[0].href} className="group relative min-h-[500px] overflow-hidden border border-white/10 bg-[#14161d] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
            <Image src={collections[0].image} alt="" fill sizes="(min-width: 1280px) 55vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
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

          <div className="grid gap-6">
            {collections.slice(1).map((collection, index) => (
              <Link key={collection.title} href={collection.href} className="group relative min-h-[226px] overflow-hidden border border-white/10 bg-[#151922] shadow-[0_12px_45px_rgba(0,0,0,0.14)]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${collection.image}')` }} />
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

      <section className="reveal-on-scroll relative isolate min-h-[620px] overflow-hidden bg-[#0b0c0f] text-[#f6efe6]">
        <Image src="/images/elema-generated/taller-precision-editorial.webp" alt="Trabajo de precisión sobre una pieza de acero" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,11,0.9)_0%,rgba(8,9,11,0.62)_40%,rgba(8,9,11,0.12)_75%)]" />
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-[0.72rem] uppercase tracking-[0.38em] text-[#b8afa4]">Del plano a la materia</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Diseño que entiende cómo se fabrica.</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#d8d0c4]">Cada unión, pliegue y terminación se resuelve como parte de una misma arquitectura. Precisión técnica sin perder presencia.</p>
            <Link href="/diseno-a-medida" className="mt-9 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-xs uppercase tracking-[0.3em] transition hover:border-white">
              Conocer el proceso <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2.2rem] border border-[#1c2027]/10 bg-[linear-gradient(145deg,#f9efe2_0%,#efe2cf_100%)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.06)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7a7269]">Producto protagonista</p>
              <h2 className="mt-4 font-serif text-3xl text-[#171717] sm:text-4xl">{featured.name}</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-[#4a453f]">
                {featured.shortDescription} Una pieza disponible que lleva el lenguaje material de ELEMA al centro de la experiencia exterior.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-sm uppercase tracking-[0.25em] text-[#7a7269]">${featured.price?.toLocaleString('es-CL')} CLP</p>
              <Link href={`/producto/${featured.slug}`} className="inline-flex items-center gap-2 border border-[#171717]/15 bg-[#17181d] px-5 py-3 text-sm uppercase tracking-[0.24em] text-[#f6efe6] transition hover:bg-[#23262e]">
                Ver pieza <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.7rem] border border-[#171717]/10 bg-[#101010]">
            <Image src={featured.images[0]} alt={featured.name} width={1200} height={900} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden bg-[linear-gradient(135deg,#161a22_0%,#12151c_45%,#171d27_100%)] p-6 text-[#f6efe6] shadow-[0_25px_70px_rgba(0,0,0,0.16)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="flex flex-col justify-center">
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#a89d90]">Diseño a medida</p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl sm:text-4xl">Un proceso de arquitectura, ingeniería y fabricación pensado para espacios singulares.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#d8d0c4]">
              Desde la primera conversación hasta la instalación, cada proyecto se desarrolla con precisión, soberbia materialidad y una lectura arquitectónica inequívoca.
            </p>
            <Link href="/diseno-a-medida" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.26em] text-[#f6efe6] transition hover:text-[#d7c8ae]">
              Comenzar un proyecto <ArrowRight size={14} />
            </Link>
          </div>
          <div className="group overflow-hidden border border-white/10 bg-[#121212]">
            <Image src="/images/elema-generated/instalacion-metalica.webp" alt="Instalación arquitectónica de mobiliario metálico" width={1672} height={941} className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.025]" />
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7a7269]">Materiales</p>
            <h2 className="mt-4 font-serif text-3xl text-[#171717] sm:text-4xl">Acero, piedra, fuego y precisión en cada terminación.</h2>
            <div className="group mt-8 overflow-hidden bg-[#171717]">
              <Image src="/images/elema-generated/material-acero-piedra.webp" alt="Encuentro de acero cepillado y piedra clara" width={1774} height={887} className="aspect-[2/1] w-full object-cover transition duration-1000 group-hover:scale-[1.035]" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {materials.map((material) => (
              <div key={material.title} className="rounded-[1.5rem] border border-[#161616]/10 bg-[#f8f2e8] p-6">
                <div className="mb-5 h-2 w-16 bg-[#171717]" />
                <h3 className="text-xl font-medium text-[#171717]">{material.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4a453f]">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="border border-white/10 bg-[linear-gradient(135deg,#171b24_0%,#11141c_100%)] p-6 text-[#f6efe6] shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#a89d90]">Profesionales</p>
              <h2 className="mt-4 max-w-xl font-serif text-3xl sm:text-4xl">Para arquitectos, constructoras, diseñadores e inmobiliarias de alta exigencia.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#d8d0c4]">
                Una colaboración técnica, discreta y precisa para proyectos que no admiten improvisación.
              </p>
              <Link href="/profesionales" className="mt-8 inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-sm uppercase tracking-[0.25em] text-[#f6efe6] transition hover:bg-white/10">
                Trabajar con ELEMA <ArrowRight size={14} />
              </Link>
            </div>
            <div className="group overflow-hidden border border-white/10">
              <Image src="/images/elema-generated/colaboracion-arquitectos.webp" alt="Arquitectos y especialistas revisando detalles de fabricación" width={1536} height={1024} className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.025]" />
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#13161d]">
          <Image src="/images/elema-generated/isla-monumental.webp" alt="" fill sizes="100vw" className="object-cover object-center opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,0.83)_0%,rgba(10,12,16,0.62)_100%)]" />
          <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-6 py-16 sm:px-8 lg:px-12">
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#c8c0b6]">Cierre</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl text-[#f6efe6] sm:text-4xl">Tu espacio puede decir más.</h2>
            <Link href="/contacto" className="mt-8 inline-flex w-fit items-center gap-2 border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#f6efe6] transition hover:bg-white/10">
              Solicitar asesoría privada <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
