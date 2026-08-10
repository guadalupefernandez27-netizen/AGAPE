// Este archivo hace que window.storage funcione igual que en el entorno de
// artefactos de Claude, pero guardando todo en una tabla de Supabase
// (kv_store) en vez del almacenamiento interno de Claude. Así, todo el
// código de App.jsx (copiado tal cual del artefacto) sigue funcionando sin
// tener que reescribirlo.
//
// La app siempre llama a window.storage con shared=true (todos los datos
// del local son compartidos entre todos los usuarios), así que este shim
// ignora ese parámetro y trata todo como una única tabla compartida.

import { supabase } from "./supabaseClient";

async function get(key) {
  const { data, error } = await supabase
    .from("kv_store")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return { key, value: data.value, shared: true };
}

async function set(key, value) {
  const { error } = await supabase
    .from("kv_store")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw error;
  return { key, value, shared: true };
}

async function del(key) {
  const { error } = await supabase.from("kv_store").delete().eq("key", key);
  if (error) throw error;
  return { key, deleted: true, shared: true };
}

async function list(prefix) {
  let query = supabase.from("kv_store").select("key");
  if (prefix) query = query.like("key", `${prefix}%`);
  const { data, error } = await query;
  if (error) throw error;
  return { keys: (data || []).map((d) => d.key), prefix, shared: true };
}

window.storage = {
  get: (key) => get(key),
  set: (key, value) => set(key, value),
  delete: (key) => del(key),
  list: (prefix) => list(prefix),
};
