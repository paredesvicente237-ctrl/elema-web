import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { availableProducts } from '@/data/products';

const collections = [
  { title: 'Cocinas', description: 'Composiciones de alto impacto para residencias y proyectos singulares.', href: '/colecciones/cocinas', image: '/images/cocina-aurora.png' },
  { title: 'Parrillas', description: 'Arte funcional para exteriores, hosting y experiencias de fuego.', href: '/colecciones/parrillas', image: '/images/parrilla-lumen.png' },
  { title: 'Campanas', description: 'Elementos escultóricos que sostienen la narrativa del espacio.', href: '/colecciones/campanas', image: '/images/campana-noctis.png' },
  { title: 'Soluciones a medida', description: 'Proyectos de arquitectura, mobiliario y fabricación especial.', href: '/diseno-a-medida', image: '/images/taller-elema-editorial.png' },
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
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#12141a]">
        <Image src="/images/hero-luxury-waterfront.png" alt="" fill sizes="100vw" className="object-cover object-center" quality={90} priority />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 text-[0.72rem] uppercase tracking-[0.38em] text-[#d9d0c2]">ELEMA • Diseño y fabricación premium</p>
            <h1 className="max-w-[720px] font-serif text-4xl leading-[0.92] text-[#f5efe6] sm:text-5xl lg:text-[4.8rem]">
              Diseñamos espacios que imponen presencia.
            </h1>
            <p className="mt-6 max-w-[640px] text-base leading-8 text-[#efe2ce] sm:text-lg">
              Cocinas, parrillas y soluciones arquitectónicas creadas para espacios extraordinarios.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/colecciones" className="inline-flex items-center justify-center gap-2 bg-[#f4efe6] px-6 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[#161616] transition hover:bg-[#efe2ce]">
                Descubrir colecciones <ArrowRight size={16} />
              </Link>
              <Link href="/diseno-a-medida" className="inline-flex items-center justify-center border border-[#c3b39b]/35 bg-[#1b2028] px-6 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[#f4efe6] transition hover:border-[#d8cdb5]/50 hover:bg-[#232835]">
                Diseñar mi espacio
              </Link>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-3 text-sm uppercase tracking-[0.32em] text-[#ddd3c4]">
            <span className="h-px w-10 bg-white/30" />
            Scroll
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
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
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Link href={collections[0].href} className="group relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#14161d] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
            <Image src={collections[0].image} alt="" fill sizes="(min-width: 1280px) 55vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(10,12,16,0.9)_0%,rgba(10,12,16,0.48)_55%,rgba(10,12,16,0.2)_100%)]" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#cfc7bc]">Colección</p>
              <h3 className="mt-4 font-serif text-3xl text-[#f6efe6] sm:text-4xl">{collections[0].title}</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-[#d8d0c4]">{collections[0].description}</p>
            </div>
          </Link>

          <div className="grid gap-6">
            {collections.slice(1).map((collection) => (
              <Link key={collection.title} href={collection.href} className="group relative min-h-[210px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#151922] shadow-[0_12px_45px_rgba(0,0,0,0.14)]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${collection.image}')` }} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,16,0.18)_0%,rgba(10,12,16,0.8)_100%)]" />
                <div className="relative z-10 flex h-full flex-col justify-end p-7">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#cfc7bc]">Colección</p>
                  <h3 className="mt-3 font-serif text-2xl text-[#f6efe6]">{collection.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-[#d8d0c4]">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#0b0c0f] text-[#f6efe6]">
        <Image src="/images/taller-elema-editorial.png" alt="Fabricación de una pieza de acero en taller" fill sizes="100vw" className="object-cover object-center" />
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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[2.2rem] bg-[linear-gradient(135deg,#161a22_0%,#12151c_45%,#171d27_100%)] p-6 text-[#f6efe6] shadow-[0_25px_70px_rgba(0,0,0,0.16)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
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
          <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#121212]">
            <Image src="/images/editorial-diseno.jpg" alt="Mesa de diseño técnico con planos y muestras metálicas" width={1536} height={1024} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7a7269]">Materiales</p>
            <h2 className="mt-4 font-serif text-3xl text-[#171717] sm:text-4xl">Acero, piedra, fuego y precisión en cada terminación.</h2>
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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,#171b24_0%,#11141c_100%)] p-6 text-[#f6efe6] shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-8 lg:p-12">
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
            <div className="overflow-hidden rounded-[1.7rem] border border-white/10">
              <Image src="/images/editorial-profesionales.jpg" alt="Profesionales revisando planos junto a una pieza metálica" width={1536} height={1024} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[#13161d]">
          <Image src="/images/editorial-contacto.jpg" alt="" fill sizes="100vw" className="object-cover object-center opacity-55" />
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
