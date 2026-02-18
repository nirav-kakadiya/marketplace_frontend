import { useState } from 'react';

export default function CopyBlock({ text, language = '' }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <pre><code>{text}</code></pre>
      <button onClick={copy} style={{
        position: 'absolute', top: '0.75rem', right: '0.75rem',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        color: copied ? 'var(--green)' : 'var(--text-muted)',
        padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.7rem',
        cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s'
      }}>{copied ? '✓ Copied' : 'Copy'}</button>
    </div>
  );
}
