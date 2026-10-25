import fallback from "../data/algorithms.js";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

async function request(path, timeout = 2000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(`${BASE}${path}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { data: await res.json(), source: "api" };
  } finally {
    clearTimeout(timer);
  }
}

export async function getAlgorithms() {
  try {
    return await request("/api/algorithms");
  } catch {
    const list = fallback.map(({ id, name, category, description, complexity }) => ({
      id, name, category, description, complexity,
    }));
    return { data: list, source: "local" };
  }
}

export async function getAlgorithm(id) {
  try {
    return await request(`/api/algorithms/${id}`);
  } catch {
    return { data: fallback.find((a) => a.id === id) || null, source: "local" };
  }
}