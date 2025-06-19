/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_OPEN_WEBUI_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}