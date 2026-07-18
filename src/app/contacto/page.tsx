"use client";

import { useState } from 'react';
import Image from 'next/image';

const clientTypes = ['Particular', 'Arquitecto', 'Diseñador', 'Constructora', 'Inmobiliaria'];
const projectTypes = ['Residencia', 'Proyecto comercial', 'Interiorismo', 'Exterior', 'Otro'];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hola, quiero conversar sobre un proyecto ELEMA.',
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
    setSubmitted(true);
    window.open(`https://wa.me/56930751812?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Contacto</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">Solicitar una propuesta.</h1>
          <p className="mt-6 text-lg leading-8 text-[#57514b]">Cuéntanos qué quieres fabricar. Revisaremos alcance, materialidad, factibilidad y próximos pasos para preparar una propuesta.</p>
          <a href="https://wa.me/56930751812" target="_blank" rel="noreferrer" className="mt-8 inline-flex border-b border-black/35 pb-1 text-sm uppercase tracking-[0.25em]">WhatsApp · +56 9 3075 1812</a>
          <div className="mt-10 overflow-hidden border border-black/10 bg-[#e3ddd3] shadow-[0_24px_70px_rgba(20,16,10,0.10)]">
            <Image src="/images/editorial-contacto.jpg" alt="Terraza contemporánea con parrilla y mobiliario metálico" width={1792} height={895} className="aspect-[16/10] w-full object-cover" priority />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border border-black/10 bg-[#f8f5ef] p-6 shadow-[0_24px_70px_rgba(20,16,10,0.08)] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Nombre<input name="nombre" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" required /></label>
            <label className="text-sm text-[#57514b]">Apellido<input name="apellido" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" required /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Correo<input name="correo" type="email" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" required /></label>
            <label className="text-sm text-[#57514b]">Teléfono<input name="telefono" type="tel" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Región<input name="region" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
            <label className="text-sm text-[#57514b]">Comuna<input name="comuna" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Tipo de cliente<select name="cliente" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50"><option value="">Seleccionar</option>{clientTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
            <label className="text-sm text-[#57514b]">Tipo de proyecto<select name="proyecto" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50"><option value="">Seleccionar</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
          </div>
          <label className="mt-4 block text-sm text-[#57514b]">Producto de interés<input name="interes" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[#57514b]">Presupuesto aproximado<input name="presupuesto" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
            <label className="text-sm text-[#57514b]">Fecha estimada<input name="fecha" className="mt-2 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          </div>
          <label className="mt-4 block text-sm text-[#57514b]">Mensaje<textarea name="mensaje" className="mt-2 min-h-32 w-full border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black/50" /></label>
          <label className="mt-4 flex items-start gap-3 text-sm text-[#625c55]"><input type="checkbox" className="mt-1 accent-[#171717]" required /><span>Acepto la política de privacidad y el contacto por WhatsApp.</span></label>
          <button type="submit" className="mt-6 bg-[#171717] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white">Enviar por WhatsApp</button>
          {submitted ? <p className="mt-4 text-sm text-[#77716a]">Abrimos WhatsApp con los datos de tu proyecto listos para enviar.</p> : null}
        </form>
      </div>
    </main>
  );
}
