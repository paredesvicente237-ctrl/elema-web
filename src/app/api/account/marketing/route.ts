import { NextResponse } from 'next/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { syncMarketingContact } from '@/lib/email/resend';

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const body = await request.json().catch(() => null) as { subscribed?: unknown } | null;
  if (typeof body?.subscribed !== 'boolean') return NextResponse.json({ error: 'Preferencia inválida' }, { status: 400 });
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Servicio no configurado' }, { status: 503 });
  const now = new Date().toISOString();
  const { data: profile, error } = await admin.from('profiles').update({ marketing_opt_in: body.subscribed, marketing_consent_at: body.subscribed ? now : null, marketing_unsubscribed_at: body.subscribed ? null : now }).eq('id', user.id).select('first_name,last_name').single();
  if (error) return NextResponse.json({ error: 'No pudimos guardar la preferencia' }, { status: 500 });
  if (user.email) await syncMarketingContact({ email: user.email, firstName: profile.first_name, lastName: profile.last_name, subscribed: body.subscribed }).catch(() => null);
  return NextResponse.json({ subscribed: body.subscribed });
}
