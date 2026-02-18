import { useEffect, useState, useMemo } from 'react';
import { fetchAgents } from '../api';
import AgentCard from '../components/AgentCard';

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('');

    useEffect(() => {
        fetchAgents().then(setAgents);
    }, []);

    const tags = useMemo(() => {
        const s = new Set();
        agents.forEach(a => (a.tags || []).forEach(t => s.add(t)));
        return [...s].sort();
    }, [agents]);

    const filtered = agents.filter(a => {
        const matchSearch = !searchQuery ||
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.tags || []).some(t => t.includes(searchQuery.toLowerCase()));
        const matchTag = !activeTag || (a.tags || []).includes(activeTag);
        return matchSearch && matchTag;
    });

    return (
        <div className="page-enter" style={{ paddingTop: '5rem' }}>
            <section className="section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Agents</h1>
                            <p style={{ margin: 0 }}>{agents.length} agents available</p>
                        </div>
                        <div className="search-bar" style={{ width: '320px' }}>
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search agents..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    {tags.length > 0 && (
                        <div className="tag-filters">
                            <div className={`tag-filter${!activeTag ? ' active' : ''}`} onClick={() => setActiveTag('')}>All</div>
                            {tags.map(t => (
                                <div key={t} className={`tag-filter${activeTag === t ? ' active' : ''}`} onClick={() => setActiveTag(t)}>{t}</div>
                            ))}
                        </div>
                    )}
                    {filtered.length > 0 ? (
                        <div className="agents-grid">
                            {filtered.map(a => <AgentCard key={a.id} agent={a} />)}
                        </div>
                    ) : (
                        <div className="empty">
                            <div className="empty-icon">🔍</div>
                            <h3>No agents found</h3>
                            <p>Try a different search term or clear the filters.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
