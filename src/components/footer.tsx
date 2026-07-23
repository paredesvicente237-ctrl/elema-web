import Link from 'next/link';

const links = [
  { label: 'Colecciones', href: '/colecciones' },
  { label: 'Piezas', href: '/tienda' },
  { label: 'Proyectos a medida', href: '/diseno-a-medida' },
  { label: 'Sobre ELEM', href: '/nosotros' },
  { label: 'Profesionales', href: '/profesionales' },
];

export function Footer() {
  return (
    <footer className="border-t border-[#161616]/10 bg-[#0b0b0b] px-4 py-16 text-[#f6efe6] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.75fr_0.75fr]">
        <div>
          <p className="text-2xl font-semibold tracking-[0.35em]">ELEM</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#d8d0c4]">
            Diseño, ingeniería y fabricación para cocinas, fuego y piezas arquitectónicas especiales.
          </p>
          <Link href="/contacto" className="mt-5 inline-flex border-b border-white/25 pb-1 text-[0.68rem] uppercase tracking-[0.22em] text-[#d8d0c4] transition-colors hover:text-white">
            Solicitar una conversación
          </Link>
          <a href="https://wa.me/56930751812" target="_blank" rel="noreferrer" className="mt-5 block w-fit text-sm text-[#a89d90] transition hover:text-[#f6efe6]">
            +56 9 3075 1812 · Santiago, Chile
          </a>
        </div>
        <div>
          <h3 className="text-[0.68rem] uppercase tracking-[0.3em] text-[#a89d90]">Explorar</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#d8d0c4]">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-[#f6efe6]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[0.72rem] uppercase tracking-[0.34em] text-[#a89d90]">Políticas</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#d8d0c4]">
            <li><Link href="/privacidad" className="transition hover:text-[#f6efe6]">Privacidad</Link></li>
            <li><Link href="/terminos" className="transition hover:text-[#f6efe6]">Términos</Link></li>
            <li><Link href="/despachos" className="transition hover:text-[#f6efe6]">Despachos y devoluciones</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#a89d90] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ELEM. Todos los derechos reservados.</p>
        <p>Diseñado y fabricado en Chile.</p>
      </div>
    </footer>
  );
}
