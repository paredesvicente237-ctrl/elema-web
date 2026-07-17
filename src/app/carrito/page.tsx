"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';

type CartItem = {
  id: string;
  slug?: string;
  name: string;
  price?: number;
  quantity: number;
  customizable?: boolean;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('elema-cart');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('elema-cart', JSON.stringify(items));
    window.dispatchEvent(new Event('cart:updated'));
  }, [items]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0), [items]);

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Carrito</p>
          <h1 className="mt-4 text-4xl font-semibold text-elema-warm sm:text-5xl">Tu selección.</h1>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8 text-elema-silver">
                <p className="text-lg text-elema-warm">El carrito está vacío.</p>
                <p className="mt-3 text-sm leading-7">Explora la tienda y agrega las piezas que quieras comprar.</p>
                <Link href="/tienda" className="mt-6 inline-flex rounded-full border border-elema-steel/40 px-5 py-3 text-sm text-elema-warm">Continuar comprando</Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-[1.75rem] border border-elema-steel/20 bg-elema-soft p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-elema-steel">{item.customizable ? 'Personalizable' : 'Disponible'}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-elema-warm">{item.name}</h2>
                    <p className="mt-2 text-sm text-elema-silver">CLP {item.price?.toLocaleString('es-CL')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} className="w-20 rounded-full border border-elema-steel/30 bg-elema-black px-3 py-2 text-elema-warm" />
                    <button onClick={() => removeItem(item.id)} className="rounded-full border border-elema-steel/30 p-3 text-elema-silver" aria-label={`Eliminar ${item.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-6">
            <h2 className="text-2xl font-semibold text-elema-warm">Resumen</h2>
            <div className="mt-6 space-y-4 text-sm text-elema-silver">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>CLP {subtotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Despacho</span>
                <span>Por cotizar</span>
              </div>
            </div>
            {items.length > 0 ? <Link href="/checkout" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-elema-warm px-5 py-3 text-sm font-medium text-elema-black">Avanzar al checkout</Link> : null}
            <Link href="/tienda" className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-elema-steel/40 px-5 py-3 text-sm text-elema-warm">Continuar comprando</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
