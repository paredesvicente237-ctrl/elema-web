import Link from 'next/link';

const links = [
  { label: 'Colecciones', href: '/colecciones' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Profesionales', href: '/profesionales' },
];

export function Footer() {
  return (
    <footer className="border-t border-[#161616]/10 bg-[#0b0b0b] px-4 py-16 text-[#f6efe6] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.75fr_0.75fr]">
        <div>
          <p className="text-2xl font-semibold tracking-[0.35em]">ELEMA</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#d8d0c4]">
            Diseño, ingeniería y fabricación premium para cocinas, parrillas y soluciones arquitectónicas personalizadas.
          </p>
          <p className="mt-4 text-sm text-[#a89d90]">Datos empresariales por confirmar.</p>
        </div>
        <div>
          <h3 className="text-[0.72rem] uppercase tracking-[0.34em] text-[#a89d90]">Navegación</h3>
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
        <p>© {new Date().getFullYear()} ELEMA. Todos los derechos reservados.</p>
        <p>Contenido provisional para revisión.</p>
      </div>
    </footer>
  );
}
