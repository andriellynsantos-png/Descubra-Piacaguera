-- Cole tudo no Supabase: SQL Editor > New query > Run
create table if not exists admins (user_id uuid primary key references auth.users on delete cascade);
create table if not exists fotos_mural (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  caminho text not null,
  legenda text check (char_length(legenda) <= 200),
  autor text check (char_length(autor) <= 40),
  aceitou_termos_em timestamptz not null,
  criado_em timestamptz not null default now()
);
alter table admins enable row level security;
alter table fotos_mural enable row level security;

create policy "admin le a propria linha" on admins for select to authenticated using (user_id = auth.uid());
create policy "todos veem as fotos" on fotos_mural for select using (true);
create policy "logado posta" on fotos_mural for insert to authenticated with check (user_id = auth.uid());
create policy "dono ou admin apaga" on fotos_mural for delete to authenticated
  using (user_id = auth.uid() or exists (select 1 from admins a where a.user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('mural', 'mural', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "logado envia na propria pasta" on storage.objects for insert to authenticated
  with check (bucket_id = 'mural' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "dono ou admin apaga arquivo" on storage.objects for delete to authenticated
  using (bucket_id = 'mural' and ((storage.foldername(name))[1] = auth.uid()::text
         or exists (select 1 from admins a where a.user_id = auth.uid())));

-- DEPOIS de criar sua conta no site, torne-a administradora (troque o e-mail):
-- insert into admins (user_id) select id from auth.users where email = 'SEU_EMAIL@exemplo.com';
