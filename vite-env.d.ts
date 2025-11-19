/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AUTH_API_URL: string;
  readonly VITE_USER_API_URL: string;
  readonly VITE_PRODUCT_API_URL: string;
  readonly VITE_ORDER_API_URL: string;
  readonly VITE_ENABLE_IMAGES: string;
  readonly VITE_ENABLE_EMAIL: string;
  readonly VITE_ENABLE_GOOGLE_AUTH: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}