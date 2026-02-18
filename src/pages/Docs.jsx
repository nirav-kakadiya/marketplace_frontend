import { useParams, Link } from 'react-router-dom';
import FadeContent from '../components/reactbits/FadeContent';
import CopyBlock from '../components/CopyBlock';
import { API_BASE } from '../api';

const sections = {
  'getting-started': {
    title: 'Getting Started',
    content: () => (
      <>
        <h2>Installation</h2>
        <p>Install the nxagent CLI with one command:</p>
        <CopyBlock text={`curl -sL ${API_BASE}/cli/install | bash`} />
        <h2>Your First Agent</h2>
        <p>Browse and install an agent:</p>
        <CopyBlock text={`nxagent search research\nnxagent install research-agent`} />
        <h2>Run It</h2>
        <p>Execute the agent with your own API key:</p>
        <CopyBlock text={`export OPENAI_API_KEY="sk-..."\nnxagent run research-agent "latest trends in AI agents"`} />
      </>
    )
  },
  'cli': {
    title: 'CLI Reference',
    content: () => (
      <>
        <h2>Commands</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-muted)' }}>Command</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-muted)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['nxagent search <query>', 'Search for agents'],
              ['nxagent install <id>', 'Install an agent'],
              ['nxagent list', 'List installed agents'],
              ['nxagent uninstall <id>', 'Remove an agent'],
              ['nxagent run <id> "<prompt>"', 'Execute an agent'],
              ['nxagent info <id>', 'Show agent details'],
            ].map(([cmd, desc]) => (
              <tr key={cmd} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem' }}><code>{cmd}</code></td>
                <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
  'api': {
    title: 'API Reference',
    content: () => (
      <>
        <h2>Base URL</h2>
        <CopyBlock text={API_BASE} />
        <h2>Endpoints</h2>
        <h3>List Agents</h3>
        <CopyBlock text={`GET ${API_BASE}/marketplace/agents`} />
        <h3>Get Agent</h3>
        <CopyBlock text={`GET ${API_BASE}/marketplace/agents/{agent_id}`} />
        <h3>Execute Agent</h3>
        <CopyBlock text={`POST ${API_BASE}/v1/agents/{agent_id}/execute\n\nHeaders:\n  Content-Type: application/json\n  X-User-LLM-Key: your-api-key\n\nBody:\n  {"prompt": "your input", "options": {}}`} />
        <h3>Install Info</h3>
        <CopyBlock text={`GET ${API_BASE}/marketplace/agents/{agent_id}/install`} />
      </>
    )
  },
  'architecture': {
    title: 'Architecture',
    content: () => (
      <>
        <h2>How It Works</h2>
        <p>The marketplace uses a <strong>user-owns-key</strong> model:</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
          <li>Agent logic runs on the marketplace server</li>
          <li>Users pass their own LLM API keys per-request via header</li>
          <li>Keys are used in-memory only, never stored</li>
          <li>Responses stream back via Server-Sent Events (SSE)</li>
        </ul>
        <h2>Agent Structure</h2>
        <p>Each agent is a directory with three files:</p>
        <CopyBlock text={`agents/your-agent/\n  ├── manifest.json   # Metadata (name, tags, triggers)\n  ├── executor.py     # Logic (async generator yielding SSE events)\n  └── SKILL.md        # User-facing documentation`} />
      </>
    )
  },
  'contribute': {
    title: 'Contributing',
    content: () => (
      <>
        <h2>Add Your Own Agent</h2>
        <p>Contributing an agent is simple:</p>
        <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>Fork the <a href="https://github.com/nirav-kakadiya/marketplace_backend">backend repo</a></li>
          <li>Copy <code>app/agents/_template/</code> to <code>app/agents/your-agent/</code></li>
          <li>Edit <code>manifest.json</code> with your agent's metadata</li>
          <li>Implement <code>executor.py</code> — the execute function</li>
          <li>Write <code>SKILL.md</code> with usage docs</li>
          <li>Submit a PR</li>
        </ol>
        <h2>Executor Template</h2>
        <CopyBlock text={`async def execute(prompt, api_key, language=None, options=None):\n    async with httpx.AsyncClient() as client:\n        yield sse_event("status", "Working...")\n        result = await call_llm(client, api_key,\n            system="Your system prompt",\n            user=prompt)\n        yield sse_event("result", result)`} />
      </>
    )
  },
};

export default function Docs() {
  const { section } = useParams();
  const active = section || 'getting-started';
  const doc = sections[active];

  const navItems = Object.entries(sections).map(([key, val]) => ({
    key, title: val.title
  }));

  return (
    <main style={{ paddingTop: '5rem', maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 3rem' }}>
      <FadeContent blur duration={500}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem' }}>
          {/* Sidebar Nav */}
          <nav className="docs-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
              Documentation
            </h3>
            {navItems.map(n => (
              <Link key={n.key} to={`/docs/${n.key}`}
                style={{
                  fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 0.75rem',
                  borderRadius: 6, transition: 'all 0.2s',
                  color: active === n.key ? 'var(--text)' : 'var(--text-muted)',
                  background: active === n.key ? 'var(--bg-card)' : 'transparent'
                }}>{n.title}</Link>
            ))}
          </nav>

          {/* Content */}
          <div className="docs-content" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '2rem'
          }}>
            {doc ? (
              <div className="prose">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{doc.title}</h1>
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  color: 'var(--text-secondary)', lineHeight: 1.8
                }}>
                  {doc.content()}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Page not found</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Select a topic from the sidebar.
                </p>
              </div>
            )}
          </div>
        </div>

        <style>{`
          .prose h2 { font-size: 1.25rem; font-weight: 600; color: var(--text); margin-top: 1.5rem; }
          .prose h3 { font-size: 1rem; font-weight: 600; color: var(--text); margin-top: 1rem; }
          .prose p { margin: 0.5rem 0; }
          @media (max-width: 768px) {
            .docs-nav { display: none !important; }
            main > div > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </FadeContent>
    </main>
  );
}
