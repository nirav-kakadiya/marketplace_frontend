import { Link, useParams } from 'react-router-dom';
import CopyBlock from '../components/CopyBlock';
import FadeContent from '../components/reactbits/FadeContent';
import { API_BASE } from '../api';

function DocsOverview() {
    return <>
        <h1>Documentation</h1>
        <p>The Nextbase Agent Marketplace lets you install powerful AI agents into <a href="https://openclaw.ai" target="_blank" rel="noreferrer">OpenClaw</a> with a single command.</p>
        <h2>What is this?</h2>
        <p>Think of it like <strong>npm for AI agents</strong>. You browse a marketplace, install agents with one command, and use them through OpenClaw.</p>
        <p>The key difference from normal skills: <strong>the agent logic stays on our server</strong>. You only get a lightweight instruction file. Your API keys stay on your machine.</p>
        <h2>How it works</h2>
        <ul>
            <li><strong>Browse</strong> — Find agents with <code>nxagent search</code> or on this website</li>
            <li><strong>Install</strong> — Run <code>nxagent install agent-name</code></li>
            <li><strong>Use</strong> — Talk to OpenClaw naturally. It knows when to use the agent.</li>
        </ul>
        <h2>Next steps</h2>
        <ul>
            <li><Link to="/docs/quickstart">Quick Start Guide</Link> — Get your first agent running in 60 seconds</li>
            <li><Link to="/agents">Browse Agents</Link> — See what's available</li>
            <li><Link to="/docs/cli">CLI Reference</Link> — All commands explained</li>
        </ul>
    </>;
}

function DocsQuickstart() {
    return <>
        <h1>Quick Start</h1>
        <p>Get your first agent running in under 60 seconds.</p>
        <h2>Prerequisites</h2>
        <ul>
            <li><a href="https://openclaw.ai" target="_blank" rel="noreferrer">OpenClaw</a> installed and running</li>
            <li>Python 3.8+ on your machine</li>
            <li>An OpenAI API key</li>
        </ul>
        <h2>Step 1: Install the CLI</h2>
        <CopyBlock code={`curl -sL ${API_BASE}/cli/install | bash`} />
        <p>Or manually:</p>
        <CopyBlock code={`sudo curl -sL ${API_BASE}/cli/nxagent -o /usr/local/bin/nxagent && sudo chmod +x /usr/local/bin/nxagent`}>
            {`sudo curl -sL ${API_BASE}/cli/nxagent -o /usr/local/bin/nxagent\nsudo chmod +x /usr/local/bin/nxagent`}
        </CopyBlock>
        <h2>Step 2: Install an agent</h2>
        <CopyBlock code="nxagent install research-agent" />
        <p>The CLI will:</p>
        <ul>
            <li>Download skill files to <code>~/.openclaw/workspace/skills/research-agent/</code></li>
            <li>Prompt you for your <code>OPENAI_API_KEY</code> if it's missing</li>
            <li>Save the key to <code>~/.openclaw/.env</code></li>
        </ul>
        <h2>Step 3: Restart OpenClaw</h2>
        <CopyBlock code="openclaw gateway restart" />
        <h2>Step 4: Use it!</h2>
        <p>Just talk to OpenClaw naturally:</p>
        <pre><code><span style={{ color: 'var(--blue)' }}>You:</span> Research the latest trends in AI agents{'\n'}<span style={{ color: 'var(--green)' }}>OpenClaw:</span> 🔍 Generating search queries...{'\n'}          Found 12 results. Summarizing...{'\n'}          ## AI Agent Trends 2026 ...</code></pre>
    </>;
}

function DocsCli() {
    return <>
        <h1>CLI Reference</h1>
        <p>The <code>nxagent</code> CLI is your interface to the marketplace.</p>
        <h2>Commands</h2>
        <div className="cli-grid">
            <div className="cli-row"><code>nxagent search &lt;query&gt;</code><span>Search agents by name, description, or tags</span></div>
            <div className="cli-row"><code>nxagent info &lt;agent-id&gt;</code><span>View agent details and required keys</span></div>
            <div className="cli-row"><code>nxagent install &lt;agent-id&gt;</code><span>Install agent into OpenClaw</span></div>
            <div className="cli-row"><code>nxagent list</code><span>List installed marketplace agents</span></div>
            <div className="cli-row"><code>nxagent uninstall &lt;agent-id&gt;</code><span>Remove an installed agent</span></div>
        </div>
        <h2>Custom Marketplace URL</h2>
        <p>If your team hosts their own marketplace:</p>
        <CopyBlock code={`export NXAGENT_URL="https://your-domain.com"`}>
            {`# Set for the session\nexport NXAGENT_URL="https://your-domain.com"\nnxagent search "research"\n\n# Or prefix a single command\nNXAGENT_URL="https://your-domain.com" nxagent install agent-name`}
        </CopyBlock>
        <h2>Aliases</h2>
        <table>
            <tbody>
                <tr><th>Alias</th><th>Command</th></tr>
                <tr><td><code>nxagent s</code></td><td>search</td></tr>
                <tr><td><code>nxagent i</code></td><td>info</td></tr>
                <tr><td><code>nxagent add</code></td><td>install</td></tr>
                <tr><td><code>nxagent ls</code></td><td>list</td></tr>
                <tr><td><code>nxagent rm</code></td><td>uninstall</td></tr>
            </tbody>
        </table>
    </>;
}

function DocsSecurity() {
    return <>
        <h1>Security & Privacy</h1>
        <p>We built this with privacy-first principles.</p>
        <h2>API Key Lifecycle</h2>
        <table>
            <tbody>
                <tr><th>Stage</th><th>Where</th><th>What Happens</th></tr>
                <tr><td>At Rest</td><td>Your machine</td><td>Stored in <code>~/.openclaw/.env</code></td></tr>
                <tr><td>In Transit</td><td>Network</td><td>HTTPS encrypted in <code>X-User-LLM-Key</code> header</td></tr>
                <tr><td>In Use</td><td>Our server</td><td>Used in-memory to call OpenAI</td></tr>
                <tr><td>After Use</td><td>Our server</td><td>Variable garbage collected. Never stored.</td></tr>
            </tbody>
        </table>
        <h2>What We Don't Do</h2>
        <ul>
            <li>❌ Store your API keys</li>
            <li>❌ Log your prompts</li>
            <li>❌ Cache your results</li>
            <li>❌ Build user profiles</li>
            <li>❌ Track usage per user</li>
        </ul>
        <h2>What You Control</h2>
        <ul>
            <li>✅ Your API keys (local .env)</li>
            <li>✅ Which agents you install</li>
            <li>✅ When to use them</li>
            <li>✅ Uninstall at any time</li>
        </ul>
    </>;
}

function DocsApi() {
    return <>
        <h1>API Reference</h1>
        <p>Base URL: <code>{API_BASE}</code></p>
        <h2>Marketplace Endpoints</h2>
        <table>
            <tbody>
                <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
                <tr><td>GET</td><td><code>/marketplace/agents</code></td><td>List all agents</td></tr>
                <tr><td>GET</td><td><code>/marketplace/agents?search=q</code></td><td>Search agents</td></tr>
                <tr><td>GET</td><td><code>/marketplace/agents/:id</code></td><td>Agent details</td></tr>
                <tr><td>GET</td><td><code>/marketplace/agents/:id/install</code></td><td>Get skill package</td></tr>
            </tbody>
        </table>
        <h2>Execution</h2>
        <table>
            <tbody>
                <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
                <tr><td>POST</td><td><code>/v1/agents/:id/execute</code></td><td>Run an agent</td></tr>
            </tbody>
        </table>
        <p><strong>Required Header:</strong> <code>X-User-LLM-Key: sk-...</code></p>
        <p><strong>Body:</strong></p>
        <pre><code>{`{ "prompt": "your input", "language": "optional", "options": {} }`}</code></pre>
        <p><strong>Response:</strong> Server-Sent Events (SSE)</p>
        <pre><code>{`event: status\ndata: {"content": "Working..."}\n\nevent: result\ndata: {"content": "## Final Report\\n..."}`}</code></pre>
        <h2>Error Codes</h2>
        <table>
            <tbody>
                <tr><th>Code</th><th>Meaning</th></tr>
                <tr><td>401</td><td>Invalid or missing API key</td></tr>
                <tr><td>404</td><td>Agent not found</td></tr>
                <tr><td>429</td><td>Rate limited</td></tr>
                <tr><td>501</td><td>Agent has no executor</td></tr>
                <tr><td>502</td><td>LLM provider error</td></tr>
            </tbody>
        </table>
        <h2>Interactive Docs</h2>
        <p>Swagger UI: <a href={`${API_BASE}/docs`} target="_blank" rel="noreferrer">{API_BASE}/docs</a></p>
    </>;
}

function DocsSelfHost() {
    return <>
        <h1>Self-Hosting</h1>
        <p>Deploy your own marketplace on your infrastructure.</p>
        <h2>Docker (Recommended)</h2>
        <CopyBlock code={`git clone https://github.com/nirav-kakadiya/marketplace_backend.git\ncd marketplace_backend\ncp .env.example .env\ndocker compose up -d`} />
        <h2>Manual</h2>
        <CopyBlock code={`git clone https://github.com/nirav-kakadiya/marketplace_backend.git\ncd marketplace_backend\npip install -r requirements.txt\ncp .env.example .env\nuvicorn app.main:app --host 0.0.0.0 --port 8000`} />
        <h2>Configuration</h2>
        <p>All settings via environment variables (or <code>.env</code> file):</p>
        <table>
            <tbody>
                <tr><th>Variable</th><th>Default</th><th>Description</th></tr>
                <tr><td><code>PORT</code></td><td>8000</td><td>Server port</td></tr>
                <tr><td><code>MARKETPLACE_URL</code></td><td>https://agents.nextbase.solutions</td><td>Public URL (injected into CLI)</td></tr>
                <tr><td><code>CORS_ORIGINS</code></td><td>*</td><td>Allowed origins</td></tr>
                <tr><td><code>LOG_LEVEL</code></td><td>INFO</td><td>Logging level</td></tr>
                <tr><td><code>DEFAULT_MODEL</code></td><td>gpt-4o-mini</td><td>Default LLM model</td></tr>
            </tbody>
        </table>
        <h2>Deploy To</h2>
        <ul>
            <li><strong>Cloud Run:</strong> <code>gcloud run deploy marketplace --source . --port 8000</code></li>
            <li><strong>Railway:</strong> Connect repo, set start command to <code>uvicorn app.main:app</code></li>
            <li><strong>Any VPS:</strong> Docker compose or manual install</li>
        </ul>
    </>;
}

function DocsContribute() {
    return <>
        <h1>Contributing</h1>
        <p>Add your own agent in 3 files. No framework to learn.</p>
        <h2>Step 1: Copy the template</h2>
        <CopyBlock code="cp -r app/agents/_template app/agents/my-agent" />
        <h2>Step 2: Edit 3 files</h2>
        <table>
            <tbody>
                <tr><th>File</th><th>Purpose</th></tr>
                <tr><td><code>manifest.json</code></td><td>Metadata — name, description, tags, triggers</td></tr>
                <tr><td><code>SKILL.md</code></td><td>User-facing instructions (installed on their machine)</td></tr>
                <tr><td><code>executor.py</code></td><td>Your agent logic (stays on the server)</td></tr>
            </tbody>
        </table>
        <h2>Executor Signature</h2>
        <pre><code>{`async def execute(prompt: str, api_key: str, language: str = None, options: dict = None):
    yield sse_event("status", "Working...")
    result = await call_llm(client, api_key, system="...", user=prompt)
    yield sse_event("result", result)`}</code></pre>
        <h2>Rules</h2>
        <ul>
            <li>✅ Use <code>async def execute()</code> with exact signature</li>
            <li>✅ Yield SSE events with <code>sse_event()</code></li>
            <li>✅ Use <code>call_llm()</code> for LLM calls</li>
            <li>❌ Never store or log <code>api_key</code></li>
            <li>❌ Never hardcode secrets</li>
        </ul>
        <h2>Test Locally</h2>
        <CopyBlock code="uvicorn app.main:app --reload">
            {`uvicorn app.main:app --reload\n# Visit http://localhost:8000/marketplace/agents`}
        </CopyBlock>
        <h2>Submit a PR</h2>
        <CopyBlock code={`git checkout -b add-agent/my-agent\ngit add app/agents/my-agent/\ngit commit -m "feat: add my-agent"\ngit push origin add-agent/my-agent`} />
        <p><a href="https://github.com/nirav-kakadiya/marketplace_backend/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">Full contributor guide on GitHub →</a></p>
    </>;
}

const sections = {
    '': DocsOverview,
    'quickstart': DocsQuickstart,
    'cli': DocsCli,
    'security': DocsSecurity,
    'api': DocsApi,
    'self-host': DocsSelfHost,
    'contribute': DocsContribute,
};

export default function Docs() {
    const { section = '' } = useParams();
    const Content = sections[section] || DocsOverview;

    return (
        <div className="page-enter">
            <div className="container">
                <div className="docs-layout">
                    <div className="docs-nav">
                        <div className="docs-nav-group">
                            <h4>Getting Started</h4>
                            <Link to="/docs" className={section === '' ? 'active' : ''}>Overview</Link>
                            <Link to="/docs/quickstart" className={section === 'quickstart' ? 'active' : ''}>Quick Start</Link>
                            <Link to="/docs/cli" className={section === 'cli' ? 'active' : ''}>CLI Reference</Link>
                        </div>
                        <div className="docs-nav-group">
                            <h4>Guides</h4>
                            <Link to="/docs/security" className={section === 'security' ? 'active' : ''}>Security</Link>
                            <Link to="/docs/api" className={section === 'api' ? 'active' : ''}>API Reference</Link>
                            <Link to="/docs/self-host" className={section === 'self-host' ? 'active' : ''}>Self-Hosting</Link>
                        </div>
                        <div className="docs-nav-group">
                            <h4>Community</h4>
                            <Link to="/docs/contribute" className={section === 'contribute' ? 'active' : ''}>Contributing</Link>
                        </div>
                    </div>
                    <div className="docs-content">
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    );
}
