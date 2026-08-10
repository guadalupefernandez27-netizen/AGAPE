-- Esquema para el control de stock de Ágape.
-- Corré este script una sola vez en Supabase: Project > SQL Editor > New query > pegar > Run.

create table if not exists kv_store (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table kv_store enable row level security;

-- Política simple: cualquiera con la "anon key" del proyecto puede leer y escribir.
-- Es aceptable para una herramienta interna con URL no publicada, pero OJO:
-- cualquiera que consiga la URL + anon key puede leer/modificar los datos.
-- Si más adelante querés reforzar esto (por ejemplo, exigir login real de
-- Supabase Auth en vez del PIN interno de la app), avisame y lo ajustamos.

create policy "kv_store_select" on kv_store
  for select using (true);

create policy "kv_store_insert" on kv_store
  for insert with check (true);

create policy "kv_store_update" on kv_store
  for update using (true);

create policy "kv_store_delete" on kv_store
  for delete using (true);
