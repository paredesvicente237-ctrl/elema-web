import Link from 'next/link';
import Image from 'next/image';

const steps = [
  { number: '01', title: 'Leer los elementos', description: 'Definimos uso, medidas, arquitectura y exigencias para entender qué debe formar el conjunto.' },
  { number: '02', title: 'Ordenar el conjunto', description: 'Diseño e ingeniería articulan cada componente en CAD antes de preparar su fabricación.' },
  { number: '03', title: 'Definir la materia', description: 'Especificamos aceros, metales, terminaciones y encuentros según el espacio y su nivel de exigencia.' },
  { number: '04', title: 'Fabricar cada elemento', description: 'Corte, plegado, curvado, armado y soldadura se controlan como partes de una misma composición.' },
  { number: '05', title: 'Integrar en el espacio', description: 'Verificamos terminaciones y funcionamiento antes de coordinar el montaje del conjunto terminado.' },
];

export default function CustomDesignPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Elementos a medida</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">Tu espacio define los elementos. ELEM define el conjunto.</h1>
            <p className="mt-6 text-lg leading-8 text-[#57514b]">Cada proyecto avanza desde una necesidad concreta hasta una composición fabricable, donde proporción, materia, tolerancias y montaje responden a una sola intención.</p>
          </div>
          <div className="overflow-hidden border border-black/10 bg-[#e3ddd3] shadow-[0_24px_70px_rgba(20,16,10,0.10)]">
            <Image src="/images/editorial-diseno.jpg" alt="Mesa editorial de diseño técnico con planos y muestras metálicas" width={1536} height={1024} className="aspect-[16/10] w-full object-cover" priority />
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="border border-black/10 bg-[#f8f5ef] p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(20,16,10,0.07)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8a837a]">{step.number} · Etapa</p>
              <h2 className="mt-4 font-serif text-3xl">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#625c55]">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5 border border-black/10 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-serif text-3xl">Una solución precisa comienza por reconocer cada elemento.</p>
          <Link href="/contacto" className="inline-flex w-fit items-center bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white">Definir mi proyecto</Link>
        </div>
      </div>
    </main>
  );
}
