import { useNavigate } from 'react-router-dom';
import SpotlightCard from './reactbits/SpotlightCard';

const tagColors = {
  'developer-tools': 'var(--blue)',
  'code-review': 'var(--green)',
  'research': 'var(--accent)',
  'design': 'var(--yellow)',
  'business': 'var(--accent-hover)',
  'marketing': 'var(--red)',
  'productivity': 'var(--green)',
};

export default function AgentCard({ agent }) {
  const navigate = useNavigate();

  return (
    <SpotlightCard
      className="agent-card"
      spotlightColor="rgba(230, 126, 34, 0.12)"
      onClick={() => navigate(`/agents/${agent.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>{agent.name}</h3>
          <span style={{
            fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--mono)'
          }}>v{agent.version}</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', flex: 1 }}>
          {agent.description}
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {agent.tags?.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: '0.7rem', fontWeight: 500, padding: '0.2rem 0.6rem',
              borderRadius: 99, background: 'var(--accent-muted)',
              color: tagColors[tag] || 'var(--accent-hover)'
            }}>{tag}</span>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.75rem', color: 'var(--text-dim)', paddingTop: '0.5rem',
          borderTop: '1px solid var(--border)'
        }}>
          <span>by {agent.author}</span>
          <span>{agent.requiredEnv?.[0] || 'API Key'}</span>
        </div>
      </div>
    </SpotlightCard>
  );
}
