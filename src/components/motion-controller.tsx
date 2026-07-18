'use client';

import { useEffect } from 'react';

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    root.classList.add('motion-enabled');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    elements.forEach((element) => {
      const delay = Number(element.dataset.revealDelay ?? 0);
      if (delay > 0) element.style.transitionDelay = `${delay}ms`;
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove('motion-enabled');
    };
  }, []);

  return null;
}
