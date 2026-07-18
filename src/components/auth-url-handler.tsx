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
    const authError = hash.get('error_description') ?? hash.get('error');

    if (authError) {
      window.location.replace(`/ingresar?error=${encodeURIComponent(authError.replace(/\+/g, ' '))}`);
      return;
    }

    if (code && window.location.pathname === '/') {
      window.location.replace(`/auth/callback?code=${encodeURIComponent(code)}&next=/actualizar-clave`);
      return;
    }

    if (!accessToken || !refreshToken) return;
    const supabase = createClient();
    if (!supabase) return;

    supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ error }) => {
      if (error) {
        window.location.replace('/ingresar?error=El+enlace+no+es+v%C3%A1lido+o+ya+expir%C3%B3.+Solicita+uno+nuevo.');
        return;
      }

      const destination = ['invite', 'recovery'].includes(type ?? '') ? '/actualizar-clave' : '/mi-elema';
      window.location.replace(destination);
    });
  }, []);

  return null;
}
