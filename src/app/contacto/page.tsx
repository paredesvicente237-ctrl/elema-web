"use client";

import { useState } from 'react';

const clientTypes = ['Particular', 'Arquitecto', 'Diseñador', 'Constructora', 'Inmobiliaria'];
const projectTypes = ['Residencia', 'Proyecto comercial', 'Interiorismo', 'Exterior', 'Otro'];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Contacto</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Solicitar una propuesta.</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">Este formulario está preparado para la siguiente integración comercial. Por ahora valida en frontend y muestra un estado de demostración.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-elema-silver">Nombre<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" required /></label>
            <label className="text-sm text-elema-silver">Apellido<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" required /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-elema-silver">Correo<input type="email" className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" required /></label>
            <label className="text-sm text-elema-silver">Teléfono<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-elema-silver">Región<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
            <label className="text-sm text-elema-silver">Comuna<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-elema-silver">Tipo de cliente<select className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3"><option value="">Seleccionar</option>{clientTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
            <label className="text-sm text-elema-silver">Tipo de proyecto<select className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3"><option value="">Seleccionar</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
          </div>
          <label className="mt-4 block text-sm text-elema-silver">Producto de interés<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-elema-silver">Presupuesto aproximado<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
            <label className="text-sm text-elema-silver">Fecha estimada<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
          </div>
          <label className="mt-4 block text-sm text-elema-silver">Mensaje<textarea className="mt-2 min-h-32 w-full rounded-[1.5rem] border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
          <label className="mt-4 flex items-start gap-3 text-sm text-elema-silver"><input type="checkbox" className="mt-1" required /><span>Acepto la política de privacidad provisional para esta demostración.</span></label>
          <button type="submit" className="mt-6 rounded-full bg-elema-warm px-5 py-3 text-sm font-medium text-elema-black">Enviar propuesta</button>
          {submitted ? <p className="mt-4 text-sm text-elema-steel">Estado de demostración: el formulario se validó en frontend y aún no envía información real.</p> : null}
        </form>
      </div>
    </main>
  );
}
