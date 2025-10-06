// Utility function to get the backend API URL
// For client-side requests, we'll proxy through Next.js API routes
// For server-side requests, we'll use direct backend URL

export function getBackendUrl(): string {
    return process.env.BACKEND_URL || 'http://backend:8080';
}

export const getApiUrl = (endpoint: string) => {
  const backendUrl = getBackendUrl();
  
  // Server-side: direct backend call
  if (typeof window === 'undefined') {
    return `${backendUrl}${endpoint}`;
  }
  
  // Client-side: use Next.js API routes
  return `/api/proxy${endpoint}`;
};