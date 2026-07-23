import { NextResponse } from 'next/server';
import { availableProducts } from '@/data/products';
import { sendOrderConfirmation, syncMarketingContact } from '@/lib/email/resend';
import { createAdminClient, createClient } from '@/lib/supabase/server';

type OrderRequest = {
  items?: Array<{ id?: unknown; quantity?: unknown }>;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  region?: unknown;
  commune?: unknown;
  address?: unknown;
  notes?: unknown;
  marketingOptIn?: unknown;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!user?.email) return NextResponse.json({ error: 'Debes iniciar sesión para guardar el pedido.', code: 'AUTH_REQUIRED' }, { status: 401 });

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'El servicio de pedidos aún no está conectado.', code: 'NOT_CONFIGURED' }, { status: 503 });
  const body = await request.json().catch(() => null) as OrderRequest | null;
  if (!body || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) return NextResponse.json({ error: 'El carrito no es válido.' }, { status: 400 });

  const productMap = new Map(availableProducts.map((product) => [product.id, product]));
  const merged = new Map<string, number>();
  for (const item of body.items) {
    if (typeof item.id !== 'string') return NextResponse.json({ error: 'Hay un producto inválido.' }, { status: 400 });
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20 || !productMap.has(item.id)) return NextResponse.json({ error: 'Hay un producto o cantidad inválida.' }, { status: 400 });
    merged.set(item.id, (merged.get(item.id) ?? 0) + quantity);
  }
  if (Array.from(merged.values()).some((quantity) => quantity > 20)) return NextResponse.json({ error: 'La cantidad solicitada supera el máximo permitido.' }, { status: 400 });

  const firstName = field(body.firstName, 2, 80);
  const lastName = field(body.lastName, 2, 80);
  const phone = field(body.phone, 7, 30);
  const email = field(body.email, 5, 254)?.toLowerCase();
  const region = field(body.region, 2, 100);
  const commune = field(body.commune, 2, 100);
  const address = field(body.address, 5, 220);
  const notes = optionalField(body.notes, 800);
  if (!firstName || !lastName || !email || email !== user.email.toLowerCase() || !phone || !region || !commune || !address) return NextResponse.json({ error: 'Revisa los datos de contacto. El correo debe coincidir con tu cuenta.' }, { status: 400 });

  const lineItems = Array.from(merged).map(([id, quantity]) => {
    const product = productMap.get(id)!;
    return { product_id: product.id, product_name: product.name, unit_price: product.price!, quantity };
  });
  const subtotal = lineItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const marketingOptIn = body.marketingOptIn === true;
  const now = new Date().toISOString();

  const { data: order, error: orderError } = await admin.from('orders').insert({
    user_id: user.id, subtotal, total: subtotal, first_name: firstName, last_name: lastName,
    email: user.email, phone, region, commune, address, notes,
  }).select('id,order_number').single();
  if (orderError || !order) return NextResponse.json({ error: 'No pudimos crear el pedido.' }, { status: 500 });

  const [{ error: itemsError }, { error: eventError }] = await Promise.all([
    admin.from('order_items').insert(lineItems.map((item) => ({ order_id: order.id, ...item }))),
    admin.from('order_events').insert({ order_id: order.id, status: 'pending_confirmation', title: 'Solicitud recibida', description: 'ELEM revisará disponibilidad, despacho y forma de pago.' }),
  ]);
  if (itemsError || eventError) {
    await admin.from('orders').delete().eq('id', order.id);
    return NextResponse.json({ error: 'No pudimos completar el pedido.' }, { status: 500 });
  }

  await admin.from('profiles').update({
    first_name: firstName, last_name: lastName, phone,
    marketing_opt_in: marketingOptIn,
    marketing_consent_at: marketingOptIn ? now : null,
    marketing_unsubscribed_at: marketingOptIn ? null : now,
  }).eq('id', user.id);

  await Promise.allSettled([
    sendOrderConfirmation({ to: user.email, firstName, orderNumber: order.order_number, subtotal }),
    syncMarketingContact({ email: user.email, firstName, lastName, subscribed: marketingOptIn }),
  ]);

  return NextResponse.json({ id: order.id, orderNumber: order.order_number, subtotal }, { status: 201 });
}

function field(value: unknown, min: number, max: number) {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean.length >= min && clean.length <= max ? clean : null;
}

function optionalField(value: unknown, max: number) {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean ? clean.slice(0, max) : null;
}
