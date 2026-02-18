import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FadeContent from '../components/reactbits/FadeContent';
import CopyBlock from '../components/CopyBlock';
import { fetchAgent, fetchInstall, API_BASE } from '../api';

export default function AgentDetail() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [install, setInstall] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([fetchAgent(id), fetchInstall(id)])
      .then(([a, i]) => { setAgent(a); setInstall(i); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <main style={{ paddingTop: '5rem', display: 'flex', justifyContent: 'center', padding: '8rem 1.5rem' }}>
      <div style={{
        width: 32, height: 32, border: '3px solid var(--border)',
        borderTopColor: 'var(--accent)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );

  if (error || !agent) return (
    <main style={{ paddingTop: '5rem', textAlign: 'center', padding: '8rem 1.5rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
      <h2>Agent not found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        "{id}" doesn't exist.
      </p>
      <Link to="/agents" style={{
        background: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)',
        padding: '0.6rem 1.25rem', borderRadius: 8, fontWeight: 500
      }}>← Back to Agents</Link>
    </main>
  );

  const curlCmd = `curl -X POST ${API_BASE}/v1/agents/${agent.id}/execute \\
  -H "Content-Type: application/json" \\
  -H "X-User-LLM-Key: $OPENAI_API_KEY" \\
  -d '{"prompt": "your input here"}'`;

  return (
    <main style={{ paddingTop: '5rem', maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 3rem' }}>
      <Link to="/agents" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem'
      }}>← Back to Agents</Link>

      <FadeContent blur duration={500}>
        {/* Hero */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '2rem', marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{agent.name}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1rem' }}>
                {agent.description}
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {agent.tags?.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.75rem', fontWeight: 500, padding: '0.25rem 0.7rem',
                    borderRadius: 99, background: 'var(--accent-muted)', color: 'var(--accent-hover)'
                  }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 220 }}>
              <div onClick={() => navigator.clipboard.writeText(`nxagent install ${agent.id}`)}
                style={{
                  background: 'var(--bg-code)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '0.75rem 1rem', fontFamily: 'var(--mono)',
                  fontSize: '0.85rem', color: 'var(--green)', cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}>
                $ nxagent install {agent.id}
              </div>
            </div>
          </div>
        </div>
      </FadeContent>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
        {/* Main Content */}
        <FadeContent blur duration={500} delay={200}>
          <div>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Start</h3>
              <CopyBlock text={curlCmd} />
            </div>

            {install?.files?.['SKILL.md'] && (
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Documentation</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  <code>{install.files['SKILL.md']}</code>
                </pre>
              </div>
            )}
          </div>
        </FadeContent>

        {/* Sidebar */}
        <FadeContent blur duration={500} delay={300}>
          <div>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '1.5rem', marginBottom: '1rem'
            }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                Details
              </h4>
              {[
                ['Version', agent.version],
                ['Author', agent.author],
                ['ID', agent.id],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '1.5rem', marginBottom: '1rem'
            }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                Required Keys
              </h4>
              {agent.requiredEnv?.map(env => (
                <div key={env} style={{
                  background: 'var(--bg-code)', border: '1px solid var(--border)',
                  borderRadius: 6, padding: '0.6rem 0.875rem', marginBottom: '0.5rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>{env}</span>
                </div>
              ))}
            </div>

            {agent.trigger?.length > 0 && (
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.5rem'
              }}>
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                  Trigger Phrases
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {agent.trigger.map(t => (
                    <li key={t} style={{
                      fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0.3rem 0'
                    }}>
                      <span style={{ color: 'var(--accent)' }}>"</span>{t}<span style={{ color: 'var(--accent)' }}>"</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </FadeContent>
      </div>

      <style>{`
        @media (max-width: 768px) {
          main > div:last-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
