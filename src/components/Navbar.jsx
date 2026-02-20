import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const path = location.pathname;
    const mobileNavRef = useRef(null);
    const menuBtnRef = useRef(null);

    const isActive = (p) => {
        if (p === '/agents') return path === '/agents' || path.startsWith('/agents/');
        if (p === '/docs') return path.startsWith('/docs');
        if (p === '/docs/cli') return path === '/docs/cli';
        if (p === '/docs/contribute') return path === '/docs/contribute';
        return false;
    };

    const closeMenu = () => setMobileOpen(false);

    // Fix 12: Close mobile nav on outside click and Escape key
    useEffect(() => {
        if (!mobileOpen) return;

        const handleClickOutside = (e) => {
            if (
                mobileNavRef.current && !mobileNavRef.current.contains(e.target) &&
                menuBtnRef.current && !menuBtnRef.current.contains(e.target)
            ) {
                setMobileOpen(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [mobileOpen]);

    return (
        <>
            <nav>
                <div className="container">
                    <div className="nav-left">
                        <Link to="/" className="nav-logo" onClick={closeMenu}>
                            <span>⚡</span> Nextbase Marketplace
                        </Link>
                        <div className="nav-menu">
                            <Link to="/agents" className={isActive('/agents') ? 'active' : ''}>Agents</Link>
                            <Link to="/docs" className={isActive('/docs') && !isActive('/docs/cli') && !isActive('/docs/contribute') ? 'active' : ''}>Docs</Link>
                            <Link to="/docs/cli" className={isActive('/docs/cli') ? 'active' : ''}>CLI</Link>
                            <Link to="/docs/contribute" className={isActive('/docs/contribute') ? 'active' : ''}>Contribute</Link>
                        </div>
                    </div>
                    <div className="nav-right">
                        <a href="https://github.com/nirav-kakadiya/marketplace_backend" target="_blank" rel="noreferrer" className="nav-github">
                            ★ GitHub
                        </a>
                        <button
                            ref={menuBtnRef}
                            className="mobile-menu-btn"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Menu"
                        >☰</button>
                    </div>
                </div>
            </nav>
            {mobileOpen && <div className="mobile-nav-overlay" onClick={closeMenu}></div>}
            <div ref={mobileNavRef} className={`mobile-nav${mobileOpen ? ' open' : ''}`} id="mobileNav">
                <Link to="/agents" className={isActive('/agents') ? 'active' : ''} onClick={closeMenu}>Agents</Link>
                <Link to="/docs" className={isActive('/docs') ? 'active' : ''} onClick={closeMenu}>Docs</Link>
                <Link to="/docs/cli" className={isActive('/docs/cli') ? 'active' : ''} onClick={closeMenu}>CLI</Link>
                <Link to="/docs/contribute" className={isActive('/docs/contribute') ? 'active' : ''} onClick={closeMenu}>Contribute</Link>
                <a href="https://github.com/nirav-kakadiya/marketplace_backend" target="_blank" rel="noreferrer">★ GitHub</a>
            </div>
        </>
    );
}
