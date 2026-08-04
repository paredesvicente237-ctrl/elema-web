'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Box, Check, Eye, Moon, Redo2, Rotate3D, RotateCcw, Ruler, Save, SlidersHorizontal, Sun, Undo2 } from 'lucide-react';
import type { SceneMode, StudioConfig, StudioFinish, StudioProduct, StudioView } from './three-studio-viewport';

const ThreeStudioViewport = dynamic(
  () => import('./three-studio-viewport').then((module) => module.ThreeStudioViewport),
  {
    ssr: false,
    loading: () => <div className="grid h-full min-h-[30rem] place-items-center bg-[#d9d4cb] text-[0.62rem] uppercase tracking-[0.2em] text-[#69635c]">Preparando estudio 3D…</div>,
  },
);

type FormatOption = { id: string; label: string; description: string };
type ModuleOption = { id: string; label: string; description: string };
type Timeline = { items: StudioConfig[]; index: number };

const productLabels: Record<StudioProduct, string> = {
  cocina: 'Cocina',
  parrilla: 'Parrilla',
  campana: 'Campana',
};

const formats: Record<StudioProduct, FormatOption[]> = {
  cocina: [
    { id: 'lineal', label: 'Lineal', description: 'Un frente continuo' },
    { id: 'isla', label: 'Con isla', description: 'Dos volúmenes' },
    { id: 'en-l', label: 'En L', description: 'Dos frentes unidos' },
  ],
  parrilla: [
    { id: 'movil', label: 'Carro parrillero', description: 'Mueble móvil ELEM' },
    { id: 'empotrada', label: 'Empotrada', description: 'Integrada al quincho' },
    { id: 'completa', label: 'Estación completa', description: 'Cocción y apoyo' },
  ],
  campana: [
    { id: 'mural', label: 'Mural', description: 'Instalada al muro' },
    { id: 'suspendida', label: 'Suspendida', description: 'Sobre una isla' },
    { id: 'integrada', label: 'Integrada', description: 'Lectura contenida' },
  ],
};

const modules: Record<StudioProduct, ModuleOption[]> = {
  cocina: [
    { id: 'lavaplatos', label: 'Lavaplatos', description: 'Cubeta y grifería' },
    { id: 'encimera', label: 'Encimera', description: 'Cuatro zonas' },
    { id: 'horno', label: 'Horno', description: 'Integrado bajo cubierta' },
    { id: 'cava', label: 'Cava', description: 'Conservación inferior' },
    { id: 'repisas', label: 'Repisas', description: 'Dos planos abiertos' },
    { id: 'luz', label: 'Luz cálida', description: 'Iluminación de tarea' },
  ],
  parrilla: [
    { id: 'parrilla', label: 'Rejilla en acero', description: 'Barras de alta resistencia' },
    { id: 'plancha', label: 'Plancha', description: 'Placa lateral lisa' },
    { id: 'puertas', label: 'Puertas de malla', description: 'Guardado ventilado' },
    { id: 'asador', label: 'Spiedo', description: 'Eje de rotación' },
    { id: 'brasero', label: 'Brasero interior', description: 'Bandeja para carbón' },
    { id: 'ruedas', label: 'Ruedas industriales', description: 'Movilidad reforzada' },
  ],
  campana: [
    { id: 'filtros', label: 'Filtros', description: 'Tres módulos inferiores' },
    { id: 'luz', label: 'Luz integrada', description: 'Tres focos cálidos' },
    { id: 'panel', label: 'Control', description: 'Mando inferior' },
    { id: 'repisa', label: 'Repisa', description: 'Plano mural de apoyo' },
  ],
};

const finishOptions: Array<{ id: StudioFinish; label: string; detail: string; swatch: string }> = [
  { id: 'satinado', label: 'Acero satinado', detail: 'Metal cepillado', swatch: '#d9dddb' },
  { id: 'grafito', label: 'Acero grafito', detail: 'Metal oscuro', swatch: '#777d7b' },
  { id: 'bronce', label: 'Bronce', detail: 'Metal cálido', swatch: '#a58b73' },
  { id: 'piedra', label: 'Piedra + acero', detail: 'Contraste mineral', swatch: '#d8d2c8' },
];

const dimensionRules: Record<StudioProduct, Record<'width' | 'depth' | 'height', { min: number; max: number; step: number; label: string }>> = {
  cocina: {
    width: { min: 2, max: 5, step: 0.1, label: 'Ancho' },
    depth: { min: 0.6, max: 1.2, step: 0.05, label: 'Profundidad' },
    height: { min: 0.8, max: 1.05, step: 0.05, label: 'Altura cubierta' },
  },
  parrilla: {
    width: { min: 1.2, max: 3.6, step: 0.1, label: 'Ancho' },
    depth: { min: 0.6, max: 1.1, step: 0.05, label: 'Profundidad' },
    height: { min: 0.75, max: 1.1, step: 0.05, label: 'Altura de trabajo' },
  },
  campana: {
    width: { min: 0.9, max: 2.4, step: 0.1, label: 'Ancho' },
    depth: { min: 0.45, max: 0.9, step: 0.05, label: 'Profundidad' },
    height: { min: 1.4, max: 2.4, step: 0.1, label: 'Altura de instalación' },
  },
};

const initialConfigs: Record<StudioProduct, StudioConfig> = {
  cocina: {
    product: 'cocina', format: 'isla', finish: 'satinado', width: 3.2, depth: 0.72, height: 0.9,
    modules: { lavaplatos: true, encimera: true, horno: true, cava: false, repisas: true, luz: true },
  },
  parrilla: {
    product: 'parrilla', format: 'movil', finish: 'satinado', width: 1.8, depth: 0.82, height: 0.88,
    modules: { parrilla: true, plancha: false, puertas: true, asador: false, brasero: true, ruedas: true },
  },
  campana: {
    product: 'campana', format: 'suspendida', finish: 'satinado', width: 1.5, depth: 0.62, height: 1.8,
    modules: { filtros: true, luz: true, panel: true, repisa: false },
  },
};

const viewOptions: Array<{ id: StudioView; label: string }> = [
  { id: 'perspectiva', label: 'Perspectiva' },
  { id: 'frontal', label: 'Frontal' },
  { id: 'superior', label: 'Superior' },
];

export function CustomDesignConfigurator() {
  const [timeline, setTimeline] = useState<Timeline>({ items: [initialConfigs.cocina], index: 0 });
  const [view, setView] = useState<StudioView>('perspectiva');
  const [sceneMode, setSceneMode] = useState<SceneMode>('dia');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const config = timeline.items[timeline.index];

  const commit = (change: Partial<StudioConfig> | ((current: StudioConfig) => StudioConfig)) => {
    setTimeline((current) => {
      const base = current.items[current.index];
      const next = typeof change === 'function' ? change(base) : { ...base, ...change };
      const items = [...current.items.slice(0, current.index + 1), next];
      return { items, index: items.length - 1 };
    });
    setSaved(false);
  };

  const switchProduct = (product: StudioProduct) => {
    if (product === config.product) return;
    commit({ ...initialConfigs[product], finish: config.finish });
    setView('perspectiva');
  };

  const toggleModule = (moduleId: string) => {
    commit((current) => ({ ...current, modules: { ...current.modules, [moduleId]: !current.modules[moduleId] } }));
  };

  const undo = () => {
    setTimeline((current) => ({ ...current, index: Math.max(0, current.index - 1) }));
    setSaved(false);
  };

  const redo = () => {
    setTimeline((current) => ({ ...current, index: Math.min(current.items.length - 1, current.index + 1) }));
    setSaved(false);
  };

  const reset = () => {
    setTimeline({ items: [initialConfigs[config.product]], index: 0 });
    setView('perspectiva');
    setSceneMode('dia');
    setNotes('');
    setSaved(false);
  };

  const saveLocally = () => {
    window.localStorage.setItem('elem-3d-studio', JSON.stringify({ config, notes }));
    setSaved(true);
  };

  const activeFormat = formats[config.product].find((option) => option.id === config.format);
  const activeFinish = finishOptions.find((option) => option.id === config.finish);
  const selectedModules = modules[config.product].filter((option) => config.modules[option.id]);

  const contactHref = useMemo(() => {
    const summary = [
      'Configuración creada en el Estudio 3D ELEM:',
      `Elemento: ${productLabels[config.product]}`,
      `Formato: ${formats[config.product].find((option) => option.id === config.format)?.label ?? config.format}`,
      `Medidas iniciales: ${config.width.toFixed(2)} m ancho × ${config.depth.toFixed(2)} m profundidad × ${config.height.toFixed(2)} m altura`,
      `Acabado: ${finishOptions.find((option) => option.id === config.finish)?.label ?? config.finish}`,
      `Módulos: ${modules[config.product].filter((option) => config.modules[option.id]).map((option) => option.label).join(', ') || 'Sin módulos adicionales'}`,
      `Observaciones: ${notes.trim() || 'Sin observaciones adicionales'}`,
      'Las medidas y la factibilidad deben ser verificadas por ELEM.',
    ].join('\n');
    const params = new URLSearchParams({ interes: `${productLabels[config.product]} · Estudio 3D`, mensaje: summary });
    return `/contacto?${params.toString()}`;
  }, [config, notes]);

  return (
    <section id="configurador" aria-labelledby="studio-title" className="mx-auto max-w-[1560px] scroll-mt-28 px-3 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="border border-black/15 bg-[#f8f5ef] shadow-[0_34px_100px_rgba(24,20,15,0.12)]">
        <div className="grid gap-6 border-b border-black/12 px-5 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#746e66]">Estudio 3D ELEM</p>
            <h2 id="studio-title" className="mt-3 max-w-4xl font-serif text-4xl leading-[0.95] sm:text-5xl">Construye el elemento mientras lo observas.</h2>
          </div>
          <div className="max-w-lg lg:text-right">
            <p className="text-sm leading-7 text-[#625c54]">Gira el modelo, cambia sus proporciones y combina cada parte. No necesitas conocer términos técnicos.</p>
            <p className="mt-2 text-[0.58rem] uppercase tracking-[0.16em] text-[#8a8278]">Visualización conceptual · No reemplaza planos técnicos</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-black/12 bg-white" aria-label="Tipo de elemento">
          {(Object.keys(productLabels) as StudioProduct[]).map((product) => (
            <button key={product} type="button" aria-pressed={config.product === product} onClick={() => switchProduct(product)} className={`min-h-16 border-r border-black/10 px-3 py-4 text-center transition last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] ${config.product === product ? 'bg-[#171717] text-white' : 'hover:bg-[#f1ece4]'}`}>
              <span className="block text-[0.6rem] uppercase tracking-[0.2em]">{productLabels[product]}</span>
              <span className={`mt-1 hidden text-[0.65rem] sm:block ${config.product === product ? 'text-white/55' : 'text-[#817970]'}`}>{formats[product].length} formatos · {modules[product].length} elementos</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="relative isolate min-h-[34rem] overflow-hidden border-b border-black/12 bg-[#d9d4cb] lg:min-h-[48rem] lg:border-b-0 lg:border-r">
            <div className="absolute left-3 top-3 z-10 max-w-[13rem] border border-white/15 bg-[#171717]/96 px-3 py-2.5 text-white shadow-lg sm:left-5 sm:top-5 sm:max-w-[15rem] sm:px-4 sm:py-3">
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/52">Ahora editas</p>
              <p className="mt-1 font-serif text-2xl">{productLabels[config.product]}</p>
              <p className="mt-1 hidden text-[0.64rem] leading-5 text-white/62 sm:block">Arrastra horizontalmente para girar · cambia la vista desde los controles</p>
            </div>

            <div className="absolute right-3 top-3 z-10 flex border border-black/15 bg-[#f8f5ef]/92 p-1 shadow-lg backdrop-blur-sm sm:right-5 sm:top-5" aria-label="Vistas del modelo">
              {viewOptions.map((option) => (
                <button key={option.id} type="button" aria-pressed={view === option.id} onClick={() => setView(option.id)} className={`min-h-10 px-3 text-[0.52rem] uppercase tracking-[0.14em] transition ${view === option.id ? 'bg-[#171717] text-white' : 'text-[#625c55] hover:bg-white'}`}>
                  <span className="hidden sm:inline">{option.label}</span><span className="sm:hidden">{option.id === 'perspectiva' ? '3D' : option.id === 'frontal' ? 'Frente' : 'Arriba'}</span>
                </button>
              ))}
            </div>

            <ThreeStudioViewport config={config} view={view} sceneMode={sceneMode} />

            <div className="absolute inset-x-3 bottom-3 z-10 flex flex-wrap items-center justify-between gap-2 border border-black/15 bg-[#f8f5ef]/94 px-3 py-2 shadow-xl backdrop-blur-sm sm:inset-x-5 sm:bottom-5 sm:px-4">
              <div className="flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.14em] text-[#5e5851]">
                <span className="inline-flex items-center gap-1.5"><Ruler size={13} aria-hidden="true" /> {config.width.toFixed(1)} × {config.depth.toFixed(2)} × {config.height.toFixed(2)} m</span>
              </div>
              <div className="flex items-center border-l border-black/10 pl-2">
                <button type="button" onClick={() => setSceneMode('dia')} aria-pressed={sceneMode === 'dia'} aria-label="Iluminación de día" className={`grid h-10 w-10 place-items-center ${sceneMode === 'dia' ? 'bg-[#171717] text-white' : 'text-[#625c55] hover:bg-white'}`}><Sun size={15} /></button>
                <button type="button" onClick={() => setSceneMode('noche')} aria-pressed={sceneMode === 'noche'} aria-label="Iluminación de noche" className={`grid h-10 w-10 place-items-center ${sceneMode === 'noche' ? 'bg-[#171717] text-white' : 'text-[#625c55] hover:bg-white'}`}><Moon size={15} /></button>
              </div>
            </div>
          </div>

          <aside aria-label="Controles del Estudio 3D" className="flex min-h-0 flex-col bg-[#f8f5ef]">
            <div className="flex items-center justify-between border-b border-black/12 px-5 py-3">
              <div className="flex items-center gap-1">
                <ToolbarButton label="Deshacer" disabled={timeline.index === 0} onClick={undo}><Undo2 size={14} /></ToolbarButton>
                <ToolbarButton label="Rehacer" disabled={timeline.index === timeline.items.length - 1} onClick={redo}><Redo2 size={14} /></ToolbarButton>
              </div>
              <ToolbarButton label="Reiniciar" onClick={reset}><RotateCcw size={14} /></ToolbarButton>
            </div>

            <div className="divide-y divide-black/12 lg:max-h-[42rem] lg:overflow-y-auto">
              <ControlSection icon={<Box size={15} />} title="Formato" description="Define la composición general.">
                <div className="grid grid-cols-3 gap-2">
                  {formats[config.product].map((option) => (
                    <button key={option.id} type="button" aria-pressed={config.format === option.id} onClick={() => commit({ format: option.id })} className={`min-h-20 border p-3 text-left transition ${config.format === option.id ? 'border-[#171717] bg-white shadow-[0_8px_20px_rgba(20,16,10,0.08)]' : 'border-black/12 bg-[#f1ece4] hover:border-black/35'}`}>
                      <span className="block text-[0.66rem] font-medium">{option.label}</span>
                      <span className="mt-1 block text-[0.55rem] leading-4 text-[#777067]">{option.description}</span>
                    </button>
                  ))}
                </div>
              </ControlSection>

              <ControlSection icon={<Ruler size={15} />} title="Medidas" description="Mueve cada control y observa el cambio.">
                <div className="space-y-5">
                  {(Object.keys(dimensionRules[config.product]) as Array<'width' | 'depth' | 'height'>).map((dimension) => {
                    const rule = dimensionRules[config.product][dimension];
                    return (
                      <label key={dimension} className="block">
                        <span className="flex items-center justify-between gap-4 text-xs"><span>{rule.label}</span><output className="tabular-nums text-[#625c55]">{config[dimension].toFixed(2)} m</output></span>
                        <input type="range" min={rule.min} max={rule.max} step={rule.step} value={config[dimension]} onChange={(event) => commit({ [dimension]: Number(event.target.value) })} className="mt-3 h-1.5 w-full cursor-pointer appearance-none bg-[#d6d0c7] accent-[#171717]" />
                        <span className="mt-1 flex justify-between text-[0.52rem] text-[#918980]"><span>{rule.min} m</span><span>{rule.max} m</span></span>
                      </label>
                    );
                  })}
                </div>
              </ControlSection>

              <ControlSection icon={<SlidersHorizontal size={15} />} title="Elementos" description="Activa o retira piezas directamente.">
                <div className="grid grid-cols-2 gap-2">
                  {modules[config.product].map((option) => {
                    const selected = Boolean(config.modules[option.id]);
                    return (
                      <button key={option.id} type="button" aria-pressed={selected} onClick={() => toggleModule(option.id)} className={`min-h-20 border p-3 text-left transition ${selected ? 'border-[#2f4a36] bg-[#edf1eb]' : 'border-black/12 bg-white hover:border-black/35'}`}>
                        <span className="flex items-start justify-between gap-2"><span className="text-[0.66rem] font-medium">{option.label}</span><span className={`grid h-4 w-4 place-items-center border ${selected ? 'border-[#2f4a36] bg-[#2f4a36] text-white' : 'border-black/20 text-transparent'}`}><Check size={10} /></span></span>
                        <span className="mt-1 block text-[0.55rem] leading-4 text-[#777067]">{option.description}</span>
                      </button>
                    );
                  })}
                </div>
              </ControlSection>

              <ControlSection icon={<Eye size={15} />} title="Materia" description="Compara el carácter del conjunto.">
                <div className="grid grid-cols-2 gap-2">
                  {finishOptions.map((option) => (
                    <button key={option.id} type="button" aria-pressed={config.finish === option.id} onClick={() => commit({ finish: option.id })} className={`flex min-h-16 items-center gap-3 border p-3 text-left transition ${config.finish === option.id ? 'border-[#171717] bg-white' : 'border-black/12 bg-[#f1ece4] hover:border-black/35'}`}>
                      <span aria-hidden="true" className="h-8 w-8 shrink-0 border border-black/15" style={{ background: option.id === 'piedra' ? 'linear-gradient(135deg,#d8d2c8 0 48%,#4b4e4c 49% 100%)' : option.swatch }} />
                      <span><span className="block text-[0.64rem] font-medium">{option.label}</span><span className="mt-0.5 block text-[0.52rem] text-[#777067]">{option.detail}</span></span>
                    </button>
                  ))}
                </div>
              </ControlSection>

              <ControlSection icon={<Rotate3D size={15} />} title="Tu idea" description="Añade un dato que no se vea en el modelo.">
                <textarea value={notes} onChange={(event) => setNotes(event.target.value.slice(0, 360))} maxLength={360} placeholder="Ejemplo: terraza techada, ocho personas y conexiones existentes." className="min-h-24 w-full resize-y border border-black/15 bg-white px-3 py-3 text-xs leading-6 outline-none transition placeholder:text-[#9a9288] focus:border-black/55" />
              </ControlSection>
            </div>

            <div className="mt-auto border-t border-black/12 bg-white p-5">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[0.6rem]">
                <SummaryLine label="Elemento" value={productLabels[config.product]} />
                <SummaryLine label="Formato" value={activeFormat?.label ?? config.format} />
                <SummaryLine label="Acabado" value={activeFinish?.label ?? config.finish} />
                <SummaryLine label="Piezas activas" value={String(selectedModules.length)} />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-[auto_1fr] lg:grid-cols-1 xl:grid-cols-[auto_1fr]">
                <button type="button" onClick={saveLocally} className="inline-flex min-h-12 items-center justify-center gap-2 border border-black/15 px-4 text-[0.58rem] uppercase tracking-[0.16em] transition hover:border-black/40"><Save size={14} /> {saved ? 'Guardado' : 'Guardar'}</button>
                <Link href={contactHref} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#171717] px-5 text-[0.58rem] uppercase tracking-[0.17em] text-white transition hover:bg-black">Solicitar propuesta <ArrowRight size={14} /></Link>
              </div>
              <p className="mt-3 text-[0.56rem] leading-5 text-[#777067]">ELEM confirmará medidas, factibilidad y cotización antes de diseñar o fabricar.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ControlSection({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center border border-black/15 text-[#625c55]">{icon}</span>
        <div><h3 className="text-xs font-medium uppercase tracking-[0.16em]">{title}</h3><p className="mt-1 text-[0.62rem] leading-5 text-[#777067]">{description}</p></div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ToolbarButton({ label, onClick, disabled = false, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex min-h-10 items-center gap-1.5 px-2.5 text-[0.54rem] uppercase tracking-[0.13em] text-[#625c55] transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-25">{children}<span className="hidden sm:inline">{label}</span></button>;
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-black/10 pb-2"><p className="text-[0.5rem] uppercase tracking-[0.14em] text-[#8a8278]">{label}</p><p className="mt-1 truncate text-[#3f3a35]">{value}</p></div>;
}
