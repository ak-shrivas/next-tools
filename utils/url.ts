// utils/url.ts
export function buildShareUrl(basePath: string, params: Record<string, string | number | undefined | null>) {
  if (typeof window === "undefined") {
    // fallback: build relative URL
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
    });
    return `${basePath}?${q.toString()}`;
  }
  const url = new URL(basePath, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  });
  return url.toString();
}
