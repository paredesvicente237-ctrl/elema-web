import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { CustomDesignConfigurator } from '@/components/custom-design-configurator';
import { MotionController } from '@/components/motion-controller';

export const metadata: Metadata = {
  title: 'Configura tu proyecto a medida',
  description: 'Elige una cocina, parrilla o campana y envía a ELEM una solicitud clara para recibir una propuesta personalizada y cotización.',
};

const steps = [
  { number: '01', title: 'Revisamos tu solicitud', description: 'El equipo ELEM recibe tus elecciones y las observaciones que dejaste en el configurador.' },
  { number: '02', title: 'Confirmamos el espacio', description: 'Te contactamos para entender medidas, conexiones, ubicación y cualquier requisito especial.' },
  { number: '03', title: 'Preparamos la propuesta', description: 'Con la información confirmada, desarrollamos una solución personalizada junto con su cotización.' },
  { number: '04', title: 'Diseñamos y fabricamos', description: 'Solo después de tu aprobación avanzamos al desarrollo técnico, fabricación y coordinación de montaje.' },
];

export default function CustomDesignPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] text-[#171717]">
      <MotionController />

      <section className="px-4 pb-10 pt-32 sm:px-6 lg:px-8 lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div data-reveal="left">
              <p className="text-sm uppercase tracking-[0.3em] text-[#77716a]">Proyectos a medida</p>
              <h1 className="mt-4 font-serif text-5xl leading-[0.94] sm:text-6xl lg:text-7xl">Cuéntanos qué quieres. ELEM prepara la propuesta.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#57514b]">En cuatro pasos puedes preparar una solicitud para una cocina, parrilla o campana. Después de enviarla, un especialista confirmará contigo las medidas y preparará una propuesta personalizada con cotización.</p>
              <a href="#configurador" className="mt-8 inline-flex min-h-12 items-center border-b border-black/35 text-[0.66rem] uppercase tracking-[0.22em]">Configurar mi solicitud</a>
            </div>
            <div data-reveal="right" className="overflow-hidden border border-black/10 bg-[#e3ddd3] shadow-[0_24px_70px_rgba(20,16,10,0.10)]">
              <Image src="/images/elem-editorial/cocina-isla-marmol-hd.png" alt="Cocina ELEM con isla monolítica de mármol y acero oscuro" width={1089} height={1445} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[16/10] w-full object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <CustomDesignConfigurator />

      <section className="border-t border-black/10 bg-[#f4f1ea] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="grid gap-8 border-b border-black/12 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#77716a]">Después de enviar</p>
              <h2 className="mt-4 font-serif text-4xl leading-[0.96] sm:text-5xl">Así avanzamos desde tu solicitud hasta el proyecto.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#5d574f]">Nada se fabrica ni se cobra automáticamente. Primero revisamos contigo el espacio, el alcance y la factibilidad. El diseño técnico comienza únicamente después de aprobar la propuesta y la cotización.</p>
          </div>

          <figure data-reveal className="mt-10 overflow-hidden bg-[#111] text-white">
            <div className="relative aspect-[2.7/1]">
              <Image src="/images/elem-editorial/fabricacion-corte-laser-hd.png" alt="Proceso de corte láser sobre una plancha de acero" fill sizes="100vw" className="object-cover" />
            </div>
            <figcaption className="flex flex-col gap-2 border-t border-white/10 px-5 py-4 text-[0.58rem] uppercase tracking-[0.22em] text-white/55 sm:flex-row sm:justify-between">
              <span>Del diseño al material</span><span>Corte · Plegado · Armado · Terminación</span>
            </figcaption>
          </figure>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <div key={step.number} data-reveal className="border border-black/10 bg-[#f8f5ef] p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(20,16,10,0.07)]">
                <p className="text-sm uppercase tracking-[0.3em] text-[#8a837a]">{step.number} · Etapa</p>
                <h2 className="mt-4 font-serif text-3xl">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#625c55]">{step.description}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-10 flex flex-col gap-5 border border-black/10 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-serif text-3xl">¿Ya tienes planos o una idea definida?</p>
            <Link href="/contacto" className="inline-flex min-h-12 w-fit items-center bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white">Hablar con ELEM</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
