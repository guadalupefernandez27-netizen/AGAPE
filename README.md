# Stock Cafetería — Ágape

Esta es la versión "web de verdad" de la app de control de stock: en vez de vivir
dentro del chat de Claude, queda publicada en su propia dirección de internet,
con los datos guardados en una base de datos real (Supabase) y con ícono propio
al agregarla a la pantalla de inicio del celular.

La app en sí (pantallas, botones, lógica) es exactamente la misma que ya
probaste en el chat. Lo único que cambia es *dónde* vive y *dónde* se guardan
los datos.

---

## Paso 1 — Crear el proyecto en Supabase (la base de datos, gratis)

1. Entrá a https://supabase.com y creá una cuenta (podés usar tu cuenta de Google).
2. Tocá **New project**. Elegí un nombre (ej. "stock-agape"), una contraseña
   para la base (guardala, no la vas a necesitar de nuevo salvo casos raros) y
   una región cercana (ej. South America).
3. Esperá 1-2 minutos a que el proyecto termine de crearse.
4. Andá a **SQL Editor** (ícono de la izquierda) → **New query**.
5. Abrí el archivo `supabase-schema.sql` de esta carpeta, copiá todo su
   contenido, pegalo en el editor y tocá **Run**. Esto crea la tabla donde se
   guarda todo.
6. Andá a **Project Settings** (ícono de tuerca) → **API**. Ahí vas a ver:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public key** (una clave larga)

   Vas a necesitar esos dos datos en el paso 3.

---

## Paso 2 — Probarlo en tu computadora (opcional pero recomendado)

Necesitás tener [Node.js](https://nodejs.org) instalado (versión 18 o más
nueva). Después, desde una terminal, parado en esta carpeta:

```bash
npm install
cp .env.example .env
```

Abrí el archivo `.env` que se creó y completá con los datos del Paso 1:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-larga
```

Después corré:

```bash
npm run dev
```

Y abrí la dirección que te muestra (normalmente `http://localhost:5173`) en
el navegador. Deberías ver la app funcionando, con el usuario Admin/1234
inicial. Si entra y podés loguearte, ¡ya está todo conectado!

---

## Paso 3 — Publicarla en internet (Vercel, gratis)

1. Entrá a https://vercel.com y creá una cuenta (podés usar tu cuenta de GitHub).
2. La forma más simple es subir esta carpeta a un repositorio de GitHub y
   conectarlo desde Vercel ("Add New… → Project → Import Git Repository").
   Si no usás GitHub, también podés instalar la [Vercel CLI](https://vercel.com/docs/cli)
   y correr `vercel` desde esta carpeta — te va a guiar paso a paso.
3. Cuando Vercel te pregunte por las variables de entorno, agregá las mismas
   dos del Paso 1:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Confirmá el deploy. En un minuto vas a tener una URL propia, algo como
   `stock-agape.vercel.app`.
5. (Opcional) Si tenés un dominio propio, en Vercel podés asociarlo a este
   proyecto desde **Settings → Domains**.

---

## Paso 4 — Que cada empleado la agregue a su pantalla de inicio

Compartí la URL final (por WhatsApp, por ejemplo) y que cada uno:

- **iPhone**: abrir la URL en Safari → tocar el ícono de compartir → "Agregar
  a pantalla de inicio".
- **Android**: abrir la URL en Chrome → menú (⋮) → "Agregar a pantalla de
  inicio" / "Instalar app".

Va a quedar con el ícono de Ágape, y al abrirla se ve a pantalla completa,
sin la barra del navegador.

---

## Cargar los datos iniciales

Los datos del artefacto que probaste en el chat **no se trasladan
automáticamente** acá — es una base de datos nueva y vacía. Pero es rápido
recuperar todo:

1. Entrá como **Admin / 1234** (cambiá el PIN cuanto antes desde Empleados).
2. Cargá empleados, categorías y proveedores igual que antes.
3. Para los insumos, usá el botón **"Importar Excel"** dentro de Insumos y
   subí tu archivo `stocks.xlsx` — carga los 103 insumos de una sola vez.
4. Volvé a armar las asignaciones de turnos.

---

## Nota sobre seguridad

Esta configuración usa la "anon key" pública de Supabase con permisos de
lectura/escritura abiertos sobre la tabla de datos — es decir, cualquiera que
tenga la URL de Supabase y esa clave podría leer o modificar los datos
directamente (sin pasar por el login de la app). Para un local chico con URL
no publicada es un riesgo bajo, pero no es lo mismo que un sistema con
seguridad de nivel empresarial. Si en algún momento querés reforzarlo (por
ejemplo, exigiendo autenticación real de Supabase en vez del PIN interno),
decime y lo armamos.

---

## Estructura del proyecto

```
├── index.html              # HTML base + metadatos PWA
├── manifest.json (public/) # Ícono y nombre para "agregar a inicio"
├── supabase-schema.sql     # Tabla a crear en Supabase
├── .env.example            # Variables de entorno (copiar a .env)
├── src/
│   ├── main.jsx             # Punto de entrada
│   ├── App.jsx               # Toda la app (igual que en el chat)
│   ├── storage.js            # Conecta window.storage con Supabase
│   └── supabaseClient.js     # Cliente de Supabase
└── public/icons/            # Íconos generados a partir de tu logo
```
