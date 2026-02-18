import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/agents', label: 'Agents' },
    { to: '/docs', label: 'Docs' },
    { to: '/docs/cli', label: 'CLI' },
    { to: '/docs/contribute', label: 'Contribute' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)', height: 60,
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/" style={{ fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
              <span style={{ color: 'var(--accent)' }}>⚡</span> Nextbase Marketplace
            </Link>
            <div className="nav-links" style={{ display: 'flex', gap: '0.25rem' }}>
              {links.map(l => (
                <Link key={l.to} to={l.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: pathname.startsWith(l.to) ? 'var(--text)' : 'var(--text-muted)',
                    fontSize: '0.875rem', fontWeight: 500, padding: '0.4rem 0.75rem',
                    borderRadius: 6, transition: 'all 0.2s',
                    background: pathname.startsWith(l.to) ? 'var(--bg-card)' : 'transparent'
                  }}
                >{l.label}</Link>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href="https://github.com/nirav-kakadiya/marketplace_backend" target="_blank" rel="noopener"
              style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
              ★ GitHub
            </a>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: '1px solid var(--border)', color: 'var(--text)',
                width: 36, height: 36, borderRadius: 6, cursor: 'pointer', fontSize: '1.1rem'
              }}>☰</button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
          background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)',
          padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem'
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              style={{
                color: pathname.startsWith(l.to) ? 'var(--text)' : 'var(--text-muted)',
                fontSize: '0.9rem', fontWeight: 500, padding: '0.6rem 0.75rem', borderRadius: 6,
                background: pathname.startsWith(l.to) ? 'var(--bg-card)' : 'transparent'
              }}
            >{l.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
