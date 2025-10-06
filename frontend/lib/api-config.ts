// Utility function to get the backend API URL
// For client-side requests, we'll proxy through Next.js API routes
// For server-side requests, we'll use the BACKEND_URL environment variable

export const getBackendUrl = () => {
  // Server-side: use environment variable
  if (typeof window === 'undefined') {
    return process.env.BACKEND_URL || 'http://backend:8000';
  }
  
  // Client-side: use Next.js API routes as proxy
  return '';
};

export const getApiUrl = (endpoint: string) => {
  const backendUrl = getBackendUrl();
  
  // Server-side: direct backend call
  if (typeof window === 'undefined') {
    return `${backendUrl}${endpoint}`;
  }
  
  // Client-side: use Next.js API routes
  return `/api/proxy${endpoint}`;
};