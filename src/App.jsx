import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Agents from './pages/Agents';
import AgentDetail from './pages/AgentDetail';
import Docs from './pages/Docs';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

export default function App() {
    return (
        <BrowserRouter>
            <ToastProvider>
                <ScrollToTop />
                <Navbar />
                <div id="app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/agents" element={<Agents />} />
                        <Route path="/agents/:id" element={<AgentDetail />} />
                        <Route path="/docs" element={<Docs />} />
                        <Route path="/docs/:section" element={<Docs />} />
                        <Route path="*" element={
                            <div className="empty" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
                                <div className="empty-icon">404</div>
                                <h3>Page Not Found</h3>
                                <p>The page you're looking for doesn't exist.</p>
                                <div style={{ marginTop: '1rem' }}>
                                    <a href="/" className="btn btn-secondary">← Back to Home</a>
                                </div>
                            </div>
                        } />
                    </Routes>
                </div>
                <Footer />
            </ToastProvider>
        </BrowserRouter>
    );
}
