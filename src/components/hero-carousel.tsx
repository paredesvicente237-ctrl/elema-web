'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const slides = [
  {
    eyebrow: 'Cocinas · Arquitectura interior',
    title: 'Espacios que imponen presencia.',
    description: 'Cocinas y mobiliario metálico concebidos como una intervención arquitectónica completa.',
    image: '/images/elema-generated/cocina-costera-hero.webp',
    href: '/colecciones/cocinas',
    cta: 'Explorar cocinas',
    position: 'object-center',
  },
  {
    eyebrow: 'Parrillas · Experiencias de fuego',
    title: 'El fuego, llevado a otra escala.',
    description: 'Parrillas de alto desempeño donde materialidad, precisión y encuentro comparten el centro.',
    image: '/images/elema-generated/parrilla-montana-hero.webp',
    href: '/colecciones/parrillas',
    cta: 'Descubrir parrillas',
    position: 'object-center',
  },
  {
    eyebrow: 'Diseño a medida · Piezas singulares',
    title: 'Una idea. Una pieza irrepetible.',
    description: 'Diseño, ingeniería y fabricación coordinados para materializar espacios fuera de catálogo.',
    image: '/images/elema-generated/isla-monumental.webp',
    href: '/diseno-a-medida',
    cta: 'Iniciar un proyecto',
    position: 'object-center',
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActive((current) => (current + 1) % slides.length);
  const slide = slides[active];

  return (
    <section className="relative isolate mt-20 min-h-[calc(100svh-5rem)] overflow-hidden bg-[#090909] text-white" aria-roledescription="carrusel" aria-label="Universo ELEMA">
      <div className="absolute inset-0">
        {slides.map((entry, index) => (
          <Image
            key={entry.image}
            src={entry.image}
            alt=""
            fill
            priority={index === 0}
            quality={90}
            sizes="100vw"
            className={`${entry.position} object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${index === active ? 'scale-100 opacity-100' : 'scale-[1.035] opacity-0'}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,9,0.68)_0%,rgba(5,7,9,0.34)_44%,rgba(5,7,9,0.03)_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-end px-4 pb-8 pt-24 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
        <div key={active} className="hero-copy-enter max-w-3xl pb-16 sm:pb-20">
          <p className="text-[0.68rem] uppercase tracking-[0.38em] text-[#d8d4cc]">{slide.eyebrow}</p>
          <h1 className="mt-6 max-w-[760px] font-serif text-5xl leading-[0.9] text-[#f4f1ea] sm:text-6xl lg:text-[5.5rem]">
            {slide.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#e4ddd2] sm:text-lg">{slide.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={slide.href} className="inline-flex items-center justify-center gap-3 bg-[#f4f1ea] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.26em] text-[#171717] transition hover:bg-white">
              {slide.cta} <ArrowRight size={15} />
            </Link>
            <Link href="/contacto" className="inline-flex items-center justify-center border border-white/30 px-6 py-3.5 text-xs uppercase tracking-[0.26em] text-white transition hover:bg-white/10">
              Solicitar asesoría
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/25 pt-5">
          <div className="flex items-center gap-4">
            <button type="button" onClick={showPrevious} className="grid h-10 w-10 place-items-center border border-white/25 transition hover:bg-white hover:text-black" aria-label="Imagen anterior">
              <ArrowLeft size={15} />
            </button>
            <button type="button" onClick={showNext} className="grid h-10 w-10 place-items-center border border-white/25 transition hover:bg-white hover:text-black" aria-label="Imagen siguiente">
              <ArrowRight size={15} />
            </button>
            <p className="ml-1 font-serif text-lg tabular-nums"><span>0{active + 1}</span><span className="mx-2 text-white/35">/</span><span className="text-white/55">0{slides.length}</span></p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            {slides.map((entry, index) => (
              <button key={entry.image} type="button" onClick={() => setActive(index)} className="group py-3" aria-label={`Mostrar imagen ${index + 1}`} aria-current={index === active ? 'true' : undefined}>
                <span className={`block h-px transition-all duration-500 ${index === active ? 'w-16 bg-white' : 'w-8 bg-white/35 group-hover:bg-white/70'}`} />
              </button>
            ))}
          </div>

          <Link href="#comprar" className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.32em] text-white/65 transition hover:text-white">
            Comprar <ChevronDown size={14} className="animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
