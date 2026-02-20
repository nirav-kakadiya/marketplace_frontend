import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAgent, fetchInstall, API_BASE } from '../api';
import { useToast } from '../components/Toast';
import CopyBlock from '../components/CopyBlock';
import { agentIcon } from '../components/AgentCard';

export default function AgentDetail() {
    const { id } = useParams();
    const [agent, setAgent] = useState(null);
    const [install, setInstall] = useState(null);
    const [loading, setLoading] = useState(true);
    const copy = useToast();

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchAgent(id), fetchInstall(id)]).then(([a, inst]) => {
            setAgent(a);
            setInstall(inst);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <div className="loading"><div className="spinner"></div></div>;
    }

    if (!agent) {
        return (
            <div className="empty" style={{ paddingTop: '8rem' }}>
                <div className="empty-icon">❌</div>
                <h3>Agent not found</h3>
                <p>"{id}" doesn't exist.</p>
                <Link to="/agents" className="btn btn-secondary" style={{ marginTop: '1rem' }}>← Back to Agents</Link>
            </div>
        );
    }

    const curlCmd = `curl -X POST ${API_BASE}/v1/agents/${agent.id}/execute \\
  -H "Content-Type: application/json" \\
  -H "X-User-LLM-Key: $OPENAI_API_KEY" \\
  -d '{"prompt": "your input here"}'`;

    return (
        <div className="page-enter">
            <div className="container">
                <Link className="back-link" to="/agents">← Back to Agents</Link>
            </div>
            <div className="agent-hero">
                <div className="container">
                    <div className="agent-hero-inner">
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                {(agent.tags || []).map(t => (
                                    <span key={t} className="badge badge-accent">{t}</span>
                                ))}
                                <span className="badge badge-muted">v{agent.version}</span>
                            </div>
                            <h1>{agentIcon(agent.id)} {agent.name}</h1>
                            <p className="desc">{agent.description}</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>by <strong style={{ color: 'var(--text-secondary)' }}>{agent.author}</strong></p>
                        </div>
                        <div className="agent-hero-actions">
                            <div className="install-cmd" onClick={() => copy(`nxagent install ${agent.id}`)}>
                                <span>$ nxagent install {agent.id}</span>
                                <span className="hint">Click to copy</span>
                            </div>
                            <Link to="/docs" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>📖 Setup Guide</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="agent-content">
                    <div className="agent-main">
                        <h2>Quick Start</h2>
                        <p>Install and use this agent in 3 steps:</p>
                        <CopyBlock code={`nxagent install ${agent.id}\n\nopenclaw gateway restart`}>
                            <span style={{ color: 'var(--text-dim)' }}># 1. Install the agent</span>{'\n'}
                            nxagent install {agent.id}{'\n\n'}
                            <span style={{ color: 'var(--text-dim)' }}># 2. Restart OpenClaw</span>{'\n'}
                            openclaw gateway restart{'\n\n'}
                            <span style={{ color: 'var(--text-dim)' }}># 3. Ask OpenClaw to use it!</span>
                        </CopyBlock>

                        <h2>What It Does</h2>
                        <p>{agent.description}</p>
                        <p><strong>Trigger phrases:</strong> Say any of these to OpenClaw and this agent will activate:</p>
                        <ul className="trigger-list">
                            {(agent.trigger || []).map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>

                        <h2>API Usage</h2>
                        <p>If you want to call the agent directly (without OpenClaw):</p>
                        <CopyBlock code={curlCmd}>
                            {`curl -X POST ${API_BASE}/v1/agents/${agent.id}/execute \\
  -H "Content-Type: application/json" \\
  -H "X-User-LLM-Key: $OPENAI_API_KEY" \\
  -d '{"prompt": "your input here"}'`}
                        </CopyBlock>

                        <h2>Response Format</h2>
                        <p>The API returns <strong>Server-Sent Events (SSE)</strong>:</p>
                        <div className="table-wrap">
                            <table>
                                <tbody>
                                    <tr><th>Event</th><th>Description</th></tr>
                                    <tr><td><code>status</code></td><td>Progress updates — show to user while waiting</td></tr>
                                    <tr><td><code>result</code></td><td>Final output in markdown — return to user</td></tr>
                                    <tr><td><code>error</code></td><td>Error message if something went wrong</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {install?.files?.['SKILL.md'] && (
                            <>
                                <h2>Setup Guide</h2>
                                <p>This agent includes a <code>SKILL.md</code> file that OpenClaw uses to understand when and how to invoke it:</p>
                                <CopyBlock code={install.files['SKILL.md']}>
                                    {install.files['SKILL.md']}
                                </CopyBlock>
                            </>
                        )}

                        {install?.install_commands && install.install_commands.length > 0 && (
                            <>
                                <h2>Install Commands</h2>
                                <p>These commands are run automatically during installation:</p>
                                <CopyBlock code={install.install_commands.join('\n')}>
                                    {install.install_commands.join('\n')}
                                </CopyBlock>
                            </>
                        )}
                    </div>

                    <div className="agent-sidebar">
                        <div className="sidebar-card">
                            <h4>Details</h4>
                            <div className="sidebar-item"><span className="label">Version</span><span className="value">{agent.version}</span></div>
                            <div className="sidebar-item"><span className="label">Author</span><span className="value">{agent.author}</span></div>
                            <div className="sidebar-item"><span className="label">License</span><span className="value">MIT</span></div>
                        </div>
                        <div className="sidebar-card">
                            <h4>Required Keys</h4>
                            {(agent.requiredEnv || []).map(k => (
                                <div key={k} className="env-item env-item-copy" onClick={() => copy(k)} title="Click to copy">
                                    <span className="env-dot"></span>
                                    <span className="env-name">{k}</span>
                                    <span className="hint">Copy</span>
                                </div>
                            ))}
                        </div>
                        <div className="sidebar-card">
                            <h4>Install</h4>
                            <div className="install-cmd" onClick={() => copy(`nxagent install ${agent.id}`)} style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem' }}>$ nxagent install {agent.id}</span>
                                <span className="hint">Click to copy</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>Requires <Link to="/docs/cli">nxagent CLI</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
