import Image from 'next/image';

const details = [
  {
    src: '/images/elem-editorial/marca-acero-cepillado.png',
    alt: 'Nombre ELEM grabado sobre acero cepillado',
    label: 'Identidad material',
  },
  {
    src: '/images/elem-editorial/union-acero-soldada.png',
    alt: 'Unión soldada de dos planos de acero oscuro',
    label: 'Unión',
  },
  {
    src: '/images/elem-editorial/perilla-mecanizada.png',
    alt: 'Perilla circular mecanizada en metal',
    label: 'Mecanizado',
  },
  {
    src: '/images/elem-editorial/manilla-metalica.png',
    alt: 'Manilla metálica moleteada de terminación precisa',
    label: 'Contacto',
  },
  {
    src: '/images/elem-editorial/encuentro-panel-metalico.png',
    alt: 'Encuentro limpio entre paneles metálicos oscuros',
    label: 'Encuentro',
  },
  {
    src: '/images/elem-editorial/perforado-marca-elem.png',
    alt: 'Panel metálico perforado con emblema ELEM',
    label: 'Ventilación',
  },
];

export function MaterialDetailGrid() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden bg-black/15 sm:grid-cols-3 lg:grid-cols-6">
      {details.map((detail) => (
        <figure key={detail.src} className="group bg-[#111]">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={detail.src}
              alt={detail.alt}
              fill
              sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
            />
          </div>
          <figcaption className="border-t border-white/10 px-3 py-3 text-[0.52rem] uppercase tracking-[0.2em] text-white/55">
            {detail.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
