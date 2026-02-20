import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

function truncate(str, max = 40) {
    if (!str) return '';
    const single = str.replace(/\s+/g, ' ').trim();
    return single.length > max ? single.slice(0, max) + '…' : single;
}

export function ToastProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const [copiedText, setCopiedText] = useState('');
    const timerRef = useRef(null);

    const copy = useCallback((text) => {
        // Try modern Clipboard API first, fallback to execCommand for HTTP
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
        setCopiedText(truncate(text));
        setVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setVisible(false), 2000);
    }, []);

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try { document.execCommand('copy'); } catch (e) { /* silent */ }
        document.body.removeChild(textarea);
    }

    return (
        <ToastContext.Provider value={copy}>
            {children}
            <div className={`toast${visible ? ' show' : ''}`} id="toast">
                ✓ Copied{copiedText ? <span className="toast-text">"{copiedText}"</span> : ' to clipboard'}
            </div>
        </ToastContext.Provider>
    );
}
