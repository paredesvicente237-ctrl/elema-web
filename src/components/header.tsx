"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';

const navItems = [
  { label: 'Colecciones', href: '/colecciones' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Diseño a medida', href: '/diseno-a-medida' },
  { label: 'Profesionales', href: '/profesionales' },
  { label: 'Nosotros', href: '/nosotros' },
];

const leftItems = navItems.slice(0, 3);
const rightItems = navItems.slice(3);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const stored = window.localStorage.getItem('elema-cart');
      if (!stored) return setCartCount(0);

      try {
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed)) return setCartCount(0);

        setCartCount(parsed.reduce((sum: number, item: unknown) => {
          if (typeof item !== 'object' || item === null || !('quantity' in item)) return sum;
          const quantity = Number(item.quantity);
          return Number.isFinite(quantity) && quantity > 0 ? sum + quantity : sum;
        }, 0));
      } catch {
        setCartCount(0);
      }
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('cart:updated', updateCount);
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('cart:updated', updateCount);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || pathname !== '/' ? 'border-b border-white/10 bg-[#0b0d12]/90 shadow-[0_10px_45px_rgba(0,0,0,0.24)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="relative mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <nav className="hidden flex-1 items-center gap-6 text-[0.72rem] uppercase tracking-[0.32em] text-[#d7d0c7] lg:flex">
          {leftItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#f4efe6]" aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2.5 sm:gap-3">
          <Image
            src="/brand/elema-logo-transparent.png"
            alt=""
            width={650}
            height={610}
            className="h-8 w-auto shrink-0 brightness-0 invert sm:h-10"
            priority
          />
          <span className="font-serif text-[1.3rem] uppercase tracking-[0.5em] text-[#f4efe6] sm:text-[1.45rem]">
            ELEMA
          </span>
        </Link>

        <div className="ml-auto hidden flex-1 items-center justify-end gap-3 lg:flex">
          {rightItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[0.72rem] uppercase tracking-[0.32em] text-[#d7d0c7] transition hover:text-[#f4efe6]" aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <Link href="/buscar" className="rounded-full border border-white/10 p-2.5 text-[#d7d0c7] transition hover:border-white/20 hover:text-[#f4efe6]" aria-label="Buscar">
            <Search size={16} />
          </Link>
          <Link href="/contacto" className="rounded-full border border-white/10 p-2.5 text-[#d7d0c7] transition hover:border-white/20 hover:text-[#f4efe6]" aria-label="Cuenta">
            <UserRound size={16} />
          </Link>
          <Link href="/carrito" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-[#d7d0c7] transition hover:border-white/20 hover:text-[#f4efe6]" aria-label="Carrito">
            <ShoppingBag size={16} />
            <span>{cartCount}</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:hidden">
          <Link href="/carrito" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-[#d7d0c7] transition hover:border-white/20 hover:text-[#f4efe6]" aria-label="Carrito">
            <ShoppingBag size={16} />
            <span>{cartCount}</span>
          </Link>
          <button
            className="rounded-full border border-white/10 p-2.5 text-[#d7d0c7] lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#0b0d12]/95 px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-3 text-[0.72rem] uppercase tracking-[0.3em] text-[#d7d0c7]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#f4efe6]" aria-current={isActive(item.href) ? 'page' : undefined} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/buscar" className="flex items-center gap-2 pt-2" onClick={() => setOpen(false)}>
              <Search size={16} /> Buscar
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
