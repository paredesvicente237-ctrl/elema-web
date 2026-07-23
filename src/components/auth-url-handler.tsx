'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function AuthUrlHandler() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const tokenHash = url.searchParams.get('token_hash');
    const hash = new URLSearchParams(url.hash.slice(1));
    const accessToken = hash.get('access_token');
    const refreshToken = hash.get('refresh_token');
    const type = url.searchParams.get('type') ?? hash.get('type');
    const authError = url.searchParams.get('error_description')
      ?? url.searchParams.get('error')
      ?? hash.get('error_description')
      ?? hash.get('error');
    const destination = ['invite', 'recovery'].includes(type ?? '') ? '/actualizar-clave' : '/mi-elem';

    if (authError) {
      if (window.location.pathname === '/ingresar') return;
      window.location.replace(`/ingresar?error=${encodeURIComponent(authError.replace(/\+/g, ' '))}`);
      return;
    }

    if (window.location.pathname === '/' && (code || (tokenHash && type))) {
      const callback = new URL('/auth/callback', url.origin);
      if (code) callback.searchParams.set('code', code);
      if (tokenHash) callback.searchParams.set('token_hash', tokenHash);
      if (type) callback.searchParams.set('type', type);
      callback.searchParams.set('next', destination);
      window.location.replace(callback.toString());
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

      window.location.replace(destination);
    });
  }, []);

  return null;
}
