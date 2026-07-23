import { redirect } from 'next/navigation';
import { createAdminClient, createClient } from '@/lib/supabase/server';

function allowedAdminEmails() {
  return (process.env.ELEM_ADMIN_EMAILS ?? process.env.ELEMA_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(email && allowedAdminEmails().includes(email.toLowerCase()));
}

export async function requireAdmin(nextPath = '/admin') {
  const supabase = await createClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  if (!user?.email) redirect(`/ingresar?next=${encodeURIComponent(nextPath)}`);
  if (!isAdminEmail(user.email)) redirect('/mi-elem');

  const admin = createAdminClient();
  if (!admin) throw new Error('El servicio administrativo no está configurado.');

  return { admin, user };
}
