"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';

type ElementKind = 'cocina' | 'parrilla' | 'campana';

type Choice = {
  id: string;
  label: string;
  description: string;
};

type ElementChoice = Choice & { id: ElementKind; image: string; imageAlt: string };

const elementOptions: ElementChoice[] = [
  {
    id: 'cocina',
    label: 'Cocina',
    description: 'Superficies, guardado y equipamiento reunidos en una composición.',
    image: '/images/elem-editorial/cocina-isla-frontal-hd.png',
    imageAlt: 'Cocina ELEM con isla de piedra y mobiliario metálico',
  },
  {
    id: 'parrilla',
    label: 'Parrilla',
    description: 'Fuego, preparación y apoyo organizados para el exterior.',
    image: '/images/products/parrilla-multiuso-movil/parrilla-multiuso-movil-frontal.png',
    imageAlt: 'Parrilla ELEM móvil con plancha y superficie de cocción',
  },
  {
    id: 'campana',
    label: 'Campana',
    description: 'Extracción y presencia arquitectónica definidas como una sola pieza.',
    image: '/images/campana-noctis.png',
    imageAlt: 'Campana ELEM de formato vertical en acero oscuro',
  },
];

const configurationOptions: Record<ElementKind, Choice[]> = {
  cocina: [
    { id: 'lineal', label: 'Lineal', description: 'Una composición continua contra el muro.' },
    { id: 'isla', label: 'Con isla', description: 'Un elemento central para cocinar y reunirse.' },
    { id: 'en-l', label: 'En L', description: 'Dos frentes conectados para aprovechar una esquina.' },
  ],
  parrilla: [
    { id: 'empotrada', label: 'Empotrada', description: 'Integrada al quincho o al mobiliario existente.' },
    { id: 'movil', label: 'Móvil', description: 'Un elemento autónomo que puede cambiar de posición.' },
    { id: 'modulo', label: 'Módulo completo', description: 'Parrilla, apoyo y guardado como un solo conjunto.' },
  ],
  campana: [
    { id: 'mural', label: 'Mural', description: 'Fijada al muro sobre la zona de cocción.' },
    { id: 'suspendida', label: 'Suspendida', description: 'Una pieza central sobre una isla o parrilla.' },
    { id: 'integrada', label: 'Integrada', description: 'Incorporada a la arquitectura con una lectura contenida.' },
  ],
};

const materialOptions: Choice[] = [
  { id: 'grafito', label: 'Acero grafito', description: 'Oscuro, mate y de presencia contenida.' },
  { id: 'satinado', label: 'Acero satinado', description: 'Luminoso, técnico y de lectura precisa.' },
  { id: 'piedra-acero', label: 'Piedra + acero', description: 'Contraste mineral para una composición arquitectónica.' },
];

const priorityOptions: Choice[] = [
  { id: 'recibir', label: 'Cocinar y recibir', description: 'El encuentro y la preparación tienen el mismo peso.' },
  { id: 'capacidad', label: 'Máxima capacidad', description: 'Más superficie útil, guardado y organización.' },
  { id: 'presencia', label: 'Presencia arquitectónica', description: 'El elemento debe definir visualmente el espacio.' },
];

const stepLabels = ['Producto', 'Formato', 'Acabado', 'Objetivo'];

export function CustomDesignConfigurator() {
  const [step, setStep] = useState(0);
  const [element, setElement] = useState<ElementKind | null>(null);
  const [configuration, setConfiguration] = useState('');
  const [material, setMaterial] = useState('');
  const [priority, setPriority] = useState('');
  const [notes, setNotes] = useState('');

  const selectedElement = elementOptions.find((option) => option.id === element);
  const selectedConfiguration = element
    ? configurationOptions[element].find((option) => option.id === configuration)
    : undefined;
  const selectedMaterial = materialOptions.find((option) => option.id === material);
  const selectedPriority = priorityOptions.find((option) => option.id === priority);
  const currentValue = [element, configuration, material, priority][step];
  const isComplete = Boolean(element && configuration && material && priority);
  const completedCount = [element, configuration, material, priority].filter(Boolean).length;

  const contactHref = useMemo(() => {
    if (!selectedElement || !selectedConfiguration || !selectedMaterial || !selectedPriority) return '/contacto';

    const summary = [
      'Solicitud creada en el configurador ELEM:',
      `Producto: ${selectedElement.label}`,
      `Formato: ${selectedConfiguration.label}`,
      `Acabado: ${selectedMaterial.label}`,
      `Objetivo: ${selectedPriority.label}`,
      `Observaciones: ${notes.trim() || 'Sin observaciones adicionales'}`,
    ].join('\n');
    const params = new URLSearchParams({
      interes: `${selectedElement.label} a medida · ${selectedConfiguration.label}`,
      mensaje: summary,
    });

    return `/contacto?${params.toString()}`;
  }, [notes, selectedConfiguration, selectedElement, selectedMaterial, selectedPriority]);

  const selectElement = (value: ElementKind) => {
    setElement(value);
    setConfiguration('');
    setMaterial('');
    setPriority('');
  };

  const reset = () => {
    setStep(0);
    setElement(null);
    setConfiguration('');
    setMaterial('');
    setPriority('');
    setNotes('');
  };

  return (
    <section id="configurador" aria-labelledby="configurator-title" className="mx-auto max-w-[1480px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="border border-black/12 bg-[#f8f5ef] shadow-[0_28px_90px_rgba(27,24,19,0.08)]">
        <div className="grid gap-6 border-b border-black/12 px-5 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#746e66]">Configura tu solicitud</p>
            <h2 id="configurator-title" className="mt-3 max-w-3xl font-serif text-4xl leading-[0.95] sm:text-5xl">Elige cuatro cosas para comenzar.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#625c54]">Al terminar tendrás una solicitud clara para enviar a ELEM. Todavía no estarás comprando ni encargando un plano definitivo.</p>
        </div>

        <div aria-label="Qué ocurre con tu solicitud" className="grid border-b border-black/12 bg-white sm:grid-cols-3">
          <ProcessNote number="1" title="Eliges" text="Producto, formato, acabado y prioridad." />
          <ProcessNote number="2" title="Envías" text="Tus elecciones junto con tus datos de contacto." />
          <ProcessNote number="3" title="Recibes" text="Una propuesta personalizada y cotización, tras confirmar medidas." />
        </div>

        <ol aria-label="Progreso del diseño" className="grid grid-cols-4 border-b border-black/12">
          {stepLabels.map((label, index) => {
            const completed = index < step || (index === step && Boolean(currentValue));
            return (
              <li key={label} aria-label={`Paso ${index + 1}: ${label}`} aria-current={index === step ? 'step' : undefined} className={`border-r border-black/10 px-3 py-4 last:border-r-0 sm:px-6 ${index === step ? 'bg-white' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className={`grid h-5 w-5 shrink-0 place-items-center border text-[0.55rem] ${completed ? 'border-[#2f4a36] bg-[#2f4a36] text-white' : 'border-black/20 text-[#7c746b]'}`}>
                    {completed ? <Check size={11} aria-hidden="true" /> : index + 1}
                  </span>
                  <span className={`hidden text-[0.58rem] uppercase tracking-[0.18em] sm:block ${index === step ? 'text-[#171717]' : 'text-[#817970]'}`}>{label}</span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <div className="flex min-h-[38rem] flex-col p-5 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#817970]">Paso {step + 1} de 4</p>
              <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 px-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#6b645c] transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <RotateCcw size={13} aria-hidden="true" /> Reiniciar
              </button>
            </div>

            {step === 0 ? (
              <fieldset className="mt-8">
                <legend className="font-serif text-3xl sm:text-4xl">¿Qué quieres cotizar?</legend>
                <p className="mt-3 text-sm leading-7 text-[#665f57]">Elige una categoría. La imagen es referencial y no representa todavía el diseño final.</p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {elementOptions.map((option) => (
                    <button key={option.id} type="button" aria-pressed={element === option.id} onClick={() => selectElement(option.id)} className={`group overflow-hidden border bg-white text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${element === option.id ? 'border-[#171717] shadow-[0_14px_35px_rgba(20,16,10,0.10)]' : 'border-black/12 hover:border-black/35'}`}>
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd7ce]">
                        <Image src={option.image} alt={option.imageAlt} fill priority sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                        {element === option.id ? <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center bg-[#f8f5ef] text-[#171717]"><Check size={15} aria-hidden="true" /></span> : null}
                      </div>
                      <span className="block p-4">
                        <span className="block font-serif text-2xl">{option.label}</span>
                        <span className="mt-2 block text-xs leading-6 text-[#6b645c]">{option.description}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 1 && element ? (
              <ChoiceStep
                legend="¿Qué formato buscas?"
                hint="Elige la opción más parecida a tu idea. Las medidas exactas se confirman después con ELEM."
                options={configurationOptions[element]}
                value={configuration}
                onChange={setConfiguration}
              />
            ) : null}

            {step === 2 ? (
              <ChoiceStep
                legend="¿Qué acabado te gusta más?"
                hint="Esta elección define la apariencia general. Las muestras reales se revisan antes de fabricar."
                options={materialOptions}
                value={material}
                onChange={setMaterial}
                material
              />
            ) : null}

            {step === 3 ? (
              <fieldset className="mt-8">
                <legend className="font-serif text-3xl sm:text-4xl">¿Qué es más importante para ti?</legend>
                <p className="mt-3 text-sm leading-7 text-[#665f57]">Esto ayuda a ELEM a preparar una propuesta que responda a tu forma de usar el espacio.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {priorityOptions.map((option) => (
                    <ChoiceButton key={option.id} option={option} selected={priority === option.id} onClick={() => setPriority(option.id)} />
                  ))}
                </div>
                <label className="mt-7 block text-sm text-[#57514b]">
                  Cuéntanos brevemente sobre el espacio <span className="text-[#8b837a]">(opcional)</span>
                  <textarea value={notes} onChange={(event) => setNotes(event.target.value.slice(0, 360))} maxLength={360} placeholder="Ejemplo: terraza techada, espacio para ocho personas y conexiones existentes." className="mt-2 min-h-28 w-full resize-y border border-black/15 bg-white px-4 py-3.5 leading-7 outline-none transition placeholder:text-[#9a9288] focus:border-black/55" />
                </label>
              </fieldset>
            ) : null}

            <div className="mt-auto flex flex-col-reverse gap-3 border-t border-black/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="inline-flex min-h-12 items-center justify-center gap-2 border border-black/15 px-5 text-[0.62rem] uppercase tracking-[0.2em] transition hover:border-black/40 disabled:invisible">
                <ArrowLeft size={14} aria-hidden="true" /> Anterior
              </button>
              {step < 3 ? (
                <button type="button" onClick={() => setStep((current) => Math.min(3, current + 1))} disabled={!currentValue} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#171717] px-6 text-[0.62rem] uppercase tracking-[0.2em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-35">
                  Continuar <ArrowRight size={14} aria-hidden="true" />
                </button>
              ) : (
                <Link href={contactHref} aria-disabled={!isComplete} tabIndex={isComplete ? undefined : -1} className={`inline-flex min-h-12 items-center justify-center gap-2 px-6 text-[0.62rem] uppercase tracking-[0.2em] transition ${isComplete ? 'bg-[#171717] text-white hover:bg-black' : 'pointer-events-none bg-black/15 text-black/35'}`}>
                  Continuar a contacto <ArrowRight size={14} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>

          <CompositionPreview
            element={selectedElement}
            configuration={selectedConfiguration}
            material={selectedMaterial}
            priority={selectedPriority}
            completedCount={completedCount}
          />
        </div>
      </div>
    </section>
  );
}

function ProcessNote({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-3 border-b border-black/10 px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0">
      <span className="font-serif text-xl text-[#8a8278]">{number}</span>
      <div>
        <p className="text-sm font-medium text-[#292622]">{title}</p>
        <p className="mt-1 text-xs leading-5 text-[#716a62]">{text}</p>
      </div>
    </div>
  );
}

function ChoiceStep({ legend, hint, options, value, onChange, material = false }: { legend: string; hint: string; options: Choice[]; value: string; onChange: (value: string) => void; material?: boolean }) {
  return (
    <fieldset className="mt-8">
      <legend className="font-serif text-3xl sm:text-4xl">{legend}</legend>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#665f57]">{hint}</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <ChoiceButton key={option.id} option={option} selected={value === option.id} onClick={() => onChange(option.id)} swatch={material ? option.id : undefined} />
        ))}
      </div>
    </fieldset>
  );
}

function ChoiceButton({ option, selected, onClick, swatch }: { option: Choice; selected: boolean; onClick: () => void; swatch?: string }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`min-h-36 border p-5 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${selected ? 'border-[#171717] bg-white shadow-[0_12px_30px_rgba(20,16,10,0.08)]' : 'border-black/12 bg-[#f4f0e9] hover:border-black/35 hover:bg-white'}`}>
      <span className="flex items-start justify-between gap-4">
        {swatch ? <MaterialSwatch material={swatch} /> : <span className="font-serif text-lg text-[#8a8278]">E</span>}
        <span className={`grid h-5 w-5 place-items-center border ${selected ? 'border-[#2f4a36] bg-[#2f4a36] text-white' : 'border-black/20 text-transparent'}`}><Check size={11} aria-hidden="true" /></span>
      </span>
      <span className="mt-5 block font-serif text-2xl leading-none">{option.label}</span>
      <span className="mt-3 block text-xs leading-6 text-[#6b645c]">{option.description}</span>
    </button>
  );
}

function MaterialSwatch({ material }: { material: string }) {
  const className = material === 'grafito'
    ? 'bg-[#242625]'
    : material === 'satinado'
      ? 'bg-[linear-gradient(135deg,#8f9494,#e2e3df,#9ba0a0)]'
      : 'bg-[linear-gradient(135deg,#d9d2c7_0_48%,#555957_48%_52%,#b9bdbb_52%)]';
  return <span aria-hidden="true" className={`h-7 w-12 border border-black/10 ${className}`} />;
}

function CompositionPreview({ element, configuration, material, priority, completedCount }: { element?: ElementChoice; configuration?: Choice; material?: Choice; priority?: Choice; completedCount: number }) {
  return (
    <aside aria-label="Resumen de tu solicitud" className="flex min-h-[34rem] flex-col border-t border-black/12 bg-white p-6 text-[#171717] sm:p-8 lg:min-h-full lg:border-l lg:border-t-0 lg:p-10">
      <div className="flex items-start justify-between gap-5 border-b border-black/12 pb-5">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.25em] text-[#777067]">Tu solicitud</p>
          <p className="mt-2 font-serif text-3xl">{element?.label ?? 'Aún sin comenzar'}</p>
        </div>
        <span className="text-[0.58rem] uppercase tracking-[0.18em] text-[#777067]">{completedCount} / 4 completo</span>
      </div>

      {element ? (
        <figure className="mt-6">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#ddd7ce]">
            <Image src={element.image} alt={element.imageAlt} fill priority sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="border-x border-b border-black/10 px-4 py-3 text-[0.58rem] uppercase tracking-[0.18em] text-[#777067]">Imagen referencial · El diseño final se define después</figcaption>
        </figure>
      ) : (
        <div className="mt-6 grid aspect-[16/10] place-items-center border border-dashed border-black/20 bg-[#f4f1ea] px-8 text-center">
          <p className="max-w-xs text-sm leading-7 text-[#6b645c]">Elige cocina, parrilla o campana para comenzar tu solicitud.</p>
        </div>
      )}

      <dl className="mt-6 grid grid-cols-2 border-t border-black/12 text-xs">
        <PreviewDatum label="Elemento" value={element?.label} />
        <PreviewDatum label="Formato" value={configuration?.label} />
        <PreviewDatum label="Acabado" value={material?.label} />
        <PreviewDatum label="Objetivo" value={priority?.label} />
      </dl>

      <div className="mt-6 border border-[#607263]/25 bg-[#edf1eb] p-5">
        <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#506254]">Qué recibirás después de enviar</p>
        <p className="mt-3 text-sm leading-7 text-[#344238]">Un especialista de ELEM revisará tu selección, confirmará medidas y necesidades contigo, y preparará una propuesta personalizada con cotización.</p>
        <p className="mt-3 border-t border-[#607263]/20 pt-3 text-xs leading-6 text-[#607064]">Esta herramienta no genera un plano final y no realiza ningún cobro.</p>
      </div>
    </aside>
  );
}

function PreviewDatum({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-b border-r border-black/10 py-4 pr-3 even:border-r-0">
      <dt className="text-[0.52rem] uppercase tracking-[0.2em] text-[#837b72]">{label}</dt>
      <dd className="mt-2 min-h-5 text-[#3f3a35]">{value ?? 'Sin elegir'}</dd>
    </div>
  );
}
