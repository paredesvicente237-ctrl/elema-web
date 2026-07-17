"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price?: number;
  quantity: number;
};

export default function CheckoutPage() {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('elema-cart');
    if (stored) setItems(JSON.parse(stored));
    setReady(true);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);

  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Checkout</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Finaliza tu pedido.</h1>
          <p className="mt-6 text-lg leading-8 text-elema-silver">Revisa tu selección y déjanos tus datos. La integración de pagos aún no está activada.</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-6">
            <h2 className="text-2xl font-semibold text-elema-warm">Resumen de compra</h2>
            <div className="mt-6 space-y-3 text-sm text-elema-silver">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-elema-steel/20 px-4 py-3">
                  <span>{item.name} × {item.quantity}</span>
                  <span>CLP {((item.price ?? 0) * item.quantity).toLocaleString('es-CL')}</span>
                </div>
              ))}
              {ready && items.length === 0 ? <p>Tu carrito está vacío.</p> : null}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-elema-steel/20 pt-5 text-elema-warm">
              <span>Subtotal</span><span>CLP {subtotal.toLocaleString('es-CL')}</span>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-elema-steel/20 bg-elema-black/60 p-4 text-sm leading-7 text-elema-silver">
              <p>Modo: demostración</p>
              <p className="mt-2">No se procesará ningún pago real en esta etapa.</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-6">
            <h2 className="text-2xl font-semibold text-elema-warm">Información de contacto</h2>
            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-elema-silver">Nombre<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
                <label className="text-sm text-elema-silver">Apellido<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
              </div>
              <label className="text-sm text-elema-silver">Correo<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
              <label className="text-sm text-elema-silver">Teléfono<input className="mt-2 w-full rounded-full border border-elema-steel/30 bg-elema-black px-4 py-3" /></label>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" className="rounded-full bg-elema-warm px-5 py-3 text-sm font-medium text-elema-black">Confirmar pedido</button>
                <Link href="/carrito" className="text-sm text-elema-silver">Volver al carrito</Link>
              </div>
              {ready ? <p className="text-sm text-elema-steel">Esta vista es de demostración y no enviará información real.</p> : null}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
