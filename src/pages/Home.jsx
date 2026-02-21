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
                <div className="hero-glow-bg"></div>

                <div className="hero-container">
                    <div className="hero-top">
                        <div className="hero-label-wrapper">
                            <span className="hero-label-pill">Marketplace</span>
                            <span className="hero-label-pill">AI Agents for OpenClaw.</span>
                        </div>

                        <div className="hero-heading">
                            <h1 className="heading-white">One command to install</h1>
                            <h1 className="heading-grey">Open Source Agent Marketplace</h1>
                        </div>

                        <p className="hero-desc">
                            With RembAI, explore a world of AI tools<br />
                            built for speed and simplicity.
                        </p>

                        <div className="hero-btns">
                            <Link to="/agents" className="btn btn-hero-primary">Browse Agents <span className="arrow">↗</span></Link>
                            <Link to="/docs" className="btn btn-hero-ghost">Read Docs</Link>
                        </div>
                    </div>

                    <div className="hero-illustration">
                        <svg className="hero-connectors" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
                            {/* Left to center */}
                            <path d="M 150 50 L 220 50 C 240 50 250 60 250 80 L 250 130 C 250 150 260 160 280 160 L 320 160" stroke="url(#grad-pink)" strokeWidth="2" fill="none" />
                            <path d="M 110 160 L 320 160" stroke="url(#grad-red)" strokeWidth="2" fill="none" />
                            <path d="M 150 270 L 220 270 C 240 270 250 260 250 240 L 250 190 C 250 170 260 160 280 160 L 320 160" stroke="url(#grad-green)" strokeWidth="2" fill="none" />

                            {/* Right to center */}
                            <path d="M 850 50 L 780 50 C 760 50 750 60 750 80 L 750 130 C 750 150 740 160 720 160 L 680 160" stroke="url(#grad-cyan)" strokeWidth="2" fill="none" />
                            <path d="M 890 160 L 680 160" stroke="url(#grad-yellow)" strokeWidth="2" fill="none" />
                            <path d="M 850 270 L 780 270 C 760 270 750 260 750 240 L 750 190 C 750 170 740 160 720 160 L 680 160" stroke="url(#grad-purple)" strokeWidth="2" fill="none" />

                            <defs>
                                <linearGradient id="grad-pink" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="rgba(236,72,153,0.1)" /></linearGradient>
                                <linearGradient id="grad-red" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="rgba(239,68,68,0.1)" /></linearGradient>
                                <linearGradient id="grad-green" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="rgba(34,197,94,0.1)" /></linearGradient>
                                <linearGradient id="grad-cyan" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="rgba(6,182,212,0.1)" /></linearGradient>
                                <linearGradient id="grad-yellow" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#eab308" /><stop offset="100%" stopColor="rgba(234,179,8,0.1)" /></linearGradient>
                                <linearGradient id="grad-purple" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="rgba(139,92,246,0.1)" /></linearGradient>
                            </defs>
                        </svg>

                        <div className="hero-node node-tl node-pink">🕸️</div>
                        <div className="hero-node node-ml node-red">🚨</div>
                        <div className="hero-node node-bl node-green">📗</div>

                        <div className="hero-node node-tr node-cyan">📅</div>
                        <div className="hero-node node-mr node-yellow">🔍</div>
                        <div className="hero-node node-br node-purple">✨</div>

                        <div className="hero-install-box">
                            <div className="install-box-header">
                                <span className="install-title">Installation Command</span>
                                <span className="install-copy" onClick={() => copy(`curl -sL ${API_BASE}/cli/install | bash`)}>Click To Copy ❐</span>
                            </div>
                            <div className="install-box-body">
                                <span className="cmd-prompt">$</span> curl -sL <span className="cmd-url">{API_BASE}</span>/cli/install | bash
                            </div>
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
                <section className="section cta-section">
                    <div className="container">
                        <p className="section-label">Get Started</p>
                        <h2 className="section-title">Ready to try?</h2>
                        <p className="section-desc">Install the CLI and your first agent in under a minute.</p>
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
