import Link from 'next/link';
import { ArrowRight, CircleDollarSign, PackageCheck, ShoppingBag, UsersRound } from 'lucide-react';
import { requireAdmin } from '@/lib/admin';
import { formatClp, formatOrderDate, orderStatuses, type OrderStatus } from '@/lib/orders';

type OrderRow = { id: string; order_number: string; status: OrderStatus; total: number; first_name: string; last_name: string; email: string; created_at: string };

export default async function AdminDashboard() {
  const { admin } = await requireAdmin('/admin');
  const [{ data: ordersData, error: ordersError }, { data: usersData, error: usersError }] = await Promise.all([
    admin.from('orders').select('id,order_number,status,total,first_name,last_name,email,created_at').order('created_at', { ascending: false }).limit(100),
    admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
  ]);
  if (ordersError || usersError) throw new Error('No pudimos cargar el panel administrativo.');

  const orders = (ordersData ?? []) as OrderRow[];
  const users = usersData.users;
  const activeOrders = orders.filter((order) => !['delivered', 'cancelled'].includes(order.status));
  const salesTotal = orders.filter((order) => order.status !== 'cancelled').reduce((sum, order) => sum + order.total, 0);

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={<UsersRound size={19} />} label="Clientes registrados" value={String(users.length)} />
        <Stat icon={<ShoppingBag size={19} />} label="Pedidos totales" value={String(orders.length)} />
        <Stat icon={<PackageCheck size={19} />} label="Pedidos activos" value={String(activeOrders.length)} />
        <Stat icon={<CircleDollarSign size={19} />} label="Valor solicitado" value={formatClp(salesTotal)} compact />
      </section>

      <section className="mt-6 border border-black/10 bg-[#f8f5ef] p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-end">
          <div><p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#77716a]">Actividad reciente</p><h1 className="mt-2 font-serif text-4xl">Últimos pedidos</h1></div>
          <Link href="/admin/pedidos" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em]">Ver todos <ArrowRight size={14} /></Link>
        </div>
        {orders.length ? <div className="divide-y divide-black/10">{orders.slice(0, 8).map((order) => <OrderItem key={order.id} order={order} />)}</div> : <EmptyState />}
      </section>
    </>
  );
}

function Stat({ icon, label, value, compact = false }: { icon: React.ReactNode; label: string; value: string; compact?: boolean }) {
  return <div className="border border-black/10 bg-[#f8f5ef] p-5"><div className="flex items-center justify-between text-[#6f6860]"><p className="text-[0.62rem] uppercase tracking-[0.2em]">{label}</p>{icon}</div><p className={`mt-5 font-serif leading-none ${compact ? 'text-3xl' : 'text-5xl'}`}>{value}</p></div>;
}

function OrderItem({ order }: { order: OrderRow }) {
  const status = orderStatuses[order.status] ?? orderStatuses.pending_confirmation;
  return <Link href={`/admin/pedidos/${order.id}`} className="group grid gap-3 py-5 transition hover:bg-white sm:grid-cols-[0.8fr_1.2fr_0.8fr_auto] sm:items-center sm:px-3"><div><p className="text-sm font-medium">{order.order_number}</p><p className="mt-1 text-xs text-[#817970]">{formatOrderDate(order.created_at)}</p></div><div><p className="text-sm">{order.first_name} {order.last_name}</p><p className="mt-1 text-xs text-[#817970]">{order.email}</p></div><div><p className="text-xs uppercase tracking-[0.13em] text-[#655f58]">{status.label}</p><p className="mt-1 font-serif text-xl">{formatClp(order.total)}</p></div><ArrowRight size={16} className="text-[#817970] transition-transform group-hover:translate-x-1" /></Link>;
}

function EmptyState() {
  return <div className="py-14 text-center"><ShoppingBag size={24} className="mx-auto text-[#817970]" /><h2 className="mt-4 font-serif text-3xl">Todavía no hay pedidos.</h2><p className="mt-2 text-sm text-[#6f6860]">Los pedidos creados desde la tienda aparecerán aquí.</p></div>;
}
