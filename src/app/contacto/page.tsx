"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const clientTypes = ['Particular', 'Arquitecto', 'Diseñador', 'Constructora', 'Inmobiliaria'];
const projectTypes = ['Residencia', 'Proyecto comercial', 'Interiorismo', 'Exterior', 'Otro'];
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('https://wa.me/56930751812');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextWhatsappUrl = buildWhatsappUrl(data);
    setWhatsappUrl(nextWhatsappUrl);
    setSubmitState('submitting');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.get('nombre'),
          lastName: data.get('apellido'),
          email: data.get('correo'),
          phone: data.get('telefono'),
          region: data.get('region'),
          commune: data.get('comuna'),
          clientType: data.get('cliente'),
          projectType: data.get('proyecto'),
          interest: data.get('interes'),
          budget: data.get('presupuesto'),
          estimatedDate: data.get('fecha'),
          message: data.get('mensaje'),
          privacyAccepted: data.get('privacidad') === 'on',
          website: data.get('website'),
        }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };

      if (!response.ok) {
        setSubmitState('error');
        setFeedback(result.error ?? 'No pudimos enviar la consulta. Puedes continuar por WhatsApp.');
        return;
      }

      form.reset();
      setSubmitState('success');
      setFeedback('Recibimos los elementos de tu proyecto. El equipo ELEM revisará la consulta y se pondrá en contacto contigo.');
    } catch {
      setSubmitState('error');
      setFeedback('No pudimos conectar con el canal de contacto. Puedes continuar por WhatsApp.');
    }
  };

  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Los elementos de tu proyecto</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">Cuéntanos qué elementos darán forma al espacio.</h1>
          <p className="mt-6 text-lg leading-8 text-[#57514b]">Revisaremos uso, escala, materia, fuego, aire y factibilidad para ordenar cada elemento en una propuesta ELEM.</p>
          <a href="https://wa.me/56930751812" target="_blank" rel="noreferrer" className="mt-8 inline-flex border-b border-black/35 pb-1 text-sm uppercase tracking-[0.25em]">WhatsApp · +56 9 3075 1812</a>
          <div className="mt-10 overflow-hidden border border-black/10 bg-[#e3ddd3] shadow-[0_24px_70px_rgba(20,16,10,0.10)]">
            <Image src="/images/editorial-contacto.jpg" alt="Terraza contemporánea con parrilla y mobiliario metálico" width={1792} height={895} className="aspect-[16/10] w-full object-cover" priority />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="relative border border-black/10 bg-[#f8f5ef] p-6 shadow-[0_24px_70px_rgba(20,16,10,0.08)] sm:p-8" aria-busy={submitState === 'submitting'}>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Nombre<input name="nombre" autoComplete="given-name" minLength={2} maxLength={80} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" required /></label>
            <label className="text-sm text-[#57514b]">Apellido<input name="apellido" autoComplete="family-name" minLength={2} maxLength={80} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" required /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Correo<input name="correo" type="email" autoComplete="email" maxLength={254} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" required /></label>
            <label className="text-sm text-[#57514b]">Teléfono<input name="telefono" type="tel" autoComplete="tel" maxLength={30} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Región<input name="region" autoComplete="address-level1" maxLength={100} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
            <label className="text-sm text-[#57514b]">Comuna<input name="comuna" autoComplete="address-level2" maxLength={100} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Tipo de cliente<select name="cliente" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50"><option value="">Seleccionar</option>{clientTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
            <label className="text-sm text-[#57514b]">Tipo de proyecto<select name="proyecto" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50"><option value="">Seleccionar</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
          </div>
          <label className="mt-4 block text-sm text-[#57514b]">Elemento de interés<input name="interes" maxLength={160} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Presupuesto aproximado<input name="presupuesto" maxLength={100} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
            <label className="text-sm text-[#57514b]">Fecha estimada<input name="fecha" maxLength={100} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          </div>
          <label className="mt-4 block text-sm text-[#57514b]">Mensaje<textarea name="mensaje" maxLength={1200} className="mt-2 min-h-32 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          <label className="mt-4 flex min-h-11 items-start gap-3 text-sm text-[#625c55]"><input name="privacidad" type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#171717]" required /><span>Acepto la <Link href="/privacidad" className="underline underline-offset-4">política de privacidad</Link> y que ELEM me contacte por los datos indicados.</span></label>
          <button type="submit" disabled={submitState === 'submitting'} className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60">
            {submitState === 'submitting' ? 'Enviando consulta…' : 'Compartir los elementos'}
          </button>
          {feedback ? (
            <div role={submitState === 'error' ? 'alert' : 'status'} aria-live="polite" className={`mt-5 border px-4 py-4 text-sm leading-6 ${submitState === 'success' ? 'border-emerald-900/15 bg-emerald-50 text-emerald-950' : 'border-amber-900/15 bg-amber-50 text-amber-950'}`}>
              <p>{feedback}</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center border-b border-current text-xs uppercase tracking-[0.18em]">
                {submitState === 'success' ? 'Continuar por WhatsApp' : 'Compartir por WhatsApp'}
              </a>
            </div>
          ) : null}
        </form>
      </div>
    </main>
  );
}

function buildWhatsappUrl(data: FormData) {
  const message = [
    'Hola, quiero definir los elementos de un proyecto ELEM.',
    `Nombre: ${data.get('nombre')} ${data.get('apellido')}`,
    `Correo: ${data.get('correo')}`,
    `Teléfono: ${data.get('telefono') || 'No indicado'}`,
    `Ubicación: ${data.get('comuna') || 'No indicada'}, ${data.get('region') || 'región no indicada'}`,
    `Cliente: ${data.get('cliente') || 'No indicado'}`,
    `Proyecto: ${data.get('proyecto') || 'No indicado'}`,
    `Interés: ${data.get('interes') || 'No indicado'}`,
    `Presupuesto: ${data.get('presupuesto') || 'No indicado'}`,
    `Fecha estimada: ${data.get('fecha') || 'No indicada'}`,
    `Mensaje: ${data.get('mensaje') || 'Sin mensaje adicional'}`,
  ].join('\n');

  return `https://wa.me/56930751812?text=${encodeURIComponent(message)}`;
}
