// Utility function to get the backend API URL
// For client-side requests, we'll proxy through Next.js API routes
// For server-side requests, we'll use the BACKEND_URL environment variable

export const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_BASE || 'https://backend-452601381743.us-central1.run.app';
};

export const getApiUrl = (endpoint: string) => {
  return `${getBackendUrl()}${endpoint}`;
};
