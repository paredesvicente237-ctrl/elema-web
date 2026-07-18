export const hasSupabasePublicConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const hasSupabaseAdminConfig = Boolean(
  hasSupabasePublicConfig && process.env.SUPABASE_SERVICE_ROLE_KEY,
);
