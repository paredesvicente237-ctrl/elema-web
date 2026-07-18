'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, LockKeyhole, MessageCircle } from 'lucide-react';
import { formatClp } from '@/lib/orders';

type CartItem = { id: string; name: string; price?: number; quantity: number };
type CreatedOrder = { id: string; orderNumber: string; subtotal: number };

export default function CheckoutPage() {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsLogin, setNeedsLogin] = useState(false);
  const [order, setOrder] = useState<CreatedOrder | null>(null);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0), [items]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('elema-cart');
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed as CartItem[]);
      }
    } finally { setReady(true); }
  }, []);

  async function sendOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(''); setNeedsLogin(false);
    const data = new FormData(event.currentTarget);
    const response = await fetch('/api/orders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(({ id, quantity }) => ({ id, quantity })),
        firstName: data.get('nombre'), lastName: data.get('apellido'), email: data.get('correo'), phone: data.get('telefono'),
        region: data.get('region'), commune: data.get('comuna'), address: data.get('direccion'),
        notes: data.get('notas'), marketingOptIn: data.get('marketing') === 'on',
      }),
    });
    const result = await response.json().catch(() => ({})) as CreatedOrder & { error?: string; code?: string };
    if (!response.ok) {
      setError(result.error ?? 'No pudimos guardar tu pedido.');
      setNeedsLogin(result.code === 'AUTH_REQUIRED');
    } else {
      window.localStorage.removeItem('elema-cart');
      window.dispatchEvent(new Event('cart:updated'));
      setOrder(result);
    }
    setLoading(false);
  }

  if (order) {
    const detail = items.map((item) => `• ${item.name} × ${item.quantity}`).join('\n');
    const whatsapp = `https://wa.me/56930751812?text=${encodeURIComponent(`Hola, quiero coordinar mi pedido ELEMA ${order.orderNumber}:\n${detail}\nSubtotal: ${formatClp(order.subtotal)}`)}`;
    return <main className="grid min-h-screen place-items-center bg-[#eee8de] px-4 pb-20 pt-28 text-[#171717]"><section className="w-full max-w-2xl border border-black/10 bg-[#f8f5ef] p-8 text-center shadow-[0_30px_80px_rgba(20,16,10,0.12)] sm:p-14"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#171717] text-white"><Check size={23} /></span><p className="mt-7 text-[0.68rem] uppercase tracking-[0.32em] text-[#77716a]">Pedido {order.orderNumber}</p><h1 className="mt-4 font-serif text-5xl sm:text-6xl">Solicitud recibida.</h1><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#69635d]">Guardamos tu pedido en Mi ELEMA. Ahora puedes revisar su avance y recibir la confirmación del equipo.</p><div className="mt-8 grid gap-3 sm:grid-cols-2"><Link href={`/mi-elema/pedidos/${order.id}`} className="inline-flex items-center justify-center gap-2 bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.18em] text-white">Ver mi pedido <ArrowRight size={14} /></Link><a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border border-black/20 px-5 py-4 text-xs uppercase tracking-[0.18em]"><MessageCircle size={15} /> Coordinar por WhatsApp</a></div></section></main>;
  }

  if (ready && items.length === 0) return <main className="grid min-h-screen place-items-center bg-[#eee8de] px-4 pb-20 pt-28 text-[#171717]"><div className="max-w-lg text-center"><p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#77716a]">Pedido</p><h1 className="mt-5 font-serif text-5xl">Tu carrito está vacío.</h1><Link href="/tienda" className="mt-8 inline-flex bg-[#171717] px-5 py-3 text-xs uppercase tracking-[0.24em] text-white">Explorar tienda</Link></div></main>;

  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-28 text-[#171717] sm:px-6 lg:px-8 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <Link href="/carrito" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#69635d]"><ArrowLeft size={14} /> Volver al carrito</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <section><p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#77716a]">Resumen</p><h1 className="mt-4 font-serif text-5xl sm:text-6xl">Confirma tu solicitud de compra.</h1><p className="mt-5 text-sm leading-7 text-[#69635d]">No se realizará un cobro al enviarla. ELEMA confirmará disponibilidad, despacho y forma de pago directamente contigo.</p><div className="mt-8 divide-y divide-black/10 border-y border-black/10">{items.map((item) => <div key={item.id} className="flex justify-between gap-4 py-5 text-sm"><span>{item.name} × {item.quantity}</span><span>{formatClp((item.price ?? 0) * item.quantity)}</span></div>)}</div><div className="flex justify-between py-5 font-serif text-2xl"><span>Subtotal estimado</span><span>{formatClp(subtotal)}</span></div><p className="text-xs leading-6 text-[#77716a]">El despacho no está incluido y se cotiza según destino y condiciones de acceso.</p><div className="mt-7 flex items-start gap-3 border-t border-black/10 pt-6 text-xs leading-6 text-[#69635d]"><LockKeyhole size={17} className="mt-0.5 shrink-0" /><p>Tu solicitud se asociará a una cuenta privada para que solo tú puedas consultar sus datos y seguimiento.</p></div></section>
          <form onSubmit={sendOrder} className="border border-black/10 bg-[#f8f5ef] p-6 shadow-[0_25px_70px_rgba(20,16,10,0.08)] sm:p-8"><h2 className="font-serif text-3xl">Contacto y entrega</h2><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Nombre" name="nombre" autoComplete="given-name" required /><Field label="Apellido" name="apellido" autoComplete="family-name" required /><Field label="Correo de tu cuenta" name="correo" type="email" autoComplete="email" required /><Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" required /><Field label="Región" name="region" autoComplete="address-level1" required /><Field label="Comuna" name="comuna" autoComplete="address-level2" required /></div><div className="mt-5"><Field label="Dirección de entrega" name="direccion" autoComplete="street-address" required /></div><label className="mt-5 block text-sm text-[#4e4943]">Notas de la solicitud<textarea name="notas" maxLength={800} className="mt-2 min-h-28 w-full border border-black/15 bg-white px-4 py-3 text-[#171717] outline-none focus:border-black/50" /></label><label className="mt-5 flex items-start gap-3 text-xs leading-6 text-[#69635d]"><input type="checkbox" required className="mt-1 accent-[#171717]" /><span>Acepto la <Link href="/privacidad" className="underline">política de privacidad</Link> y que ELEMA me contacte para coordinar esta solicitud.</span></label><label className="mt-4 flex items-start gap-3 text-xs leading-6 text-[#69635d]"><input name="marketing" type="checkbox" className="mt-1 accent-[#171717]" /><span>Quiero recibir por correo novedades, lanzamientos y beneficios de ELEMA. Es opcional y puedo cancelar cuando quiera.</span></label>{error ? <div role="alert" className="mt-5 border border-red-800/20 bg-red-50 p-4 text-sm text-red-900"><p>{error}</p>{needsLogin ? <Link href="/ingresar?next=/checkout" className="mt-3 inline-flex font-medium underline underline-offset-4">Volver a ingresar</Link> : null}</div> : null}<button disabled={loading || !ready} type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60">{loading ? 'Enviando solicitud…' : 'Enviar solicitud'} <ArrowRight size={15} /></button><p className="mt-3 text-center text-[0.66rem] leading-5 text-[#77716a]">Sin cobro en línea. El equipo ELEMA te contactará para confirmar los siguientes pasos.</p></form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, type = 'text', autoComplete, required = false }: { label: string; name: string; type?: string; autoComplete: string; required?: boolean }) { return <label className="block text-sm text-[#4e4943]">{label}<input name={name} type={type} autoComplete={autoComplete} required={required} className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-[#171717] outline-none focus:border-black/50" /></label>; }
