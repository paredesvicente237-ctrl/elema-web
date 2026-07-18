import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, LogOut, Package, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { hasSupabasePublicConfig } from '@/lib/supabase/config';
import { isAdminEmail } from '@/lib/admin';
import { formatClp, formatOrderDate, orderStatuses, type OrderStatus } from '@/lib/orders';
import { signOut } from './actions';
import { MarketingPreference } from './marketing-preference';

export const metadata: Metadata = { title: 'Mi ELEMA', robots: { index: false, follow: false } };

type OrderSummary = { id: string; order_number: string; status: OrderStatus; total: number; created_at: string };
type Profile = { first_name: string; last_name: string; marketing_opt_in: boolean };

export default async function AccountPage() {
  if (!hasSupabasePublicConfig) return <AccountSetup />;
  const supabase = await createClient();
  const { data: { user } } = await supabase!.auth.getUser();
  if (!user) redirect('/ingresar?next=/mi-elema');

  const [{ data: profileData }, { data: orderData }] = await Promise.all([
    supabase!.from('profiles').select('first_name,last_name,marketing_opt_in').eq('id', user.id).maybeSingle(),
    supabase!.from('orders').select('id,order_number,status,total,created_at').eq('user_id', user.id).order('created_at', { ascending: false }),
  ]);
  const profile = profileData as Profile | null;
  const orders = (orderData ?? []) as OrderSummary[];
  const firstName = profile?.first_name || user.user_metadata.first_name || 'Cliente';

  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-28 text-[#171717] sm:px-6 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end">
          <div><p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#77716a]">Cuenta personal</p><h1 className="mt-4 font-serif text-5xl sm:text-6xl">Hola, {firstName}.</h1><p className="mt-3 text-sm text-[#69635d]">Consulta tus compras y mantén tus preferencias al día.</p></div>
          <div className="flex flex-wrap items-center gap-5">{isAdminEmail(user.email) ? <Link href="/admin" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#171717]"><ShieldCheck size={15} /> Administración</Link> : null}<form action={signOut}><button className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#69635d] hover:text-black"><LogOut size={15} /> Cerrar sesión</button></form></div>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          <Stat icon={<ShoppingBag size={18} />} label="Pedidos" value={String(orders.length)} />
          <Stat icon={<Package size={18} />} label="En preparación" value={String(orders.filter((order) => ['confirmed', 'in_production', 'ready_for_dispatch'].includes(order.status)).length)} />
          <Stat icon={<Truck size={18} />} label="En camino" value={String(orders.filter((order) => order.status === 'shipped').length)} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <section>
            <div className="flex items-end justify-between gap-4"><div><p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#77716a]">Historial</p><h2 className="mt-3 font-serif text-4xl">Tus pedidos</h2></div><Link href="/tienda" className="text-xs uppercase tracking-[0.18em] underline underline-offset-4">Ir a la tienda</Link></div>
            {orders.length ? <div className="mt-6 divide-y divide-black/10 border-y border-black/10 bg-[#f8f5ef]">{orders.map((order) => { const status = orderStatuses[order.status] ?? orderStatuses.pending_confirmation; return <Link key={order.id} href={`/mi-elema/pedidos/${order.id}`} className="group grid gap-4 p-5 transition hover:bg-white sm:grid-cols-[1fr_auto_auto] sm:items-center sm:p-6"><div><p className="font-medium">{order.order_number}</p><p className="mt-1 text-xs text-[#77716a]">{formatOrderDate(order.created_at)}</p></div><div className="sm:text-right"><p className="text-xs uppercase tracking-[0.15em] text-[#69635d]">{status.label}</p><p className="mt-1 font-serif text-xl">{formatClp(order.total)}</p></div><ArrowRight size={17} className="text-[#77716a] transition-transform group-hover:translate-x-1" /></Link>; })}</div> : <div className="mt-6 border border-dashed border-black/20 bg-[#f8f5ef] p-8 text-center sm:p-12"><Package size={25} className="mx-auto text-[#77716a]" /><h3 className="mt-5 font-serif text-3xl">Aún no tienes pedidos.</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#69635d]">Cuando solicites una compra, podrás seguir cada etapa desde aquí.</p><Link href="/tienda" className="mt-6 inline-flex bg-[#171717] px-5 py-3 text-xs uppercase tracking-[0.2em] text-white">Explorar productos</Link></div>}
          </section>
          <aside className="space-y-5"><MarketingPreference initialValue={profile?.marketing_opt_in ?? false} /><section className="border border-black/10 bg-[#171717] p-6 text-white sm:p-8"><p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/50">Ayuda con un pedido</p><h2 className="mt-4 font-serif text-3xl">Estamos para ayudarte.</h2><p className="mt-3 text-sm leading-6 text-white/65">Habla directamente con ELEMA si necesitas coordinar entrega o resolver una duda.</p><Link href="/contacto" className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em]">Contactar <ArrowRight size={14} /></Link></section></aside>
        </div>
      </div>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-4 border border-black/10 bg-[#f8f5ef] p-5"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e7dfd3]">{icon}</span><div><p className="font-serif text-3xl leading-none">{value}</p><p className="mt-1 text-[0.63rem] uppercase tracking-[0.2em] text-[#77716a]">{label}</p></div></div>; }

function AccountSetup() { return <main className="grid min-h-screen place-items-center bg-[#eee8de] px-4 pb-20 pt-28 text-[#171717]"><section className="max-w-xl border border-black/10 bg-[#f8f5ef] p-8 text-center shadow-xl sm:p-12"><p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#77716a]">Mi ELEMA</p><h1 className="mt-5 font-serif text-5xl">Portal preparado.</h1><p className="mt-5 text-sm leading-7 text-[#69635d]">La interfaz y la seguridad ya están implementadas. Para habilitar cuentas reales falta conectar el proyecto de Supabase con las variables de entorno.</p><Link href="/" className="mt-7 inline-flex bg-[#171717] px-5 py-3 text-xs uppercase tracking-[0.2em] text-white">Volver al inicio</Link></section></main>; }
