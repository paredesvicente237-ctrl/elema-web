import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function CheckoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/ingresar?next=/checkout');
  }

  return children;
}
