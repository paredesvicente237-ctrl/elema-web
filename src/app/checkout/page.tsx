'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';

type CartItem = { id: string; name: string; price?: number; quantity: number };

export default function CheckoutPage() {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0), [items]);

  useEffect(() => {
    const stored = window.localStorage.getItem('elema-cart');
    if (stored) setItems(JSON.parse(stored));
    setReady(true);
  }, []);

  const sendOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const detail = items.map((item) => `• ${item.name} × ${item.quantity}: $${((item.price ?? 0) * item.quantity).toLocaleString('es-CL')}`).join('\n');
    const message = [
      'Hola, quiero solicitar la compra de este pedido ELEMA:', detail,
      `Subtotal: $${subtotal.toLocaleString('es-CL')} CLP`,
      `Nombre: ${data.get('nombre')} ${data.get('apellido')}`,
      `Correo: ${data.get('correo')}`, `Teléfono: ${data.get('telefono')}`,
      `Región y comuna: ${data.get('region')}, ${data.get('comuna')}`,
      `Dirección: ${data.get('direccion')}`, `Notas: ${data.get('notas') || 'Sin notas'}`,
      'Entiendo que el despacho y el pago serán coordinados con ELEMA.',
    ].join('\n');
    window.open(`https://wa.me/56930751812?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  if (ready && items.length === 0) {
    return <main className="grid min-h-screen place-items-center bg-[#0b0b0b] px-4 pt-20 text-[#f6efe6]"><div className="max-w-lg text-center"><p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#8f9296]">Pedido</p><h1 className="mt-5 font-serif text-5xl">Tu carrito está vacío.</h1><Link href="/tienda" className="mt-8 inline-flex border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.24em]">Explorar tienda</Link></div></main>;
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 pb-24 pt-32 text-[#f6efe6] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <Link href="/carrito" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#aeb0b3]"><ArrowLeft size={14} /> Volver al carrito</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <section>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#8f9296]">Resumen</p>
            <h1 className="mt-4 font-serif text-5xl">Finaliza tu solicitud.</h1>
            <p className="mt-5 text-sm leading-7 text-[#bfc3c7]">Hasta habilitar el pago con tarjetas, ELEMA confirmará disponibilidad, despacho y forma de pago directamente contigo.</p>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {items.map((item) => <div key={item.id} className="flex justify-between gap-4 py-5 text-sm"><span>{item.name} × {item.quantity}</span><span>${((item.price ?? 0) * item.quantity).toLocaleString('es-CL')}</span></div>)}
            </div>
            <div className="flex justify-between py-5 font-serif text-2xl"><span>Subtotal</span><span>${subtotal.toLocaleString('es-CL')} CLP</span></div>
            <p className="text-xs leading-6 text-[#8f9296]">El despacho no está incluido y se cotiza según destino y condiciones de acceso.</p>
          </section>
          <form onSubmit={sendOrder} className="border border-white/15 bg-[#151515] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">Datos de contacto y entrega</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" name="nombre" required /><Field label="Apellido" name="apellido" required />
              <Field label="Correo" name="correo" type="email" required /><Field label="Teléfono" name="telefono" type="tel" required />
              <Field label="Región" name="region" required /><Field label="Comuna" name="comuna" required />
            </div>
            <div className="mt-5"><Field label="Dirección de entrega" name="direccion" required /></div>
            <label className="mt-5 block text-sm text-[#bfc3c7]">Notas del pedido<textarea name="notas" className="mt-2 min-h-28 w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 text-[#f6efe6] outline-none focus:border-white/40" /></label>
            <label className="mt-5 flex items-start gap-3 text-xs leading-6 text-[#bfc3c7]"><input type="checkbox" required className="mt-1" /><span>Acepto la política de privacidad y que ELEMA me contacte para coordinar este pedido.</span></label>
            <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#f4f1ea] px-5 py-4 text-xs uppercase tracking-[0.22em] text-[#171717]"><MessageCircle size={16} /> Solicitar compra por WhatsApp</button>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block text-sm text-[#bfc3c7]">{label}<input name={name} type={type} required={required} className="mt-2 w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 text-[#f6efe6] outline-none focus:border-white/40" /></label>;
}
