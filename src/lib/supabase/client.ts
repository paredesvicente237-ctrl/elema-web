import { createBrowserClient } from '@supabase/ssr';
import { hasSupabasePublicConfig } from './config';

export function createClient() {
  if (!hasSupabasePublicConfig) return null;

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
