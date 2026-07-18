import { Mail, Search, ShieldCheck } from 'lucide-react';
import { requireAdmin } from '@/lib/admin';
import { formatOrderDate } from '@/lib/orders';

type Profile = { id: string; first_name: string; last_name: string; phone: string | null; marketing_opt_in: boolean; created_at: string };

export default async function CustomersAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = (params.q ?? '').trim().toLowerCase();
  const { admin } = await requireAdmin('/admin/clientes');
  const [{ data: usersData, error: usersError }, { data: profilesData, error: profilesError }] = await Promise.all([
    admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    admin.from('profiles').select('id,first_name,last_name,phone,marketing_opt_in,created_at'),
  ]);
  if (usersError || profilesError) throw new Error('No pudimos cargar los clientes.');
  const profiles = new Map(((profilesData ?? []) as Profile[]).map((profile) => [profile.id, profile]));
  const customers = usersData.users.map((user) => ({ user, profile: profiles.get(user.id) })).filter(({ user, profile }) => {
    const haystack = `${profile?.first_name ?? ''} ${profile?.last_name ?? ''} ${user.email ?? ''} ${profile?.phone ?? ''}`.toLowerCase();
    return !query || haystack.includes(query);
  }).sort((a, b) => new Date(b.user.created_at).getTime() - new Date(a.user.created_at).getTime());

  return <section className="border border-black/10 bg-[#f8f5ef] p-5 sm:p-7"><div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end"><div><p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#77716a]">Base de clientes</p><h1 className="mt-2 font-serif text-5xl">Clientes</h1><p className="mt-2 text-sm text-[#6f6860]">Cuentas registradas y consentimiento de comunicaciones.</p></div><form className="flex gap-2"><label className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#817970]" /><input name="q" defaultValue={params.q} placeholder="Buscar cliente" className="h-11 w-full border border-black/15 bg-white pl-10 pr-3 text-sm outline-none focus:border-black/40 sm:w-64" /></label><button className="h-11 bg-[#171717] px-5 text-xs uppercase tracking-[0.16em] text-white">Buscar</button></form></div>
    <p className="py-4 text-xs uppercase tracking-[0.16em] text-[#77716a]">{customers.length} {customers.length === 1 ? 'cliente' : 'clientes'}</p>
    <div className="grid gap-3 lg:grid-cols-2">{customers.map(({ user, profile }) => <article key={user.id} className="border border-black/10 bg-white p-5"><div className="flex items-start justify-between gap-4"><div><h2 className="font-serif text-2xl">{profile?.first_name || user.user_metadata.first_name || 'Cliente'} {profile?.last_name || user.user_metadata.last_name || ''}</h2><p className="mt-2 flex items-center gap-2 text-sm text-[#5f5952]"><Mail size={14} /> {user.email}</p>{profile?.phone ? <p className="mt-1 text-sm text-[#5f5952]">{profile.phone}</p> : null}</div><span className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.12em] ${profile?.marketing_opt_in ? 'border-emerald-800/20 bg-emerald-50 text-emerald-900' : 'border-black/10 bg-[#eee8de] text-[#6f6860]'}`}><ShieldCheck size={13} /> {profile?.marketing_opt_in ? 'Publicidad: sí' : 'Publicidad: no'}</span></div><div className="mt-5 border-t border-black/10 pt-4 text-xs text-[#817970]"><p>Registro: {formatOrderDate(user.created_at)}</p><p className="mt-1">Último acceso: {user.last_sign_in_at ? formatOrderDate(user.last_sign_in_at) : 'Aún no ha ingresado'}</p></div></article>)}</div>{!customers.length ? <div className="py-14 text-center text-sm text-[#6f6860]">No encontramos clientes con esa búsqueda.</div> : null}
  </section>;
}
