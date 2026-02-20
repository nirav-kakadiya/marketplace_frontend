import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { fetchAgents } from '../api';
import AgentCard from '../components/AgentCard';

const TAG_CATEGORIES = {
    'Development': ['code-quality', 'code-review', 'clean-code', 'best-practices', 'SOLID', 'design-patterns', 'refactoring', 'bugs', 'commits', 'git', 'testing', 'unit-tests', 'regex', 'developer-tools'],
    'AI & LLM': ['ai', 'llm', 'prompts', 'content-extraction', 'summarization', 'translation', 'i18n', 'languages'],
    'Web & Design': ['web', 'css', 'ui-design', 'colors', 'web-search', 'scraping'],
    'Data & APIs': ['api', 'openapi', 'database', 'sql', 'queries', 'cron', 'optimization'],
    'Content & Marketing': ['content', 'copywriting', 'marketing', 'social-media', 'notes', 'documentation'],
    'Business & Legal': ['business', 'strategy', 'contracts', 'legal', 'security', 'career', 'hiring', 'resume', 'meetings', 'scheduling', 'productivity'],
    'Utilities': ['utilities', 'analysis', 'research'],
};

function categoriseTags(allTags) {
    const assigned = new Set();
    const groups = [];
    for (const [cat, members] of Object.entries(TAG_CATEGORIES)) {
        const matched = members.filter(t => allTags.includes(t));
        matched.forEach(t => assigned.add(t));
        if (matched.length) groups.push({ name: cat, tags: matched });
    }
    const other = allTags.filter(t => !assigned.has(t) && t !== 'tag1' && t !== 'tag2');
    if (other.length) groups.push({ name: 'Other', tags: other });
    return groups;
}

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [openCat, setOpenCat] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const searchRef = useRef(null);
    const catRef = useRef(null);

    const loadAgents = useCallback(() => {
        setLoading(true);
        setError(false);
        fetchAgents()
            .then(data => {
                if (data && data.length >= 0) {
                    setAgents(data);
                    setError(false);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadAgents();
    }, [loadAgents]);

    // Fix 10: Ctrl+K / ⌘+K keyboard shortcut to focus search
    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Fix 7: Close tag dropdown on outside click
    useEffect(() => {
        if (!openCat) return;
        const handler = (e) => {
            if (catRef.current && !catRef.current.contains(e.target)) {
                setOpenCat(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [openCat]);

    const tags = useMemo(() => {
        const s = new Set();
        agents.forEach(a => (a.tags || []).forEach(t => s.add(t)));
        return [...s].sort();
    }, [agents]);

    const categories = useMemo(() => categoriseTags(tags), [tags]);

    const filtered = agents.filter(a => {
        const matchSearch = !searchQuery ||
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.tags || []).some(t => t.includes(searchQuery.toLowerCase()));
        const matchTag = !activeTag || (a.tags || []).includes(activeTag);
        return matchSearch && matchTag;
    });

    const toggleCat = (name) => setOpenCat(prev => prev === name ? null : name);

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
                                ref={searchRef}
                                type="text"
                                placeholder="Search agents..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    className="search-clear"
                                    onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                                    aria-label="Clear search"
                                >×</button>
                            )}
                            <kbd className="search-kbd">⌘K</kbd>
                        </div>
                    </div>
                    {categories.length > 0 && (
                        <div className="tag-categories" ref={catRef}>
                            <div className={`tag-filter${!activeTag ? ' active' : ''}`} onClick={() => { setActiveTag(''); setOpenCat(null); }}>All</div>
                            {categories.map(cat => (
                                <div key={cat.name} className={`tag-cat${openCat === cat.name ? ' open' : ''}`}>
                                    <button
                                        className={`tag-cat-btn${cat.tags.includes(activeTag) ? ' has-active' : ''}`}
                                        onClick={() => toggleCat(cat.name)}
                                    >
                                        {cat.name}
                                        <span className="tag-cat-arrow">{openCat === cat.name ? '▾' : '▸'}</span>
                                    </button>
                                    {openCat === cat.name && (
                                        <div className="tag-cat-tags">
                                            {cat.tags.map(t => (
                                                <div
                                                    key={t}
                                                    className={`tag-filter${activeTag === t ? ' active' : ''}`}
                                                    onClick={() => setActiveTag(activeTag === t ? '' : t)}
                                                >{t}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Fix 11: Error state with retry */}
                    {error && !loading ? (
                        <div className="empty error-state">
                            <div className="empty-icon">⚠️</div>
                            <h3>Failed to load agents</h3>
                            <p>Could not connect to the server. Please check your connection and try again.</p>
                            <button className="btn btn-primary" onClick={loadAgents} style={{ marginTop: '1rem' }}>
                                🔄 Retry
                            </button>
                        </div>
                    ) : loading ? (
                        <div className="loading"><div className="spinner"></div></div>
                    ) : filtered.length > 0 ? (
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
