export const VITE_ENV = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
} as const;
