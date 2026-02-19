import { useEffect, useState, useMemo } from 'react';
import { fetchAgents } from '../api';
import AgentCard from '../components/AgentCard';

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [showAllTags, setShowAllTags] = useState(false);

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
        <div className="page-enter">
            <section className="section" style={{ paddingTop: 'var(--page-top)' }}>
                <div className="container">
                    <div className="agents-header">
                        <div>
                            <h1>Agents</h1>
                            <p>{agents.length} agents available</p>
                        </div>
                        <div className="search-bar">
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
                        <div className="tag-filters-wrap">
                            <div className={`tag-filters${showAllTags ? ' expanded' : ''}`}>
                                <div className={`tag-filter${!activeTag ? ' active' : ''}`} onClick={() => setActiveTag('')}>All</div>
                                {tags.map(t => (
                                    <div key={t} className={`tag-filter${activeTag === t ? ' active' : ''}`} onClick={() => setActiveTag(t)}>{t}</div>
                                ))}
                            </div>
                            {tags.length > 10 && (
                                <button className="tag-toggle" onClick={() => setShowAllTags(v => !v)}>
                                    {showAllTags ? 'Show less' : `+${tags.length} tags`}
                                </button>
                            )}
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
