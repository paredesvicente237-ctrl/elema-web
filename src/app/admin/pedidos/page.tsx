import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { requireAdmin } from '@/lib/admin';
import { formatClp, formatOrderDate, orderStatuses, type OrderStatus } from '@/lib/orders';

type OrderRow = { id: string; order_number: string; status: OrderStatus; total: number; first_name: string; last_name: string; email: string; phone: string; commune: string; created_at: string };

export default async function OrdersAdminPage({ searchParams }: { searchParams: Promise<{ q?: string; estado?: string }> }) {
  const params = await searchParams;
  const query = (params.q ?? '').trim().toLowerCase();
  const statusFilter = params.estado && params.estado in orderStatuses ? params.estado as OrderStatus : '';
  const { admin } = await requireAdmin('/admin/pedidos');
  const { data, error } = await admin.from('orders').select('id,order_number,status,total,first_name,last_name,email,phone,commune,created_at').order('created_at', { ascending: false }).limit(300);
  if (error) throw new Error('No pudimos cargar los pedidos.');
  const orders = ((data ?? []) as OrderRow[]).filter((order) => {
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const haystack = `${order.order_number} ${order.first_name} ${order.last_name} ${order.email} ${order.phone} ${order.commune}`.toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });

  return <section className="border border-black/10 bg-[#f8f5ef] p-5 sm:p-7"><div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 lg:flex-row lg:items-end"><div><p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#77716a]">Gestión comercial</p><h1 className="mt-2 font-serif text-5xl">Pedidos</h1><p className="mt-2 text-sm text-[#6f6860]">Revisa solicitudes y actualiza cada etapa del proceso.</p></div><form className="flex flex-col gap-2 sm:flex-row"><label className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#817970]" /><input name="q" defaultValue={params.q} placeholder="Buscar cliente o pedido" className="h-11 w-full border border-black/15 bg-white pl-10 pr-3 text-sm outline-none focus:border-black/40 sm:w-64" /></label><select name="estado" defaultValue={statusFilter} className="h-11 border border-black/15 bg-white px-3 text-sm outline-none"><option value="">Todos los estados</option>{Object.entries(orderStatuses).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select><button className="h-11 bg-[#171717] px-5 text-xs uppercase tracking-[0.16em] text-white">Filtrar</button></form></div>
    <p className="py-4 text-xs uppercase tracking-[0.16em] text-[#77716a]">{orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}</p>
    <div className="overflow-x-auto"><table className="w-full min-w-[850px] border-collapse text-left"><thead><tr className="border-y border-black/10 text-[0.62rem] uppercase tracking-[0.16em] text-[#77716a]"><th className="px-3 py-4 font-medium">Pedido</th><th className="px-3 py-4 font-medium">Cliente</th><th className="px-3 py-4 font-medium">Ubicación</th><th className="px-3 py-4 font-medium">Estado</th><th className="px-3 py-4 text-right font-medium">Total</th><th className="px-3 py-4" /></tr></thead><tbody>{orders.map((order) => { const status = orderStatuses[order.status]; return <tr key={order.id} className="border-b border-black/10 transition hover:bg-white"><td className="px-3 py-5"><p className="text-sm font-medium">{order.order_number}</p><p className="mt-1 text-xs text-[#817970]">{formatOrderDate(order.created_at)}</p></td><td className="px-3 py-5"><p className="text-sm">{order.first_name} {order.last_name}</p><p className="mt-1 text-xs text-[#817970]">{order.email}</p></td><td className="px-3 py-5 text-sm">{order.commune}</td><td className="px-3 py-5"><span className="inline-flex border border-black/10 bg-[#eee8de] px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.12em]">{status.label}</span></td><td className="px-3 py-5 text-right font-serif text-xl">{formatClp(order.total)}</td><td className="px-3 py-5"><Link href={`/admin/pedidos/${order.id}`} aria-label={`Abrir ${order.order_number}`}><ArrowRight size={16} /></Link></td></tr>; })}</tbody></table>{!orders.length ? <div className="py-14 text-center text-sm text-[#6f6860]">No encontramos pedidos con esos filtros.</div> : null}</div>
  </section>;
}
