import { useNavigate } from 'react-router-dom';
import SpotlightCard from './reactbits/SpotlightCard';

function agentIcon(id) {
    const icons = { 'research-agent': '🔍', 'code-reviewer': '🐛', 'email-writer': '✉️', 'summarizer': '📝', 'translator': '🌐' };
    return icons[id] || '⚡';
}

export { agentIcon };

export default function AgentCard({ agent }) {
    const navigate = useNavigate();

    return (
        <SpotlightCard
            className="agent-card"
            spotlightColor="rgba(163, 87, 255, 0.15)"
            onClick={() => navigate(`/agents/${agent.id}`)}
        >
            <div className="agent-card-top">
                <h3>{agentIcon(agent.id)} {agent.name}</h3>
                <span className="badge badge-muted">v{agent.version}</span>
            </div>
            <p className="desc">{agent.description}</p>
            <div className="agent-card-footer">
                <div className="agent-card-tags">
                    {(agent.tags || []).map(t => (
                        <span key={t} className="badge badge-accent">{t}</span>
                    ))}
                </div>
                <span className="agent-card-meta">by {agent.author}</span>
            </div>
        </SpotlightCard>
    );
}
