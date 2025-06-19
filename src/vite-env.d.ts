/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_BASE_URL: string
  readonly VITE_N8N_PORT: string
  readonly VITE_SUPABASE_PORT: string
  readonly VITE_OPEN_WEBUI_PORT: string
  readonly VITE_N8N_HEALTH_URL: string
  readonly VITE_SUPABASE_HEALTH_URL: string
  readonly VITE_OPEN_WEBUI_HEALTH_URL: string
  readonly VITE_SUPABASE_EXTERNAL_AVAILABLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}