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
};

type CartItem = AddToCartButtonProps['product'] & { quantity: number };

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const stored = window.localStorage.getItem('elema-cart');
    const cart: CartItem[] = stored ? JSON.parse(stored) : [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
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
      className="inline-flex items-center justify-center gap-2 bg-[#171717] px-5 py-3 text-center text-xs uppercase tracking-[0.22em] text-[#f6efe6] transition hover:bg-[#303030]"
    >
      {added ? <Check size={15} /> : <ShoppingBag size={15} />}
      {added ? 'Agregada al carrito' : 'Agregar al carrito'}
    </button>
  );
}
