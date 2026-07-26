export const siteConfig = {
  name: import.meta.env.VITE_APP_TITLE,
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
};