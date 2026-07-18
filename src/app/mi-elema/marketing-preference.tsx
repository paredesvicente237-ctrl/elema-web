'use client';

import { useState } from 'react';
import { MailCheck } from 'lucide-react';

export function MarketingPreference({ initialValue }: { initialValue: boolean }) {
  const [subscribed, setSubscribed] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function update(value: boolean) {
    setSaving(true); setMessage('');
    const response = await fetch('/api/account/marketing', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscribed: value }) });
    if (response.ok) {
      setSubscribed(value);
      setMessage(value ? 'Preferencia guardada. Te enviaremos novedades seleccionadas.' : 'Suscripción cancelada. No recibirás publicidad de ELEMA.');
    } else setMessage('No pudimos guardar el cambio. Inténtalo nuevamente.');
    setSaving(false);
  }

  return <section className="border border-black/10 bg-[#f8f5ef] p-6 sm:p-8"><div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#171717] text-white"><MailCheck size={17} /></span><div><h2 className="font-serif text-3xl">Novedades ELEMA</h2><p className="mt-2 text-sm leading-6 text-[#69635d]">Recibe lanzamientos, inspiración y beneficios. Esta autorización es opcional y puedes retirarla cuando quieras.</p></div></div><label className="mt-6 flex cursor-pointer items-center justify-between gap-5 border-t border-black/10 pt-5"><span className="text-sm font-medium">Quiero recibir comunicaciones comerciales</span><input type="checkbox" checked={subscribed} disabled={saving} onChange={(event) => update(event.target.checked)} className="h-5 w-5 accent-[#171717]" /></label>{message ? <p role="status" className="mt-4 text-xs leading-5 text-[#69635d]">{message}</p> : null}</section>;
}
