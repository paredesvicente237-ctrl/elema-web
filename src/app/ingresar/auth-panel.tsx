'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, PackageCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';

export function AuthPanel() {
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(params.get('error') ?? '');
  const [success, setSuccess] = useState(false);
  const next = params.get('next')?.startsWith('/') ? params.get('next')! : '/mi-elema';

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);
    const supabase = createClient();
    if (!supabase) {
      setMessage('Mi ELEMA está listo para conectarse. Falta configurar las credenciales de Supabase.');
      setLoading(false);
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : error.message);
      } else {
        window.location.assign(next);
      }
    } else {
      const firstName = String(form.get('firstName') ?? '').trim();
      const lastName = String(form.get('lastName') ?? '').trim();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) setMessage(error.message);
      else if (data.session) window.location.assign(next);
      else {
        setSuccess(true);
        setMessage('Revisa tu correo para confirmar la cuenta. Después podrás entrar a Mi ELEMA.');
      }
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-20 pt-28 text-[#171717] sm:px-6 lg:pt-36">
      <div className="mx-auto grid max-w-6xl overflow-hidden border border-black/10 bg-[#f8f5ef] shadow-[0_32px_90px_rgba(25,20,14,0.10)] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden min-h-[650px] overflow-hidden bg-[#171717] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(226,205,172,0.22),transparent_35%)]" />
          <p className="relative text-[0.68rem] uppercase tracking-[0.34em] text-white/60">Mi ELEMA</p>
          <div className="relative">
            <h1 className="max-w-md font-serif text-6xl leading-[0.95]">Todo tu proyecto, en un solo lugar.</h1>
            <div className="mt-10 space-y-5 text-sm text-white/70">
              <p className="flex items-center gap-3"><PackageCheck size={18} /> Consulta pedidos y su avance.</p>
              <p className="flex items-center gap-3"><LockKeyhole size={18} /> Información privada y protegida.</p>
              <p className="flex items-center gap-3"><Check size={18} /> Controla qué comunicaciones recibes.</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#77716a]">Acceso de clientes</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{mode === 'login' ? 'Bienvenido de vuelta.' : 'Crea tu cuenta.'}</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#66615b]">
            {mode === 'login' ? 'Ingresa para revisar compras, estados de fabricación y seguimiento.' : 'Tus próximos pedidos quedarán vinculados a este acceso.'}
          </p>

          <div className="mt-8 grid grid-cols-2 border-b border-black/15" role="tablist" aria-label="Acceso o registro">
            {(['login', 'register'] as Mode[]).map((item) => (
              <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => { setMode(item); setMessage(''); }} className={`border-b-2 px-2 py-4 text-xs uppercase tracking-[0.2em] transition ${mode === item ? 'border-black text-black' : 'border-transparent text-[#888078] hover:text-black'}`}>
                {item === 'login' ? 'Ingresar' : 'Crear cuenta'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-7 space-y-5">
            {mode === 'register' ? <div className="grid gap-5 sm:grid-cols-2"><AuthField label="Nombre" name="firstName" autoComplete="given-name" /><AuthField label="Apellido" name="lastName" autoComplete="family-name" /></div> : null}
            <AuthField label="Correo electrónico" name="email" type="email" autoComplete="email" />
            <label className="block text-sm text-[#4e4943]">Contraseña
              <span className="relative mt-2 block">
                <input name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required className="w-full border border-black/15 bg-white px-4 py-3.5 pr-12 text-[#171717] outline-none transition focus:border-black/50" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#77716a]" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </span>
            </label>
            {mode === 'login' ? <div className="text-right"><Link href="/recuperar" className="text-xs text-[#66615b] underline underline-offset-4 hover:text-black">Olvidé mi contraseña</Link></div> : <p className="text-xs leading-5 text-[#77716a]">Al crear tu cuenta aceptas nuestros <Link href="/terminos" className="underline">términos</Link> y la <Link href="/privacidad" className="underline">política de privacidad</Link>.</p>}
            {message ? <p role="status" className={`border px-4 py-3 text-sm leading-6 ${success ? 'border-emerald-700/20 bg-emerald-50 text-emerald-900' : 'border-red-800/20 bg-red-50 text-red-900'}`}>{message}</p> : null}
            <button disabled={loading} className="group inline-flex w-full items-center justify-center gap-3 bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60">
              {loading ? 'Procesando…' : mode === 'login' ? 'Ingresar a Mi ELEMA' : 'Crear mi cuenta'} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function AuthField({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete: string }) {
  return <label className="block text-sm text-[#4e4943]">{label}<input name={name} type={type} autoComplete={autoComplete} required className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 text-[#171717] outline-none transition focus:border-black/50" /></label>;
}
