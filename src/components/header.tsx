"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CircleUserRound, Menu, ShoppingBag, X } from 'lucide-react';

const navItems = [
  { label: 'Colecciones', href: '/colecciones' },
  { label: 'Piezas', href: '/tienda' },
  { label: 'A medida', href: '/diseno-a-medida' },
  { label: 'Estudio', href: '/nosotros' },
];

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

    // Remove any scroll lock left by an older menu implementation. The mobile
    // navigation is a dropdown, so the page should remain scrollable while it
    // is open and after every client-side route change.
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('overflow');
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f4f1ea]/95 text-[#171717] backdrop-blur-xl transition-shadow duration-500 ${scrolled ? 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]' : ''}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-7 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3" aria-label="ELEMA, inicio">
          <Image
            src="/brand/elema-logo-transparent.png"
            alt=""
            width={650}
            height={610}
            className="h-8 w-auto shrink-0 brightness-0 sm:h-9"
            priority
          />
          <span className="font-serif text-[1.25rem] uppercase tracking-[0.36em] text-[#171717] sm:text-[1.38rem]">
            ELEMA
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-8 text-[0.64rem] uppercase tracking-[0.2em] text-[#4f4b45] xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative py-2 transition hover:text-black after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-black after:transition-transform hover:after:scale-x-100" aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 border-l border-black/10 pl-4 xl:flex">
          <Link href="/mi-elema" className="inline-flex items-center gap-2 px-2 py-2.5 text-[#4f4b45] transition-colors hover:text-black" aria-label="Ingresar a Mi ELEMA">
            <CircleUserRound size={17} />
            <span className="text-[0.6rem] uppercase tracking-[0.16em]">Mi ELEMA</span>
          </Link>
          <Link href="/carrito" className="inline-flex items-center gap-2 border border-black/15 px-3 py-2.5 text-sm text-[#4f4b45] transition-colors hover:border-black/30 hover:text-black" aria-label={`Carrito, ${cartCount} piezas`}>
            <ShoppingBag size={16} />
            <span className="tabular-nums">{cartCount}</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 xl:hidden">
          <Link href="/carrito" className="inline-flex items-center gap-2 border border-black/15 px-3 py-2 text-sm text-[#4f4b45] transition hover:border-black/30 hover:text-black" aria-label="Carrito">
            <ShoppingBag size={16} />
            <span>{cartCount}</span>
          </Link>
          <button
            className="border border-black/15 p-2.5 text-[#4f4b45] xl:hidden"
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
        <div id="mobile-navigation" className="border-t border-black/10 bg-[#f4f1ea] px-4 py-5 xl:hidden">
          <div className="flex flex-col gap-4 text-[0.72rem] uppercase tracking-[0.3em] text-[#4f4b45]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-black" aria-current={isActive(item.href) ? 'page' : undefined} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contacto" className="border-t border-black/10 pt-4" onClick={() => setOpen(false)}>
              Iniciar un proyecto
            </Link>
            <Link href="/mi-elema" className="flex items-center gap-2 pt-2" onClick={() => setOpen(false)}>
              <CircleUserRound size={16} /> Mi ELEMA
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
