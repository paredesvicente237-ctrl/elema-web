import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroCarousel() {
  return (
    <section data-ambient="coast" className="ambient-frame relative isolate mt-20 min-h-[calc(100svh-5rem)] overflow-hidden bg-[#090909] text-white">
      <Image
        src="/images/elema-generated/cocina-costera-hero.webp"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="ambient-media ambient-media--hero object-cover object-[58%_center] sm:object-center"
      />
      <span className="ambient-light ambient-light--coast" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,8,0.78)_0%,rgba(6,7,8,0.43)_48%,rgba(6,7,8,0.08)_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/45 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-end px-4 pb-8 pt-28 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
        <div className="max-w-4xl pb-16 sm:pb-20 lg:pb-24">
          <p className="text-[0.65rem] uppercase tracking-[0.38em] text-[#d8d4cc]">ELEMA · Santiago, Chile</p>
          <h1 className="mt-6 max-w-[900px] font-serif text-5xl leading-[0.88] text-[#f4f1ea] sm:text-7xl lg:text-[6.7rem]">
            El metal, convertido en arquitectura.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#e4ddd2] sm:text-lg">
            Cocinas, fuego y piezas especiales desarrolladas desde el diseño, la ingeniería y la fabricación.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contacto" className="inline-flex items-center justify-center gap-3 bg-[#f4f1ea] px-6 py-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#171717] transition-colors hover:bg-white">
              Solicitar una conversación privada <ArrowRight size={14} />
            </Link>
            <Link href="/tienda" className="inline-flex items-center justify-center border border-white/35 px-6 py-4 text-[0.68rem] uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10">
              Explorar piezas
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/25 pt-5">
          <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/60">Diseño · Ingeniería · Fabricación</p>
          <Link href="#pieza-emblematica" className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.28em] text-white/65 transition-colors hover:text-white">
            Descubrir <ChevronDown size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
