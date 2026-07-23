import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;
  const authError = url.searchParams.get('error_description') ?? url.searchParams.get('error');
  const requestedNext = url.searchParams.get('next');
  const fallbackNext = ['invite', 'recovery'].includes(type ?? '') ? '/actualizar-clave' : '/mi-elem';
  const next = requestedNext?.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : fallbackNext;

  if (authError) return redirectToLogin(url, authError);

  const supabase = await createClient();
  if (supabase) {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(next, url.origin));
    } else if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
      if (!error) return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return redirectToLogin(url, 'El enlace no es válido o ya expiró. Solicita uno nuevo.');
}

function redirectToLogin(url: URL, message: string) {
  const login = new URL('/ingresar', url.origin);
  login.searchParams.set('error', message);
  return NextResponse.redirect(login);
}
