import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlurText from '../components/reactbits/BlurText';
import SplitText from '../components/reactbits/SplitText';
import FadeContent from '../components/reactbits/FadeContent';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import { fetchAgents, API_BASE } from '../api';
import AgentCard from '../components/AgentCard';

export default function Home() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents().then(d => setAgents(d.agents?.slice(0, 6) || [])).catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <section style={{
        minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 1.5rem 4rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 600,
          background: 'radial-gradient(ellipse, var(--accent-muted) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 720, position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <BlurText
              text="Install AI Agents in One Command"
              delay={100}
              animateBy="words"
              className="hero-title"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}
            />
          </div>
          <FadeContent blur duration={800} delay={500}>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: 540, margin: '0 auto 2.5rem' }}>
              Open-source marketplace for AI agents. Use your own API keys. No vendor lock-in. 
              Install with <code>nxagent install</code>.
            </p>
          </FadeContent>
          <FadeContent blur duration={600} delay={800}>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/agents')}
                style={{
                  background: 'var(--accent)', color: 'white', border: 'none',
                  padding: '0.75rem 1.75rem', borderRadius: 8, fontWeight: 600,
                  fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 2px 12px rgba(230,126,34,0.2)'
                }}>
                Browse Agents →
              </button>
              <button onClick={() => navigate('/docs')}
                style={{
                  background: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)',
                  padding: '0.75rem 1.75rem', borderRadius: 8, fontWeight: 600,
                  fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                Read Docs
              </button>
            </div>
          </FadeContent>

          <FadeContent blur duration={600} delay={1100}>
            <div onClick={() => {navigator.clipboard.writeText(`curl -sL ${API_BASE}/cli/install | bash`)}}
              style={{
                marginTop: '2rem', background: 'var(--bg-code)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '0.75rem 1rem', fontFamily: 'var(--mono)',
                fontSize: '0.85rem', color: 'var(--green)', cursor: 'pointer',
                maxWidth: 560, margin: '2rem auto 0', transition: 'border-color 0.2s'
              }}>
              $ curl -sL {API_BASE}/cli/install | bash
            </div>
          </FadeContent>
        </div>
      </section>

      {/* How It Works */}
      <FadeContent blur duration={600}>
        <section style={{ padding: '4rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            How It Works
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Three steps. No accounts. No billing.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { num: '1', title: 'Install the CLI', desc: 'One curl command installs nxagent on your system.' },
              { num: '2', title: 'Pick an Agent', desc: 'Browse the marketplace and install agents with nxagent install.' },
              { num: '3', title: 'Run with Your Key', desc: 'Pass your own LLM API key. We never store it.' },
            ].map(s => (
              <SpotlightCard key={s.num} spotlightColor="rgba(230,126,34,0.08)">
                <div style={{ padding: '0.5rem' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-muted)',
                    color: 'var(--accent-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem'
                  }}>{s.num}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{s.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </FadeContent>

      {/* Security */}
      <FadeContent blur duration={600}>
        <section style={{ padding: '4rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Your Keys. Your Control.
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            We never store, log, or see your API keys.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🔑', title: 'Pass via Header', desc: 'Keys are sent in X-User-LLM-Key header per-request.' },
              { icon: '🧠', title: 'In-Memory Only', desc: 'Keys are used to call the LLM, then immediately discarded.' },
              { icon: '🛡️', title: 'Open Source', desc: 'Inspect every line. No hidden telemetry. MIT licensed.' },
            ].map(s => (
              <SpotlightCard key={s.title} spotlightColor="rgba(230,126,34,0.08)">
                <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{s.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </FadeContent>

      {/* Featured Agents */}
      {agents.length > 0 && (
        <FadeContent blur duration={600}>
          <section style={{ padding: '4rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Featured Agents</h2>
              <button onClick={() => navigate('/agents')}
                style={{
                  background: 'transparent', color: 'var(--accent-hover)', border: 'none',
                  fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem'
                }}>View all →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
              {agents.map(a => <AgentCard key={a.id} agent={a} />)}
            </div>
          </section>
        </FadeContent>
      )}
    </main>
  );
}
