import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text = '',
  by = 'words',
  delay = 40,
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll('.split-unit');
    gsap.set(spans, { autoAlpha: 0, y: 12 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(spans, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: delay / 1000,
        });
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(spans);
    };
  }, [text, delay]);

  const units = by === 'chars' ? text.split('') : text.split(' ');

  return (
    <span ref={ref} className={className} style={style}>
      {units.map((u, i) => (
        <span key={i} className="split-unit" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {u}{by === 'words' && i < units.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
