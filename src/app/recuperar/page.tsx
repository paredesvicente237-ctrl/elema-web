'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function RecoverPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const email = String(new FormData(event.currentTarget).get('email') ?? '');
    if (!supabase) setMessage('El servicio de cuentas aún no está conectado.');
    else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/actualizar-clave` });
      setMessage(error
        ? 'No pudimos enviar el enlace. Espera unos minutos e inténtalo nuevamente.'
        : 'Si existe una cuenta con ese correo, recibirás un enlace para crear una nueva contraseña.');
    }
    setLoading(false);
  }

  return <main className="grid min-h-screen place-items-center bg-[#eee8de] px-4 pb-20 pt-28 text-[#171717]"><section className="w-full max-w-lg border border-black/10 bg-[#f8f5ef] p-7 shadow-xl sm:p-12"><Link href="/ingresar" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#69635d]"><ArrowLeft size={14} /> Volver</Link><h1 className="mt-8 font-serif text-5xl">Recupera tu acceso.</h1><p className="mt-4 text-sm leading-7 text-[#69635d]">Te enviaremos un enlace seguro para actualizar tu contraseña.</p><form onSubmit={submit} className="mt-8"><label className="text-sm">Correo electrónico<input name="email" type="email" required autoComplete="email" className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 outline-none focus:border-black/50" /></label>{message ? <p role="status" className="mt-4 text-sm leading-6 text-[#57514b]">{message}</p> : null}<button disabled={loading} className="mt-6 w-full bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.22em] text-white disabled:opacity-60">{loading ? 'Enviando…' : 'Enviar enlace'}</button></form></section></main>;
}
