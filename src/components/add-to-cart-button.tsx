'use client';

import { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';

type AddToCartButtonProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    customizable?: boolean;
  };
  className?: string;
};

type CartItem = AddToCartButtonProps['product'] & { quantity: number };

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const stored = window.localStorage.getItem('elema-cart');
    let cart: CartItem[] = [];

    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) cart = parsed as CartItem[];
      } catch {
        cart = [];
      }
    }

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const currentQuantity = Number.isFinite(Number(existing.quantity)) ? Number(existing.quantity) : 0;
      existing.quantity = Math.min(20, Math.max(1, Math.trunc(currentQuantity) + 1));
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    window.localStorage.setItem('elema-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart:updated'));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={addToCart}
      aria-live="polite"
      className={`inline-flex min-h-12 items-center justify-center gap-2 bg-[#171717] px-5 py-3 text-center text-xs uppercase tracking-[0.22em] text-[#f6efe6] transition-colors hover:bg-[#303030] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717] ${className}`}
    >
      {added ? <Check size={15} /> : <ShoppingBag size={15} />}
      {added ? 'Elemento añadido' : 'Adquirir elemento'}
    </button>
  );
}
