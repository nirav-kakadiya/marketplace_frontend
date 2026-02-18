import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    const copy = useCallback((text) => {
        navigator.clipboard.writeText(text);
        setVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setVisible(false), 2000);
    }, []);

    return (
        <ToastContext.Provider value={copy}>
            {children}
            <div className={`toast${visible ? ' show' : ''}`} id="toast">✓ Copied to clipboard</div>
        </ToastContext.Provider>
    );
}
