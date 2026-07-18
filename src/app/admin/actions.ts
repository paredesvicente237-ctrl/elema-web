'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import { orderStatuses, type OrderStatus } from '@/lib/orders';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function updateOrder(formData: FormData) {
  const id = text(formData.get('id'), 36);
  const statusValue = text(formData.get('status'), 40);
  if (!id || !uuidPattern.test(id) || !statusValue || !(statusValue in orderStatuses)) throw new Error('Pedido inválido.');
  const status = statusValue as OrderStatus;
  const carrier = optionalText(formData.get('carrier'), 100);
  const trackingCode = optionalText(formData.get('trackingCode'), 120);
  const trackingUrl = optionalUrl(formData.get('trackingUrl'));
  const eventTitle = optionalText(formData.get('eventTitle'), 140) || orderStatuses[status].label;
  const eventDescription = optionalText(formData.get('eventDescription'), 500) || orderStatuses[status].detail;
  const { admin } = await requireAdmin(`/admin/pedidos/${id}`);

  const { data: current, error: currentError } = await admin.from('orders').select('status').eq('id', id).maybeSingle();
  if (currentError || !current) throw new Error('No encontramos el pedido.');

  const { error: updateError } = await admin.from('orders').update({
    status,
    carrier,
    tracking_code: trackingCode,
    tracking_url: trackingUrl,
  }).eq('id', id);
  if (updateError) throw new Error('No pudimos actualizar el pedido.');

  if (current.status !== status) {
    const { error: eventError } = await admin.from('order_events').insert({
      order_id: id,
      status,
      title: eventTitle,
      description: eventDescription,
    });
    if (eventError) throw new Error('El pedido cambió, pero no pudimos registrar el evento.');
  }

  revalidatePath('/admin');
  revalidatePath('/admin/pedidos');
  revalidatePath(`/admin/pedidos/${id}`);
  revalidatePath('/mi-elema');
  revalidatePath(`/mi-elema/pedidos/${id}`);
  redirect(`/admin/pedidos/${id}?guardado=1`);
}

function text(value: FormDataEntryValue | null, max: number) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return cleaned && cleaned.length <= max ? cleaned : null;
}

function optionalText(value: FormDataEntryValue | null, max: number) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, max) : null;
}

function optionalUrl(value: FormDataEntryValue | null) {
  const cleaned = optionalText(value, 500);
  if (!cleaned) return null;
  try {
    const url = new URL(cleaned);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    return url.toString();
  } catch {
    throw new Error('El enlace de seguimiento no es válido.');
  }
}
