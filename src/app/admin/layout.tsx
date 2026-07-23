import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, LayoutDashboard, LogOut, UsersRound } from 'lucide-react';
import { requireAdmin } from '@/lib/admin';
import { signOut } from '@/app/mi-elem/actions';

export const metadata: Metadata = { title: 'Administración', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const links = [
  { href: '/admin', label: 'Resumen', icon: LayoutDashboard },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ClipboardList },
  { href: '/admin/clientes', label: 'Clientes', icon: UsersRound },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <main className="min-h-screen bg-[#e9e3d9] px-4 pb-24 pt-28 text-[#171717] sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-[1480px]">
        <header className="border border-black/10 bg-[#171717] px-5 py-5 text-white shadow-[0_24px_70px_rgba(20,16,10,0.12)] sm:px-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/45">Acceso privado</p>
              <div className="mt-2 flex items-baseline gap-3">
                <Link href="/admin" className="font-serif text-3xl">Administración ELEM</Link>
                <span className="hidden text-xs text-white/45 sm:inline">{user.email}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <nav className="flex flex-wrap gap-1" aria-label="Administración">
                {links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="inline-flex items-center gap-2 px-3 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-white/65 transition hover:bg-white/10 hover:text-white"><Icon size={15} /> {label}</Link>)}
              </nav>
              <form action={signOut}><button className="inline-flex items-center gap-2 border-l border-white/15 px-3 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-white/65 transition hover:text-white"><LogOut size={15} /> Salir</button></form>
            </div>
          </div>
        </header>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
