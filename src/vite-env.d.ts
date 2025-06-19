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
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_STUDIO_URL: string
  readonly VITE_SUPABASE_INTERNAL_URL: string
  readonly VITE_SUPABASE_AUTH_INTERNAL_URL: string
  readonly VITE_SUPABASE_REST_INTERNAL_URL: string
  readonly VITE_SUPABASE_REALTIME_INTERNAL_URL: string
  readonly VITE_SUPABASE_STORAGE_INTERNAL_URL: string
  readonly VITE_N8N_SUPABASE_URL: string
  readonly VITE_N8N_SUPABASE_REST_URL: string
  readonly VITE_OPEN_WEBUI_URL: string
  readonly VITE_OPEN_WEBUI_INTERNAL_URL: string
  readonly VITE_DASHBOARD_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}