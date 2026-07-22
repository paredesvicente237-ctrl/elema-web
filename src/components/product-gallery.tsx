'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export type ProductGalleryImage = {
  src: string;
  alt: string;
  caption: string;
  label: string;
  objectPosition?: string;
};

type ProductGalleryProps = {
  images: ProductGalleryImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') setActiveIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight') setActiveIndex((current) => current === null ? null : (current + 1) % images.length);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, images.length]);

  const showPrevious = () => setActiveIndex((current) => current === null ? 0 : (current - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((current) => current === null ? 0 : (current + 1) % images.length);

  return (
    <>
      <div className="space-y-5">
        {images.map((image, index) => (
          <figure key={`${image.src}-${image.caption}`} className="group">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative block w-full overflow-hidden bg-[#171717] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717] ${index === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}
              aria-label={`Ampliar ${image.caption.toLowerCase()}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.018]"
                style={{ objectPosition: image.objectPosition ?? 'center' }}
              />
              <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center border border-white/35 bg-black/20 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
                <Maximize2 size={15} />
              </span>
            </button>
            <figcaption className="flex items-start justify-between gap-5 border-b border-black/12 py-4 text-[0.58rem] uppercase tracking-[0.24em] text-[#746d64]">
              <span>{image.label}</span>
              <span className="max-w-[65%] text-right text-[#3f3a35]">{image.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeImage ? createPortal((
        <div role="dialog" aria-modal="true" aria-label={`Galería ampliada de ${productName}`} className="fixed inset-0 z-[80] grid place-items-center bg-[#080808]/95 p-4 text-white sm:p-8">
          <button type="button" onClick={() => setActiveIndex(null)} className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center border border-white/30 bg-black/30 transition-colors hover:bg-white hover:text-black sm:right-8 sm:top-8" aria-label="Cerrar imagen ampliada">
            <X size={18} />
          </button>

          <div className="relative h-[72vh] w-full max-w-7xl">
            <Image src={activeImage.src} alt={activeImage.alt} fill sizes="(min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)" className="object-contain" priority />
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 border-t border-white/20 pt-4 sm:inset-x-8 sm:bottom-8">
            <div>
              <p className="text-[0.56rem] uppercase tracking-[0.28em] text-white/55">{activeImage.label}</p>
              <p className="mt-2 text-sm text-white/85">{activeImage.caption}</p>
            </div>
            {images.length > 1 ? (
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={showPrevious} className="grid h-11 w-11 place-items-center border border-white/30 transition-colors hover:bg-white hover:text-black" aria-label="Imagen anterior">
                  <ArrowLeft size={16} />
                </button>
                <button type="button" onClick={showNext} className="grid h-11 w-11 place-items-center border border-white/30 transition-colors hover:bg-white hover:text-black" aria-label="Imagen siguiente">
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ), document.body) : null}
    </>
  );
}
