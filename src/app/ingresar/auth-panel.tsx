'use client';

import Image from 'next/image';
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
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState(params.get('error') ?? '');
  const [success, setSuccess] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const requestedNext = params.get('next');
  const next = requestedNext?.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/mi-elem';

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);
    setConfirmationEmail('');
    const supabase = createClient();
    if (!supabase) {
      setMessage('Mi ELEM está listo para conectarse. Falta configurar las credenciales de Supabase.');
      setLoading(false);
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (isEmailNotConfirmed(error.message)) setConfirmationEmail(email);
        setMessage(authErrorMessage(error.message));
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
      if (error) setMessage(authErrorMessage(error.message));
      else if (data.session) window.location.assign(next);
      else {
        setSuccess(true);
        setConfirmationEmail(email);
        setMessage('Revisa tu correo y confirma la cuenta para entrar a Mi ELEM. Si ya tenías una cuenta o recibiste una invitación, recupera tu contraseña en lugar de volver a registrarte.');
      }
    }
    setLoading(false);
  }

  async function resendConfirmation() {
    if (!confirmationEmail || resending) return;
    const supabase = createClient();
    if (!supabase) return;

    setResending(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: confirmationEmail,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    setSuccess(!error);
    setMessage(error ? authErrorMessage(error.message) : 'Enviamos un nuevo enlace de confirmación. Revisa también la carpeta de correo no deseado.');
    setResending(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#e9e3d9] px-4 pb-16 pt-24 text-[#171717] sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-20 h-px bg-black/10" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl overflow-hidden border border-black/10 bg-[#f8f5ef] shadow-[0_36px_100px_rgba(28,23,17,0.14)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex min-h-[310px] overflow-hidden bg-[#171717] p-6 text-white sm:min-h-[390px] sm:p-9 lg:min-h-[720px] lg:p-12">
          <Image src="/images/elema-generated/elema-concepto-campana-suspendida-v1.png" alt="" fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover object-[55%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0.48)_0%,rgba(8,9,10,0.08)_38%,rgba(8,9,10,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,10,0.35)_0%,transparent_58%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between">
            <div className="flex items-center justify-between gap-5 border-b border-white/25 pb-4">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/75">Mi ELEM</p>
              <p className="text-[0.54rem] uppercase tracking-[0.22em] text-white/55">Acceso privado</p>
            </div>

            <div>
              <p className="mb-4 hidden text-[0.6rem] uppercase tracking-[0.26em] text-white/60 sm:block">Proyecto · Compra · Seguimiento</p>
              <h1 className="max-w-2xl font-serif text-[2.8rem] leading-[0.9] tracking-[-0.025em] sm:text-6xl lg:text-[4.6rem]">Todo tu proyecto, en un solo lugar.</h1>
              <div className="mt-7 hidden grid-cols-3 border-t border-white/25 pt-6 text-[0.68rem] leading-5 text-white/70 sm:grid">
                <p className="border-r border-white/20 pr-4"><PackageCheck size={17} className="mb-3 text-white" />Pedidos y avance</p>
                <p className="border-r border-white/20 px-4"><LockKeyhole size={17} className="mb-3 text-white" />Información protegida</p>
                <p className="pl-4"><Check size={17} className="mb-3 text-white" />Preferencias de contacto</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center bg-[#fbf8f2] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-9 bg-[#8d847b]" aria-hidden="true" />
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#77716a]">Acceso de clientes</p>
            </div>
            <h2 className="mt-5 font-serif text-5xl leading-[0.95] sm:text-6xl">{mode === 'login' ? 'Bienvenido de vuelta.' : 'Crea tu cuenta.'}</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#66615b]">
              {mode === 'login' ? 'Ingresa para revisar compras, estados de fabricación y seguimiento.' : 'Tus próximos pedidos quedarán vinculados a este acceso.'}
            </p>

            <div className="mt-9 grid grid-cols-2 border-b border-black/15" role="tablist" aria-label="Acceso o registro">
              {(['login', 'register'] as Mode[]).map((item) => (
                <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => { setMode(item); setMessage(''); setSuccess(false); setConfirmationEmail(''); }} className={`border-b-2 px-2 py-4 text-[0.68rem] uppercase tracking-[0.2em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${mode === item ? 'border-black text-black' : 'border-transparent text-[#888078] hover:text-black'}`}>
                  {item === 'login' ? 'Ingresar' : 'Crear cuenta'}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-7 space-y-5">
              {mode === 'register' ? <div className="grid gap-5 sm:grid-cols-2"><AuthField label="Nombre" name="firstName" autoComplete="given-name" /><AuthField label="Apellido" name="lastName" autoComplete="family-name" /></div> : null}
              <AuthField label="Correo electrónico" name="email" type="email" autoComplete="email" />
              <label className="block text-sm text-[#4e4943]">Contraseña
                <span className="relative mt-2 block">
                  <input name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required className="w-full border border-black/15 bg-[#fffdfa] px-4 py-4 pr-12 text-[#171717] outline-none transition focus:border-black/55 focus:bg-white" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#77716a] transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
                </span>
              </label>
              {mode === 'login' ? <div className="text-right"><Link href="/recuperar" className="text-xs text-[#66615b] underline underline-offset-4 hover:text-black">Olvidé mi contraseña</Link></div> : <p className="text-xs leading-5 text-[#77716a]">Al crear tu cuenta aceptas nuestros <Link href="/terminos" className="underline">términos</Link> y la <Link href="/privacidad" className="underline">política de privacidad</Link>.</p>}
              {message ? (
                <div role="status" aria-live="polite" className={`border px-4 py-3 text-sm leading-6 ${success ? 'border-emerald-700/20 bg-emerald-50 text-emerald-900' : 'border-red-800/20 bg-red-50 text-red-900'}`}>
                  <p>{message}</p>
                  {confirmationEmail ? (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                      <button type="button" onClick={resendConfirmation} disabled={resending} className="underline underline-offset-4 disabled:opacity-50">
                        {resending ? 'Reenviando…' : 'Reenviar correo de confirmación'}
                      </button>
                      <Link href="/recuperar" className="underline underline-offset-4">Recuperar contraseña</Link>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <button disabled={loading} className="group inline-flex w-full items-center justify-center gap-3 bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-wait disabled:opacity-60">
                {loading ? 'Procesando…' : mode === 'login' ? 'Ingresar a Mi ELEM' : 'Crear mi cuenta'} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-7 flex items-center gap-3 border-t border-black/10 pt-5 text-[0.68rem] leading-5 text-[#77716a]">
              <LockKeyhole size={15} className="shrink-0" />
              <p>Acceso protegido para clientes ELEM.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function authErrorMessage(message: string) {
  if (message === 'Invalid login credentials') return 'Correo o contraseña incorrectos.';
  if (isEmailNotConfirmed(message)) return 'Debes confirmar tu correo antes de ingresar. Puedes solicitar un enlace nuevo aquí mismo.';
  if (message.toLowerCase().includes('rate limit')) return 'Se hicieron demasiados intentos. Espera unos minutos antes de volver a intentar.';
  return message;
}

function isEmailNotConfirmed(message: string) {
  return message.toLowerCase().includes('email not confirmed');
}

function AuthField({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete: string }) {
  return <label className="block text-sm text-[#4e4943]">{label}<input name={name} type={type} autoComplete={autoComplete} required className="mt-2 w-full border border-black/15 bg-[#fffdfa] px-4 py-4 text-[#171717] outline-none transition focus:border-black/55 focus:bg-white" /></label>;
}
