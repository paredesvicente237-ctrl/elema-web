'use client';

import { useEffect } from 'react';

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const ambientElements = Array.from(document.querySelectorAll<HTMLElement>('[data-ambient]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      ambientElements.forEach((element) => element.classList.add('is-ambient-active'));
      return;
    }

    // Deja preparado el contenido visible y el inmediatamente siguiente antes
    // de activar los estilos de entrada. Así un scroll rápido nunca muestra una
    // sección vacía mientras IntersectionObserver procesa el siguiente frame.
    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top <= window.innerHeight * 1.18 && bounds.bottom >= -window.innerHeight * 0.18) {
        element.classList.add('is-visible');
      }
    });

    root.classList.add('motion-enabled');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '18% 0px 18% 0px', threshold: 0.01 },
    );

    elements.forEach((element) => {
      const delay = Number(element.dataset.revealDelay ?? 0);
      if (delay > 0) element.style.transitionDelay = `${delay}ms`;
      observer.observe(element);
    });

    const ambientObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-ambient-active', entry.isIntersecting);
        });
      },
      { rootMargin: '12% 0px', threshold: 0.08 },
    );

    ambientElements.forEach((element) => ambientObserver.observe(element));

    return () => {
      observer.disconnect();
      ambientObserver.disconnect();
      root.classList.remove('motion-enabled');
    };
  }, []);

  return null;
}
