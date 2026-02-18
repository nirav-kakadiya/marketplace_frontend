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
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
                <Footer />
            </ToastProvider>
        </BrowserRouter>
    );
}
