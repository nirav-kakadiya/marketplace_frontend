import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAgents, API_BASE } from '../api';
import { useToast } from '../components/Toast';
import AgentCard from '../components/AgentCard';
import FadeContent from '../components/reactbits/FadeContent';
import BlurText from '../components/reactbits/BlurText';
import GradientText from '../components/reactbits/GradientText';
import SplitText from '../components/reactbits/SplitText';

export default function Home() {
    const [agents, setAgents] = useState([]);
    const copy = useToast();

    useEffect(() => {
        fetchAgents().then(setAgents);
    }, []);

    const featured = agents.slice(0, 3);

    return (
        <div className="page-enter">
            <section className="hero">
                <div className="container">
                    <p className="section-label">Open Source Agent Marketplace</p>
                    <h1>
                        <BlurText
                            text="AI Agents for OpenClaw."
                            delay={80}
                            animateBy="words"
                            className=""
                        />
                        <GradientText>One command to install.</GradientText>
                    </h1>
                    <p><SplitText text="Powerful AI agents running on our servers. You provide your API key. No code downloaded. No secrets shared. Just results." by="words" delay={30} /></p>
                    <div className="hero-actions">
                        <Link to="/agents" className="btn btn-primary">Browse Agents →</Link>
                        <Link to="/docs" className="btn btn-secondary">Read Docs</Link>
                    </div>
                    <div className="hero-install">
                        <div className="install-cmd" style={{ maxWidth: '560px', margin: '0 auto' }} onClick={() => copy(`curl -sL ${API_BASE}/cli/install | bash`)}>
                            <span>$ curl -sL {API_BASE}/cli/install | bash</span>
                            <span className="hint" style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Click to copy</span>
                        </div>
                    </div>
                </div>
            </section>

            <FadeContent>
                <section className="section">
                    <div className="container">
                        <p className="section-label">How It Works</p>
                        <h2 className="section-title">Three steps. That's it.</h2>
                        <p className="section-desc">No complicated setup. No Docker. No configuration files.</p>
                        <div className="steps-row">
                            <div className="step">
                                <div className="step-num">1</div>
                                <h3>Install the CLI</h3>
                                <p>One command installs <code>nxagent</code> on your machine.</p>
                            </div>
                            <div className="step">
                                <div className="step-num">2</div>
                                <h3>Install an Agent</h3>
                                <p>Run <code>nxagent install agent-name</code>. It handles everything.</p>
                            </div>
                            <div className="step">
                                <div className="step-num">3</div>
                                <h3>Just Ask</h3>
                                <p>Talk to OpenClaw naturally. The agent runs behind the scenes.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeContent>

            <FadeContent>
                <section className="section section-alt">
                    <div className="container">
                        <p className="section-label">Available Agents</p>
                        <h2 className="section-title">Ready to install</h2>
                        <div className="agents-grid">
                            {featured.map(a => <AgentCard key={a.id} agent={a} />)}
                        </div>
                        {agents.length > 3 && (
                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                <Link to="/agents" className="btn btn-secondary">View All Agents →</Link>
                            </div>
                        )}
                    </div>
                </section>
            </FadeContent>

            <FadeContent>
                <section className="section">
                    <div className="container">
                        <p className="section-label">Architecture</p>
                        <h2 className="section-title">You own the keys. We own the logic.</h2>
                        <p className="section-desc">Your data stays on your machine. Our code stays on our server.</p>
                        <div className="arch">
                            <div className="arch-box">
                                <h4>🖥 Your Machine</h4>
                                <ul>
                                    <li>OpenClaw runtime</li>
                                    <li>Skill files (SKILL.md)</li>
                                    <li>Your API keys (.env)</li>
                                    <li>Results displayed locally</li>
                                </ul>
                            </div>
                            <div className="arch-middle">
                                <div className="arch-arrow"></div>
                                <div className="arch-arrow-label">HTTPS + key header</div>
                                <div className="arch-arrow" style={{ transform: 'scaleX(-1)' }}></div>
                                <div className="arch-arrow-label">SSE response</div>
                            </div>
                            <div className="arch-box">
                                <h4>☁️ Marketplace Server</h4>
                                <ul>
                                    <li>Agent logic (private)</li>
                                    <li>Search & analysis</li>
                                    <li>Key used in-memory only</li>
                                    <li>Discarded after response</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeContent>

            <FadeContent>
                <section className="section section-alt">
                    <div className="container">
                        <p className="section-label">Security</p>
                        <h2 className="section-title">Privacy-first by design</h2>
                        <div className="security-grid">
                            <div className="sec-card"><div className="icon">🔑</div><h3>Keys Stay Local</h3><p>API keys live in your <code>.env</code>. Sent only via HTTPS when you use an agent.</p></div>
                            <div className="sec-card"><div className="icon">🧠</div><h3>In-Memory Only</h3><p>Keys are used to call the LLM, then immediately discarded. Never stored.</p></div>
                            <div className="sec-card"><div className="icon">🔒</div><h3>Code Protected</h3><p>Agent source code stays on the server. Users only get lightweight instructions.</p></div>
                            <div className="sec-card"><div className="icon">🚫</div><h3>No Tracking</h3><p>No prompt logging. No user profiles. Each request is stateless.</p></div>
                        </div>
                    </div>
                </section>
            </FadeContent>

            <FadeContent>
                <section className="section" style={{ textAlign: 'center' }}>
                    <div className="container">
                        <p className="section-label">Get Started</p>
                        <h2 className="section-title">Ready to try?</h2>
                        <p className="section-desc" style={{ margin: '0 auto 2rem' }}>Install the CLI and your first agent in under a minute.</p>
                        <div className="hero-actions">
                            <Link to="/docs" className="btn btn-primary">Read the Docs →</Link>
                            <Link to="/agents" className="btn btn-secondary">Browse Agents</Link>
                        </div>
                    </div>
                </section>
            </FadeContent>
        </div>
    );
}
