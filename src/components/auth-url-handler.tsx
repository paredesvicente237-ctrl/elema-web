'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function AuthUrlHandler() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const hash = new URLSearchParams(url.hash.slice(1));
    const accessToken = hash.get('access_token');
    const refreshToken = hash.get('refresh_token');
    const type = hash.get('type');

    if (code && window.location.pathname === '/') {
      window.location.replace(`/auth/callback?code=${encodeURIComponent(code)}&next=/actualizar-clave`);
      return;
    }

    if (!accessToken || !refreshToken || !['invite', 'recovery'].includes(type ?? '')) return;
    const supabase = createClient();
    if (!supabase) return;

    supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ error }) => {
      if (!error) window.location.replace('/actualizar-clave');
    });
  }, []);

  return null;
}
