import { useEffect, useState } from 'react';
import FadeContent from '../components/reactbits/FadeContent';
import AgentCard from '../components/AgentCard';
import { fetchAgents } from '../api';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents()
      .then(d => setAgents(d.agents || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTags = [...new Set(agents.flatMap(a => a.tags || []))].sort();

  const filtered = agents.filter(a => {
    const matchesSearch = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !activeTag || a.tags?.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <main style={{ paddingTop: '5rem', maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 3rem' }}>
      <FadeContent blur duration={500}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Agents</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {filtered.length} {filtered.length === 1 ? 'agent' : 'agents'} available
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', background: 'var(--bg-input)',
            border: '1px solid var(--border)', borderRadius: 8, padding: '0 1rem', gap: '0.5rem',
            minWidth: 280, transition: 'border-color 0.2s'
          }}>
            <span style={{ color: 'var(--text-dim)' }}>🔍</span>
            <input
              type="text" placeholder="Search agents..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, background: 'none', border: 'none', color: 'var(--text)',
                fontFamily: 'var(--font)', fontSize: '0.9rem', padding: '0.7rem 0', outline: 'none'
              }}
            />
          </div>
        </div>
      </FadeContent>

      {/* Tag Filters */}
      <FadeContent blur duration={400} delay={200}>
        <div style={{
          display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem',
          overflowX: 'auto', WebkitOverflowScrolling: 'touch'
        }}>
          <button onClick={() => setActiveTag('')}
            style={{
              padding: '0.35rem 0.875rem', borderRadius: 99, fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s', border: '1px solid',
              background: !activeTag ? 'var(--accent-muted)' : 'var(--bg-card)',
              color: !activeTag ? 'var(--accent-hover)' : 'var(--text-muted)',
              borderColor: !activeTag ? 'var(--accent)' : 'var(--border)',
              flexShrink: 0
            }}>All</button>
          {allTags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              style={{
                padding: '0.35rem 0.875rem', borderRadius: 99, fontSize: '0.8rem', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.2s', border: '1px solid',
                background: activeTag === tag ? 'var(--accent-muted)' : 'var(--bg-card)',
                color: activeTag === tag ? 'var(--accent-hover)' : 'var(--text-muted)',
                borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
                flexShrink: 0
              }}>{tag}</button>
          ))}
        </div>
      </FadeContent>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div style={{
            width: 32, height: 32, border: '3px solid var(--border)',
            borderTopColor: 'var(--accent)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🔍</div>
          <h3>No agents found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Try a different search term or clear the filters.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {filtered.map((a, i) => (
            <FadeContent key={a.id} blur duration={400} delay={i * 50}>
              <AgentCard agent={a} />
            </FadeContent>
          ))}
        </div>
      )}
    </main>
  );
}
