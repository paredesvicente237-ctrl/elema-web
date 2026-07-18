create extension if not exists pgcrypto;

create type public.order_status as enum (
  'pending_confirmation', 'confirmed', 'in_production',
  'ready_for_dispatch', 'shipped', 'delivered', 'cancelled'
);

create sequence if not exists public.order_number_seq;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  phone text,
  marketing_opt_in boolean not null default false,
  marketing_consent_at timestamptz,
  marketing_unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default (
    'ELM-' || to_char(now(), 'YYMM') || '-' || lpad(nextval('public.order_number_seq')::text, 5, '0')
  ),
  user_id uuid not null references auth.users(id) on delete restrict,
  status public.order_status not null default 'pending_confirmation',
  subtotal integer not null check (subtotal >= 0),
  total integer not null check (total >= 0),
  currency text not null default 'CLP' check (currency = 'CLP'),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  region text not null,
  commune text not null,
  address text not null,
  notes text,
  carrier text,
  tracking_code text,
  tracking_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0 and quantity <= 20),
  line_total integer generated always as (unit_price * quantity) stored
);

create table public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.order_status not null,
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

create index orders_user_id_created_at_idx on public.orders(user_id, created_at desc);
create index order_items_order_id_idx on public.order_items(order_id);
create index order_events_order_id_created_at_idx on public.order_events(order_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_events enable row level security;

create policy "Clientes leen su perfil" on public.profiles for select using (auth.uid() = id);
create policy "Clientes actualizan su perfil" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Clientes leen sus pedidos" on public.orders for select using (auth.uid() = user_id);
create policy "Clientes leen items de sus pedidos" on public.order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Clientes leen eventos de sus pedidos" on public.order_events for select using (
  exists (select 1 from public.orders where orders.id = order_events.order_id and orders.user_id = auth.uid())
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();
create trigger orders_set_updated_at before update on public.orders
for each row execute procedure public.set_updated_at();
