import { useState } from 'react';
import { useToast } from './Toast';

export default function CopyBlock({ code, children }) {
    const copy = useToast();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        copy(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="copy-wrap">
            <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre><code>{children || code}</code></pre>
        </div>
    );
}
