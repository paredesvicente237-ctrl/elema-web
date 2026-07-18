import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, ExternalLink, MapPin, Package, Save, Truck, UserRound } from 'lucide-react';
import { requireAdmin } from '@/lib/admin';
import { formatClp, formatOrderDate, orderStatuses, type OrderStatus } from '@/lib/orders';
import { updateOrder } from '@/app/admin/actions';

type Order = { id: string; order_number: string; status: OrderStatus; subtotal: number; total: number; first_name: string; last_name: string; email: string; phone: string; region: string; commune: string; address: string; notes: string | null; carrier: string | null; tracking_code: string | null; tracking_url: string | null; created_at: string; updated_at: string };
type Item = { id: string; product_name: string; unit_price: number; quantity: number; line_total: number };
type Event = { id: string; status: OrderStatus; title: string; description: string | null; created_at: string };

export default async function AdminOrderPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ guardado?: string }> }) {
  const { id } = await params;
  const query = await searchParams;
  const { admin } = await requireAdmin(`/admin/pedidos/${id}`);
  const [{ data: orderData, error: orderError }, { data: itemsData }, { data: eventsData }] = await Promise.all([
    admin.from('orders').select('*').eq('id', id).maybeSingle(),
    admin.from('order_items').select('id,product_name,unit_price,quantity,line_total').eq('order_id', id),
    admin.from('order_events').select('id,status,title,description,created_at').eq('order_id', id).order('created_at', { ascending: false }),
  ]);
  if (orderError || !orderData) notFound();
  const order = orderData as Order;
  const items = (itemsData ?? []) as Item[];
  const events = (eventsData ?? []) as Event[];
  const currentStatus = orderStatuses[order.status];

  return <div><Link href="/admin/pedidos" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#655f58]"><ArrowLeft size={14} /> Volver a pedidos</Link>
    <section className="mt-5 border border-black/10 bg-[#f8f5ef] p-5 sm:p-7"><div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end"><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#77716a]">Pedido {order.order_number}</p><h1 className="mt-2 font-serif text-5xl">{currentStatus.label}</h1><p className="mt-2 text-sm text-[#6f6860]">Creado el {formatOrderDate(order.created_at)}</p></div><span className="inline-flex w-fit border border-black/10 bg-[#eee8de] px-4 py-2 text-xs uppercase tracking-[0.15em]">{currentStatus.label}</span></div>
      {query.guardado === '1' ? <p role="status" className="mt-5 border border-emerald-800/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">Pedido actualizado correctamente.</p> : null}
      <div className="mt-7 grid gap-7 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <Panel title="Productos" icon={<Package size={18} />}><div className="divide-y divide-black/10 border-y border-black/10">{items.map((item) => <div key={item.id} className="flex justify-between gap-4 py-4 text-sm"><div><p>{item.product_name}</p><p className="mt-1 text-xs text-[#817970]">{formatClp(item.unit_price)} × {item.quantity}</p></div><p>{formatClp(item.line_total)}</p></div>)}</div><div className="flex justify-between pt-5 font-serif text-2xl"><span>Total</span><span>{formatClp(order.total)}</span></div></Panel>
          <Panel title="Cliente" icon={<UserRound size={18} />}><div className="grid gap-5 text-sm sm:grid-cols-2"><Info label="Nombre" value={`${order.first_name} ${order.last_name}`} /><Info label="Correo" value={order.email} /><Info label="Teléfono" value={order.phone} /><Info label="Notas" value={order.notes || 'Sin notas'} /></div></Panel>
          <Panel title="Entrega" icon={<MapPin size={18} />}><p className="text-sm leading-7">{order.address}<br />{order.commune}, {order.region}</p></Panel>
          <Panel title="Historial visible para el cliente" icon={<Check size={18} />}><div className="space-y-0">{events.map((event, index) => <div key={event.id} className="grid grid-cols-[26px_1fr] gap-3"><div className="flex flex-col items-center"><span className="mt-0.5 h-3 w-3 rounded-full bg-[#171717]" />{index < events.length - 1 ? <span className="h-full min-h-12 w-px bg-black/15" /> : null}</div><div className="pb-6"><p className="text-sm font-medium">{event.title}</p><p className="mt-1 text-xs leading-5 text-[#6f6860]">{event.description || orderStatuses[event.status].detail}</p><p className="mt-1 text-[0.65rem] text-[#918981]">{formatOrderDate(event.created_at)}</p></div></div>)}</div></Panel>
        </div>
        <aside><form action={updateOrder} className="sticky top-28 border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(20,16,10,0.08)] sm:p-7"><input type="hidden" name="id" value={order.id} /><div className="flex items-center gap-3"><Truck size={19} /><div><p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#77716a]">Operación</p><h2 className="mt-1 font-serif text-3xl">Actualizar pedido</h2></div></div>
          <label className="mt-7 block text-sm">Estado<select name="status" defaultValue={order.status} className="mt-2 h-12 w-full border border-black/15 bg-[#f8f5ef] px-3 outline-none focus:border-black/45">{Object.entries(orderStatuses).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select></label>
          <div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Transportista" name="carrier" defaultValue={order.carrier ?? ''} placeholder="Ej. Chilexpress" /><Field label="Código de seguimiento" name="trackingCode" defaultValue={order.tracking_code ?? ''} /></div>
          <Field label="Enlace de seguimiento" name="trackingUrl" type="url" defaultValue={order.tracking_url ?? ''} placeholder="https://..." className="mt-5" />
          {order.tracking_url ? <a href={order.tracking_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs text-[#655f58] underline underline-offset-4">Abrir seguimiento actual <ExternalLink size={13} /></a> : null}
          <div className="mt-7 border-t border-black/10 pt-6"><p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#77716a]">Nuevo evento</p><p className="mt-2 text-xs leading-5 text-[#6f6860]">Se agrega al historial solo cuando cambias el estado.</p><Field label="Título para el cliente" name="eventTitle" placeholder="Se completa según el estado" className="mt-4" /><label className="mt-4 block text-sm">Descripción<textarea name="eventDescription" maxLength={500} placeholder="Se completa según el estado" className="mt-2 min-h-24 w-full border border-black/15 bg-[#f8f5ef] px-3 py-3 outline-none focus:border-black/45" /></label></div>
          <button className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.18em] text-white"><Save size={15} /> Guardar cambios</button>
        </form></aside>
      </div>
    </section>
  </div>;
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) { return <section className="border border-black/10 bg-white p-5 sm:p-7"><div className="flex items-center gap-3">{icon}<h2 className="font-serif text-3xl">{title}</h2></div><div className="mt-6">{children}</div></section>; }
function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#817970]">{label}</p><p className="mt-2 leading-6">{value}</p></div>; }
function Field({ label, name, type = 'text', defaultValue, placeholder, className = '' }: { label: string; name: string; type?: string; defaultValue?: string; placeholder?: string; className?: string }) { return <label className={`block text-sm ${className}`}>{label}<input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} maxLength={type === 'url' ? 500 : 120} className="mt-2 h-12 w-full border border-black/15 bg-[#f8f5ef] px-3 outline-none focus:border-black/45" /></label>; }
