export function getAPIBackendUrl() {
  const envVariable = import.meta.env.VITE_BACKEND_URL;

  return envVariable;
}
