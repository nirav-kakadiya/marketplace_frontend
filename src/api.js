const API_BASE = window.__MARKETPLACE_API__ || import.meta.env.VITE_BACKEND_URL || 'https://api.nextbase.solutions';

export { API_BASE };

export async function fetchAgents() {
    try {
        const res = await fetch(`${API_BASE}/marketplace/agents`);
        const data = await res.json();
        return data.agents || [];
    } catch (e) {
        console.error('Failed to fetch agents:', e);
        return [];
    }
}

export async function fetchAgent(id) {
    try {
        const res = await fetch(`${API_BASE}/marketplace/agents/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        return null;
    }
}

export async function fetchInstall(id) {
    try {
        const res = await fetch(`${API_BASE}/marketplace/agents/${id}/install`);
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        return null;
    }
}
