'use client';

import { useEffect, useRef } from 'react';

const DURATION = 1800; // ms

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function fmt(value: number, prefix: string, suffix: string): string {
  return `${prefix}${Math.round(value)}${suffix}`;
}

const STATS = [
  {
    label: 'Blue Ocean Confirmed',
    target: 0,
    prefix: '',
    suffix: '',
    initial: '0',
    caption: 'local competitors with White\u00a0Jade (백옥주사) positioning',
    srFinal: '0 local competitors',
  },
  {
    label: 'Price Sweet Spot',
    target: 225,
    prefix: '$',
    suffix: '',
    initial: '$0',
    caption: 'validated vs. 5 local providers + NJ benchmark',
    srFinal: '$225',
  },
  {
    label: 'Pre-Sale Target',
    target: 15,
    prefix: '$',
    suffix: 'K',
    initial: '$0K',
    caption: 'by Day\u00a028 · 33 packages at $450 each',
    srFinal: '$15K',
  },
] as const;

export default function StatsHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);
  const srRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function runCounter(i: number) {
      const stat = STATS[i];
      const numEl = numRefs.current[i];
      const srEl = srRefs.current[i];
      if (!numEl || !srEl) return;

      const { target, prefix, suffix, srFinal } = stat;
      const finalDisplay = fmt(target, prefix, suffix);

      // Zero target or reduced-motion: show final immediately
      if (target === 0 || reducedMotion) {
        numEl.textContent = finalDisplay;
        srEl.textContent = srFinal;
        return;
      }

      // rAF counter
      let t0: number | null = null;
      function tick(now: number) {
        if (t0 === null) t0 = now;
        const progress = Math.min((now - t0) / DURATION, 1);
        if (numEl) numEl.textContent = fmt(easeOutCubic(progress) * target, prefix, suffix);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          if (numEl) numEl.textContent = finalDisplay; // snap exact
          if (srEl) srEl.textContent = srFinal;        // single SR announcement
        }
      }
      requestAnimationFrame(tick);
    }

    // Fire once when 20% of section is visible
    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        STATS.forEach((_, i) => runCounter(i));
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sh-heading"
      style={{
        background: 'linear-gradient(150deg, #06060e 0%, #0b0b18 60%, #06060f 100%)',
        padding: 'clamp(3.5rem, 8vw, 6.5rem) clamp(1rem, 5vw, 2rem)',
      }}
    >
      {/* Visually hidden landmark heading */}
      <h2 id="sh-heading" className="sr-only">Market Intelligence Highlights</h2>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, i) => (
            <article
              key={stat.label}
              className="relative text-center overflow-hidden rounded-[14px]"
              style={{
                padding: 'clamp(1.75rem, 4vw, 2.5rem) clamp(1.25rem, 3vw, 2rem)',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: '1px solid rgba(62,198,255,0.38)',
              }}
            >
              {/* Radial corner glow — decorative */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 35% 0%, rgba(62,198,255,0.07) 0%, transparent 65%)',
                }}
              />

              {/* Label */}
              <p
                className="relative m-0 mb-4 font-bold uppercase"
                style={{
                  fontSize: 'clamp(0.575rem, 1.3vw, 0.65rem)',
                  color: '#7e8fa3',
                  letterSpacing: '0.18em',
                }}
              >
                {stat.label}
              </p>

              {/* Animated number */}
              <div className="relative mb-4 leading-none">
                <span
                  ref={el => { numRefs.current[i] = el; }}
                  aria-hidden="true"
                  className="block font-extrabold"
                  style={{
                    fontSize: 'clamp(3.25rem, 6.5vw, 5.25rem)',
                    color: '#3ec6ff',
                    letterSpacing: '-0.03em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {stat.initial}
                </span>
                {/* Visually hidden — announces final value once to screen readers */}
                <span
                  ref={el => { srRefs.current[i] = el; }}
                  aria-live="polite"
                  aria-atomic="true"
                  className="sr-only"
                />
              </div>

              {/* Caption */}
              <p
                className="relative m-0 leading-relaxed"
                style={{
                  fontSize: 'clamp(0.7rem, 1.7vw, 0.78rem)',
                  color: '#56606f',
                  letterSpacing: '0.01em',
                }}
              >
                {stat.caption}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
