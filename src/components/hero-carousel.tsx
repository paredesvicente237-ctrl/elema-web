import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroCarousel() {
  return (
    <section data-ambient="coast" className="ambient-frame relative isolate mt-20 min-h-[calc(100svh-5rem)] overflow-hidden bg-[#090909] text-white">
      <Image
        src="/images/elema-generated/cocina-exterior-mar-atardecer-acero-oscuro-hero-v4.png"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="ambient-media ambient-media--hero object-cover object-[54%_center] sm:object-[58%_center] lg:object-center"
      />
      <span className="ambient-light ambient-light--coast" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,8,0.78)_0%,rgba(6,7,8,0.5)_48%,rgba(6,7,8,0.1)_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(to_top,rgba(5,6,7,0.82)_0%,rgba(5,6,7,0.32)_58%,transparent_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-end px-4 pb-7 pt-24 sm:px-6 sm:pb-8 lg:px-8 lg:pb-9">
        <div className="grid gap-8 pb-10 sm:pb-12 lg:grid-cols-[minmax(0,1.36fr)_minmax(17rem,0.64fr)] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.27em] text-[#ece7df] drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">Cocinas · fuego · piezas especiales</p>
            <h1 className="mt-5 max-w-[820px] font-serif text-[clamp(3.65rem,7.1vw,6.25rem)] font-semibold leading-[0.86] tracking-[-0.035em] text-[#f4f1ea] drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]">
              Metal, fuego y arquitectura.
            </h1>
          </div>

          <div className="border-l border-white/45 pl-5 sm:pl-6">
            <p className="max-w-md text-[0.95rem] leading-7 text-[#f0ebe3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:text-base sm:leading-8">
              Piezas desarrolladas desde el diseño hasta la fabricación, con precisión arquitectónica.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-5">
              <Link href="/contacto" className="inline-flex items-center justify-center gap-3 bg-[#f4f1ea] px-5 py-3.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#171717] transition-colors hover:bg-white">
                Iniciar un proyecto <ArrowRight size={14} />
              </Link>
              <Link href="/tienda" className="inline-flex items-center gap-3 border-b border-white/45 pb-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-white transition-colors hover:border-white">
                Ver piezas <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-white/25 pt-4">
          <p className="text-[0.56rem] uppercase tracking-[0.2em] text-white/60">Diseño / Ingeniería / Fabricación</p>
          <Link href="#pieza-emblematica" className="flex shrink-0 items-center gap-2 text-[0.56rem] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white">
            Descubrir <ChevronDown size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
