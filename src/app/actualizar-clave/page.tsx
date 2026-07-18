'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    const supabase = createClient();
    const password = String(new FormData(event.currentTarget).get('password') ?? '');
    if (!supabase) setMessage('El servicio de cuentas aún no está conectado.');
    else {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) setMessage(error.message);
      else window.location.assign('/mi-elema');
    }
    setLoading(false);
  }
  return <main className="grid min-h-screen place-items-center bg-[#eee8de] px-4 pb-20 pt-28 text-[#171717]"><section className="w-full max-w-lg border border-black/10 bg-[#f8f5ef] p-7 shadow-xl sm:p-12"><p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#77716a]">Mi ELEMA</p><h1 className="mt-5 font-serif text-5xl">Nueva contraseña.</h1><form onSubmit={submit} className="mt-8"><label className="text-sm">Contraseña nueva<input name="password" type="password" minLength={8} required autoComplete="new-password" className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 outline-none focus:border-black/50" /></label>{message ? <p role="alert" className="mt-4 text-sm text-red-800">{message}</p> : null}<button disabled={loading} className="mt-6 w-full bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.22em] text-white disabled:opacity-60">{loading ? 'Guardando…' : 'Guardar contraseña'}</button></form></section></main>;
}
