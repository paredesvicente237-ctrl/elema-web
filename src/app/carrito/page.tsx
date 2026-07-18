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
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Carrito</p>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">Tu selección.</h1>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="border border-black/10 bg-[#f8f5ef] p-8 text-[#625c55]">
                <p className="font-serif text-3xl text-[#171717]">El carrito está vacío.</p>
                <p className="mt-3 text-sm leading-7">Explora la tienda y agrega las piezas que quieras comprar.</p>
                <Link href="/tienda" className="mt-6 inline-flex border border-black/20 px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#171717]">Continuar comprando</Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 border border-black/10 bg-[#f8f5ef] p-5 transition hover:bg-white sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#8a837a]">{item.customizable ? 'Personalizable' : 'Disponible'}</p>
                    <h2 className="mt-2 font-serif text-3xl">{item.name}</h2>
                    <p className="mt-2 text-sm text-[#625c55]">CLP {item.price?.toLocaleString('es-CL')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} className="w-20 border border-black/15 bg-white px-3 py-2" />
                    <button onClick={() => removeItem(item.id)} className="border border-black/15 p-3 text-[#625c55] transition hover:border-black/35 hover:text-black" aria-label={`Eliminar ${item.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(20,16,10,0.08)]">
            <h2 className="font-serif text-3xl">Resumen</h2>
            <div className="mt-6 space-y-4 text-sm text-[#625c55]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>CLP {subtotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Despacho</span>
                <span>Por cotizar</span>
              </div>
            </div>
            {items.length > 0 ? <><p className="mt-7 text-xs leading-6 text-[#77716a]">El siguiente paso envía una solicitud de compra. No se realizará un cobro todavía.</p><Link href="/checkout" className="mt-4 inline-flex w-full items-center justify-center bg-[#171717] px-5 py-3.5 text-xs uppercase tracking-[0.18em] text-white">Continuar solicitud</Link></> : null}
            <Link href="/tienda" className="mt-3 inline-flex w-full items-center justify-center border border-black/20 px-5 py-3.5 text-xs uppercase tracking-[0.18em]">Continuar comprando</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
