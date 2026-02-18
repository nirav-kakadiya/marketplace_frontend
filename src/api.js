const API_BASE = window.__MARKETPLACE_API__ || 'https://api.nextbase.solutions';

export async function fetchAgents() {
  const res = await fetch(`${API_BASE}/marketplace/agents`);
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
}

export async function fetchAgent(id) {
  const res = await fetch(`${API_BASE}/marketplace/agents/${id}`);
  if (!res.ok) throw new Error('Agent not found');
  return res.json();
}

export async function fetchInstall(id) {
  const res = await fetch(`${API_BASE}/marketplace/agents/${id}/install`);
  if (!res.ok) throw new Error('Install info not found');
  return res.json();
}

export { API_BASE };
