const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const STORAGE_BASE = API_BASE.replace(/\/api\/?$/, "/storage");

export function getStorageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${STORAGE_BASE}/${path.replace(/^\//, "")}`;
}
