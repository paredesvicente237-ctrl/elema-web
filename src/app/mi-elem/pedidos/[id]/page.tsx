import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, Check, ExternalLink, MapPin, Package, Truck } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatClp, formatOrderDate, orderStatuses, type OrderStatus } from '@/lib/orders';

type Order = { id: string; order_number: string; status: OrderStatus; subtotal: number; total: number; first_name: string; last_name: string; email: string; phone: string; region: string; commune: string; address: string; notes: string | null; carrier: string | null; tracking_code: string | null; tracking_url: string | null; created_at: string };
type Item = { id: string; product_name: string; unit_price: number; quantity: number; line_total: number };
type Event = { id: string; status: OrderStatus; title: string; description: string | null; created_at: string };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) redirect('/mi-elem');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/ingresar?next=${encodeURIComponent(`/mi-elem/pedidos/${id}`)}`);
  const [{ data: orderData }, { data: itemData }, { data: eventData }] = await Promise.all([
    supabase.from('orders').select('*').eq('id', id).eq('user_id', user.id).maybeSingle(),
    supabase.from('order_items').select('id,product_name,unit_price,quantity,line_total').eq('order_id', id),
    supabase.from('order_events').select('id,status,title,description,created_at').eq('order_id', id).order('created_at', { ascending: false }),
  ]);
  if (!orderData) notFound();
  const order = orderData as Order; const items = (itemData ?? []) as Item[]; const events = (eventData ?? []) as Event[];
  const status = orderStatuses[order.status] ?? orderStatuses.pending_confirmation;

  return <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-28 text-[#171717] sm:px-6 lg:pt-36"><div className="mx-auto max-w-6xl"><Link href="/mi-elem" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#69635d]"><ArrowLeft size={14} /> Mi ELEM</Link><div className="mt-8 flex flex-col justify-between gap-5 border-b border-black/15 pb-8 sm:flex-row sm:items-end"><div><p className="text-[0.66rem] uppercase tracking-[0.3em] text-[#77716a]">Pedido {order.order_number}</p><h1 className="mt-4 font-serif text-5xl sm:text-6xl">{status.label}</h1><p className="mt-3 text-sm text-[#69635d]">Solicitado el {formatOrderDate(order.created_at)}</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/15 bg-[#f8f5ef] px-4 py-2 text-xs uppercase tracking-[0.14em]"><span className="h-2 w-2 rounded-full bg-emerald-700" /> {status.label}</span></div>
    <div className="mt-9 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]"><div className="space-y-8"><section className="border border-black/10 bg-[#f8f5ef] p-6 sm:p-8"><div className="flex items-center gap-3"><Package size={19} /><h2 className="font-serif text-3xl">Resumen</h2></div><div className="mt-6 divide-y divide-black/10 border-y border-black/10">{items.map((item) => <div key={item.id} className="flex justify-between gap-4 py-4 text-sm"><span>{item.product_name} <span className="text-[#77716a]">× {item.quantity}</span></span><span>{formatClp(item.line_total)}</span></div>)}</div><div className="flex justify-between pt-5 font-serif text-2xl"><span>Total</span><span>{formatClp(order.total)}</span></div><p className="mt-3 text-xs text-[#77716a]">Despacho y forma de pago se confirman directamente con ELEM.</p></section>
    <section className="border border-black/10 bg-[#f8f5ef] p-6 sm:p-8"><h2 className="font-serif text-3xl">Avance del pedido</h2><div className="mt-7 space-y-0">{events.length ? events.map((event, index) => <div key={event.id} className="grid grid-cols-[28px_1fr] gap-3"><div className="flex flex-col items-center"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#171717] text-white"><Check size={13} /></span>{index < events.length - 1 ? <span className="h-full min-h-10 w-px bg-black/15" /> : null}</div><div className="pb-7"><p className="text-sm font-medium">{event.title}</p><p className="mt-1 text-xs leading-5 text-[#69635d]">{event.description || orderStatuses[event.status]?.detail}</p><p className="mt-1 text-[0.65rem] text-[#918981]">{formatOrderDate(event.created_at)}</p></div></div>) : <p className="text-sm text-[#69635d]">La solicitud fue recibida y pronto mostrará nuevos avances.</p>}</div></section></div>
    <aside className="space-y-5"><section className="border border-black/10 bg-[#f8f5ef] p-6"><div className="flex items-center gap-3"><MapPin size={18} /><h2 className="font-serif text-2xl">Entrega</h2></div><p className="mt-5 text-sm leading-6">{order.first_name} {order.last_name}<br />{order.address}<br />{order.commune}, {order.region}<br />{order.phone}</p></section><section className="border border-black/10 bg-[#171717] p-6 text-white"><div className="flex items-center gap-3"><Truck size={18} /><h2 className="font-serif text-2xl">Seguimiento</h2></div>{order.tracking_code ? <div className="mt-5"><p className="text-xs uppercase tracking-[0.18em] text-white/50">{order.carrier || 'Transporte'}</p><p className="mt-2 text-sm">Código: {order.tracking_code}</p>{order.tracking_url ? <a href={order.tracking_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em]">Seguir envío <ExternalLink size={13} /></a> : null}</div> : <p className="mt-5 text-sm leading-6 text-white/60">El seguimiento aparecerá aquí cuando tu pedido sea despachado.</p>}</section></aside></div></div></main>;
}
