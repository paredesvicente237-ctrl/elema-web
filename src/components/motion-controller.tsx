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
