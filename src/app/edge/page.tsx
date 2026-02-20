"use client";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { animate, animateMini, scroll, inView, stagger } from "motion";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const b2bTargets = [
  { name: "Motionlife Chiropractic & Acupuncture", doctor: "Dr. Sangmin Lee", phone: "(410) 709-1015", korean: true },
  { name: "Kim Chiropractic Clinic & Rehab", doctor: "Dr. Sung C. Kim", phone: "(410) 715-3500", korean: true },
  { name: "Jeong Wellness Chiropractic", doctor: "Dr. Wookeun Jeong", phone: "(410) 461-5695", korean: true },
  { name: "Mocurry Chiropractic", doctor: "Dr. Dong Guk Kim", phone: "(410) 480-0083", korean: true },
  { name: "Dr. Park Acupuncture", doctor: "Dr. Seok Park", phone: "(410) 997-0390", korean: true },
  { name: "Roh Chiropractic Center", doctor: "Dr. Sun Yung Roh", phone: "See website", korean: true },
  { name: "Flourish Counseling & Wellness", doctor: "—", phone: "(301) 618-0829", korean: false },
  { name: "Re-Balance Health & Wellness", doctor: "—", phone: "See website", korean: false },
];

const competitors = [
  { name: "VitaFusion Doctors", location: "Baltimore", price: "$250", whiteJade: false, korean: false, note: "Medical leader" },
  { name: "Jean Walter Infusion", location: "Columbia, MD", price: "$175–275", whiteJade: false, korean: false, note: "Low consumer-friendliness" },
  { name: "THRIVE Solutions", location: "Mobile (Baltimore)", price: "$190", whiteJade: "Add-on $20", korean: false, note: "No sterile environment" },
  { name: "Premier Vitality", location: "Columbia, MD", price: "N/A", whiteJade: false, korean: false, note: "Injections only, no drip" },
  { name: "KARA Med Spa ★", location: "Fort Lee, NJ", price: "$250", whiteJade: true, korean: true, note: "National benchmark" },
];

const pillars = [
  {
    id: "01",
    role: "The Cultural Hook",
    name: "White Jade",
    korean: "백옥주사",
    body: "Glutathione IV for skin brightening and cellular detox. The Korean \u201cCinderella Drip\u201d \u2014 familiar and trusted by the target demographic.",
    badge: "Zero local competitors use this terminology",
    price: "$225 – $250",
    sub: "Per Session",
    meta: "High margin · High virality",
    accent: "from-[#EEF5FF]",
  },
  {
    id: "02",
    role: "The Subscription Engine",
    name: "Burnout Reset",
    korean: "마늘주사",
    body: "Garlic Drip for energy and immune support. A weekly wellness ritual for Korean professionals — converts single visits into recurring revenue.",
    badge: "Membership at $680/mo → $8,160+ LTV annually",
    price: "$195",
    sub: "Or $680/mo",
    meta: "LTV driver · Repeat visits",
    accent: "from-[#EEF5FF]",
  },
  {
    id: "03",
    role: "The Funnel Entry",
    name: "Hangover Recovery",
    korean: "해장",
    body: "Essential hydration and rapid recovery. Broad weekend appeal: nurses, first responders, BWI travelers, executives.",
    badge: "Lowest barrier entry — broadest audience",
    price: "$165 – $175",
    sub: "Per Session",
    meta: "High volume · Referral engine",
    accent: "from-[#F5F5F5]",
  },
];

const platformStages = [
  { step: "1", title: "Channel Policy", detail: "Primary: eRX + Prescriber Portal. Legacy phone/fax/paper become exceptions only.", tag: "Intake standardization" },
  { step: "2", title: "AI Intake Bridge", detail: "For paperwork offices, OCR pulls handwriting — technicians verify the final 20%.", tag: "Less burden, less errors" },
  { step: "3", title: "Formula-ID Ordering", detail: "Provider selects exact formulary; formula ID drops directly to production labeling.", tag: "Translation risk reduced" },
  { step: "4", title: "Pioneer Execution", detail: "Orders flow into Pioneer queue for controlled verification and fulfillment.", tag: "Operational source of truth" },
  { step: "5", title: "Payment + Close Loop", detail: "Capture payment early. Reconcile Pioneer + GHL for true conversion reporting.", tag: "Cash flow + measurable wins" },
];

const platformCompoundingPath = [
  "Decision point: sterile vs non-sterile",
  "Sterile (24–72h): GIPS, Trimix, injectables",
  "Non-sterile (24–72h): creams, troches, capsules",
  "Includes payment check, prep, label, pull, accuracy verification",
];

const platformFallbackOps = [
  "Use fax/paper only as migration bridge for low-tech offices",
  "OCR extraction → move office to portal onboarding",
  "SDR identifies bottleneck and key assistant contact",
  "Target state: every account on standardized channels",
];

const platformMetrics = [
  "Portal signup → first prescription sent (true close)",
  "Pioneer order volume by provider and formula",
  "Intake channel mix: portal/eRX vs legacy",
  "Error rate and cycle time by channel",
];

const platformTimeframes = [
  "Electronic RX: 30–45 min",
  "Fax RX: 15–30 min",
  "Regular fill: 15–30 min",
  "Insurance issues: +1–2 hours",
  "Compounding: 1–3 days",
  "Out of stock: same-day order, next-day ready",
];

export default function EdgeDesign() {
  const [activeSection, setActiveSection] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const observerRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // animateMini: single unambiguous overload (ElementOrSelector, DOMKeyframesDefinition, options)
    // — no overload confusion with transform shorthands unlike animate()

    // ── 1. Scroll progress bar (scroll-linked)
    scroll(animateMini(".scroll-progress", { scaleX: [0, 1] }));

    // ── 2. Intro: headline + stats slide in on load (above fold)
    animateMini("#intro h1", { opacity: [0, 1], y: [32, 0] }, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    animateMini(".intro-stat", { opacity: [0, 1], x: [20, 0] }, { delay: stagger(0.1, { startDelay: 0.5 }), duration: 0.6, ease: [0.22, 1, 0.36, 1] });

    // ── 3. Offerings: all cards stagger up when section enters view
    inView("#offerings", () => {
      animateMini(".pillar-card", { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.12), duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    }, { amount: 0.3 });

    // ── 4. Platform Engine: staged reveal with workflow line
    inView("#platform", () => {
      animateMini(".platform-quote", { opacity: [0, 1], y: [14, 0] }, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
      animateMini(".platform-stage", { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.08, { startDelay: 0.05 }), duration: 0.55, ease: [0.22, 1, 0.36, 1] });
      animateMini(".platform-block", { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.1, { startDelay: 0.18 }), duration: 0.55, ease: [0.22, 1, 0.36, 1] });
      animateMini(".platform-kpi", { opacity: [0, 1], x: [14, 0] }, { delay: stagger(0.08, { startDelay: 0.12 }), duration: 0.5, ease: [0.22, 1, 0.36, 1] });
      animateMini(".workflow-line", { scaleX: [0, 1] }, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
    }, { amount: 0.3 });

    // ── 5. Market: competitor rows slide in from left with stagger
    inView("#market", () => {
      animateMini(".competitor-row", { opacity: [0, 1], x: [-24, 0] }, { delay: stagger(0.09), duration: 0.5, ease: [0.22, 1, 0.36, 1] });
    }, { amount: 0.3 });

    // ── 5. Market: count DOWN 5 → 0 (eliminating competitors one by one)
    inView(".stat-number", () => {
      const el = document.querySelector(".stat-number") as HTMLElement;
      if (!el) return;
      const from: number = 5;
      animate(from, 0, {
        duration: 2.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => { el.textContent = Math.round(v).toString(); },
      });
    }, { amount: 0.5 });

    // ── 6. B2B: cards scale + fade with stagger
    inView("#b2b", () => {
      animateMini(".b2b-card", { opacity: [0, 1], scale: [0.93, 1] }, { delay: stagger(0.06), duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    }, { amount: 0.3 });

    // ── Section tracker (drives header + cursor color inversion)
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { threshold: 0.5 }
    );
    Object.values(observerRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setCursorHover(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") !== null || t.closest("button") !== null || t.closest(".group") !== null);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []); // no deps — stable event listener, state setters are stable

  return (
    <div
      className={`${roboto.variable} font-sans text-[#222222] selection:bg-[#222222] selection:text-white overflow-x-hidden md:cursor-none`}
    >
      {/* Scroll progress — 3px bar, motion scroll-links scaleX 0→1 */}
      <div className="scroll-progress fixed top-0 left-0 h-[3px] bg-[#004a99] z-[300] w-full" style={{ transformOrigin: "left", transform: "scaleX(0)" }} />

      {/* Cursor: outer div tracks instantly (no transition on translate).
          Inner div morphs size+color only — zero position lag. */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`, willChange: "transform" }}
      >
        <div style={{
          position: "absolute",
          width: cursorHover ? 36 : 8,
          height: cursorHover ? 36 : 8,
          top: cursorHover ? -18 : -4,
          left: cursorHover ? -18 : -4,
          borderRadius: "50%",
          background: cursorHover ? "transparent" : (activeSection === "market" ? "#ffffff" : "#004a99"),
          border: cursorHover ? `1.5px solid ${activeSection === "market" ? "rgba(255,255,255,0.5)" : "#004a99"}` : "none",
          opacity: cursorHover ? 0.55 : 1,
          transition: "width 0.22s cubic-bezier(0.25,0.46,0.45,0.94), height 0.22s cubic-bezier(0.25,0.46,0.45,0.94), top 0.22s cubic-bezier(0.25,0.46,0.45,0.94), left 0.22s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.15s, background 0.3s",
        }} />
      </div>

      {/* ─── FIXED HEADER ──────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 w-full z-[200] backdrop-blur-md transition-all duration-500 border-b ${activeSection === 'market' ? 'bg-[#0D0D0D]/95 border-[#2A2A2A]' : 'bg-white/95 border-[#E0E0E0]'}`}>
        <div className="flex justify-between items-center px-4 md:px-10 h-14 md:h-16 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeSection === 'market' ? 'bg-white' : 'bg-[#004a99]'} flex-shrink-0`} />
            <span className={`text-sm font-bold tracking-tight uppercase transition-colors duration-500 ${activeSection === 'market' ? 'text-white' : 'text-[#222222]'}`}>Soleil Infusion</span>
            <span className="hidden md:block text-xs text-[#999999] border-l border-[#E0E0E0] pl-3 uppercase tracking-widest">
              Launch Report 2026
            </span>
          </div>
          <nav className="flex items-center gap-3 md:gap-6 text-[10px] md:text-[11px] font-medium uppercase tracking-widest">
            <a href="#offerings" className={`hidden md:block transition-colors duration-300 ${activeSection === 'market' ? 'text-[#AAAAAA] hover:text-white' : 'text-[#666666] hover:text-[#222222]'}`}>Offerings</a>
            <a href="#platform"  className={`hidden md:block transition-colors duration-300 ${activeSection === 'market' ? 'text-[#AAAAAA] hover:text-white' : 'text-[#666666] hover:text-[#222222]'}`}>System</a>
            <a href="#market"    className={`hidden md:block transition-colors duration-300 ${activeSection === 'market' ? 'text-white font-bold' : 'text-[#666666] hover:text-[#222222]'}`}>Market</a>
            <a href="#economics" className={`hidden md:block transition-colors duration-300 ${activeSection === 'market' ? 'text-[#AAAAAA] hover:text-white' : 'text-[#666666] hover:text-[#222222]'}`}>Economics</a>
            <a href="#b2b"       className={`hidden md:block transition-colors duration-300 ${activeSection === 'market' ? 'text-[#AAAAAA] hover:text-white' : 'text-[#666666] hover:text-[#222222]'}`}>B2B</a>
            <Link
              href="/"
              className={`border px-3 py-1 md:px-4 md:py-1.5 transition-all ${activeSection === 'market' ? 'border-[#444444] text-white hover:bg-white hover:text-black' : 'border-[#CCCCCC] text-[#222222] hover:bg-[#222222] hover:text-white hover:border-[#222222]'}`}
            >
              Exit
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── SECTION 1: INTRO ──────────────────────────────────── z-10 */}
      <section
        id="intro"
        ref={(el) => { observerRefs.current["intro"] = el; }}
        className="sticky top-0 h-[100dvh] bg-[#F5F5F5] z-10 overflow-hidden"
        style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#D0D0D0 1px, transparent 1px), linear-gradient(90deg, #D0D0D0 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative h-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col pt-14 md:pt-16">
          <div className="flex-1 flex flex-col md:grid md:grid-cols-12 md:gap-0 md:items-center py-6 md:py-0">
            {/* Headline */}
            <div className="md:col-span-7 md:pr-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-1 h-6 md:h-8 bg-[#004a99]" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                  Confidential — Prepared by Ryan Christmas
                </span>
              </div>
              <h1 className="text-[44px] sm:text-[60px] md:text-[100px] font-bold tracking-[-0.03em] leading-[0.88] text-[#111111] mb-4 md:mb-0">
                MEDICAL<br />
                INTEGRITY<br />
                <em className="not-italic text-[#004a99]">REDEFINED.</em>
              </h1>
              <p className="mt-4 text-[#666666] text-sm md:text-base leading-relaxed max-w-sm md:hidden">
                Thuy, Feb 13: &ldquo;I need to build a system where we can scale and eventually sell that platform to other pharmacies.&rdquo; This is the 60-day answer — built from scratch.
              </p>
            </div>

            {/* Stats column — vertical on mobile, column on desktop */}
            <div className="md:col-span-5 md:border-l md:border-[#D0D0D0] md:h-full flex flex-col justify-between md:pl-10 md:py-16 mt-6 md:mt-0">
              <p className="hidden md:block text-[#666666] text-base leading-relaxed max-w-sm mb-8">
                Thuy, Feb 13: &ldquo;I need to build a system where we can scale and eventually sell that platform to other pharmacies.&rdquo; This is the 60-day answer — built from scratch, Glen Burnie, MD.
              </p>

              <div className="flex flex-col gap-3 md:gap-0 md:space-y-8">
                {[
                  { label: "Blue Ocean Confirmed", value: "0", detail: "local competitors with White Jade (백옥주사) positioning", big: true },
                  { label: "Price Sweet Spot", value: "$225", detail: "validated vs. 5 local providers + NJ benchmark", big: false },
                  { label: "Pre-Sale Target", value: "$15K", detail: "by Day 28 · 33 packages at $450 each", big: false },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="intro-stat border border-[#D0D0D0] md:border-0 md:border-t md:border-[#D0D0D0] p-3 md:p-0 md:pt-6 bg-white/60 md:bg-transparent"
                  >
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#999999] mb-1">{stat.label}</div>
                    <div className={`font-bold font-mono text-[#004a99] leading-none ${stat.big ? "text-[48px] md:text-[64px]" : "text-2xl md:text-3xl"}`}>
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-[#666666] mt-1 leading-snug">{stat.detail}</div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block text-[10px] text-[#AAAAAA] uppercase tracking-widest mt-auto pt-8">
                Scroll to explore ↓
              </div>
            </div>
          </div>
          {/* Mobile scroll hint */}
          <div className="md:hidden text-center pb-4 text-[10px] text-[#AAAAAA] uppercase tracking-widest">
            Scroll ↓
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE OFFERINGS ──────────────────────────── z-20 */}
      <section
        id="offerings"
        ref={(el) => { observerRefs.current["offerings"] = el; }}
        className="sticky top-14 md:top-16 h-[100dvh] bg-white z-20 overflow-hidden"
        style={{ boxShadow: "0 -6px 40px rgba(0,0,0,0.10)" }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col py-4 md:py-10">
          {/* Header row */}
          <div className="flex justify-between items-start border-b border-[#EEEEEE] pb-3 md:pb-5 mb-4 md:mb-8 flex-shrink-0 gap-4">
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="text-[9px] font-mono text-[#004a99] uppercase tracking-[0.2em] flex-shrink-0">01 / 05</span>
              <h2 className="text-base md:text-[32px] font-bold tracking-tight leading-snug">
                The 3 Products That Answer Thuy&apos;s Question: How Do We Scale?
              </h2>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#999999] flex-shrink-0 hidden sm:block">Built to Franchise · 15-State Vision</span>
          </div>

          {/* Transcript context */}
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#AAAAAA] mb-3 md:mb-5 flex-shrink-0">
            Thuy, Feb 13: &ldquo;For Sola Infusion, there&apos;s no website — you have to create it from scratch.&rdquo; &nbsp;·&nbsp; &ldquo;We&apos;re planning 15 states this year, then our first flagship in the Middle East.&rdquo;
          </p>

          {/* Cards — vertical stack on mobile, 3-col grid on desktop */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar md:overflow-visible">
            <div className="flex flex-col gap-4 pb-4 md:grid md:grid-cols-3 md:gap-5 md:h-full md:pb-0">
              {pillars.map((p) => (
                <div
                  key={p.id}
                  className="pillar-card group relative flex flex-col w-full border border-[#E0E0E0] hover:border-[#004a99] bg-[#FAFAFA] hover:bg-white transition-all duration-500 ease-out md:hover:-translate-y-2 md:hover:shadow-2xl overflow-hidden opacity-0"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#004a99] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                  <div className="p-5 md:p-7 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#004a99] mb-3 md:mb-5">
                        Pillar {p.id} — {p.role}
                      </div>
                      <h3 className="text-2xl md:text-[28px] font-bold leading-tight mb-1">{p.name}</h3>
                      <div className="text-lg md:text-[20px] text-[#004a99] mb-3 md:mb-5" style={{ fontFamily: "Georgia, serif" }}>
                        {p.korean}
                      </div>
                      <div className="w-6 h-[2px] bg-[#DDDDDD] group-hover:bg-[#004a99] transition-colors mb-3 md:mb-5" />
                      <p className="text-[#555555] text-xs md:text-sm leading-relaxed mb-3 md:mb-4">{p.body}</p>
                      <div className="text-[10px] md:text-[11px] bg-[#EEF5FF] border border-[#C4D9F5] px-3 py-2 text-[#004a99]">
                        ✓ {p.badge}
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-[#EEEEEE]">
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-[#AAAAAA] mb-0.5">{p.sub}</div>
                        <div className="text-xl md:text-2xl font-mono font-bold">{p.price}</div>
                      </div>
                      <div className="text-[9px] md:text-[10px] text-right text-[#999999]">
                        {p.meta.split(" · ").map((m, i) => <div key={i}>{m}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PLATFORM ENGINE (Prescription Journey OS) ─ z-30 */}
      <section
        id="platform"
        ref={(el) => { observerRefs.current["platform"] = el; }}
        className="sticky top-14 md:top-16 h-[100dvh] bg-[#FAFAFA] z-30 overflow-hidden"
        style={{ boxShadow: "0 -6px 40px rgba(0,0,0,0.10)" }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col py-4 md:py-10">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-3 md:pb-5 mb-4 md:mb-6 flex-shrink-0 gap-4">
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="text-[9px] font-mono text-[#004a99] uppercase tracking-[0.2em] flex-shrink-0">02 / 05</span>
              <h2 className="text-base md:text-[32px] font-bold tracking-tight leading-snug">
                The Scaling Engine: Automated Pharmacy OS
              </h2>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#999999] flex-shrink-0 hidden sm:block">The 15-State Infrastructure</span>
          </div>

          {/* Thuy's Feb 19 verbatim context */}
          <div className="platform-quote opacity-0 bg-[#F3F9FF] border border-[#D5E8F8] p-3 md:p-4 text-[10px] md:text-[11px] leading-relaxed text-[#3C607F] mb-4 md:mb-5 flex-shrink-0">
            <strong className="text-[#004a99]">Thuy, Feb 19:</strong> &ldquo;I cannot scale the business if all the doctors were calling.&rdquo; &nbsp;·&nbsp; &ldquo;They are doing old fashioned way with paperwork.&rdquo; &nbsp;·&nbsp; &ldquo;Rana used AI — decoding the handwriting.&rdquo; &nbsp;·&nbsp; &ldquo;The prescriber portal here that we made is free.&rdquo;
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar md:overflow-visible">
            {/* 5-step workflow with animated connecting line */}
            <div className="relative mb-4 md:mb-5">
              <div className="absolute left-[28px] right-[28px] top-[28px] h-[5px] rounded-full bg-gradient-to-r from-[#B9D4EC] via-[#6DA4D0] to-[#004a99] workflow-line origin-left" style={{ transform: "scaleX(0)" }} />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-2 relative z-10">
                {platformStages.map((stage) => (
                  <div key={stage.step} className="platform-stage opacity-0 bg-white border border-[#DCEBFA] p-3 md:p-3.5">
                    <div className="w-9 h-9 rounded-full border-2 border-[#9DC4E6] bg-[#F3F8FE] flex items-center justify-center font-mono font-bold text-[#5B8BB0] mb-2 text-sm">
                      {stage.step}
                    </div>
                    <h4 className="text-[13px] md:text-[15px] font-bold leading-tight mb-1">{stage.title}</h4>
                    <p className="text-[10px] md:text-[11px] text-[#4F7190] leading-snug mb-2">{stage.detail}</p>
                    <div className="inline-block text-[9px] uppercase tracking-widest text-[#2E628E] border border-[#CAE0F3] bg-[#EEF6FD] px-2 py-1">
                      {stage.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail panels */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="platform-block opacity-0 bg-white border border-[#DCEBFA] p-3 md:p-4">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#4F7596] mb-2">Compounding Path</div>
                <ul className="space-y-1.5 text-[11px] text-[#3A5E7D]">
                  {platformCompoundingPath.map((item, i) => <li key={i}>— {item}</li>)}
                </ul>
              </div>
              <div className="platform-block opacity-0 bg-white border border-[#DCEBFA] p-3 md:p-4">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#4F7596] mb-2">Operational Fallbacks</div>
                <ul className="space-y-1.5 text-[11px] text-[#3A5E7D]">
                  {platformFallbackOps.map((item, i) => <li key={i}>— {item}</li>)}
                </ul>
              </div>
              <div className="platform-block opacity-0 bg-white border border-[#DCEBFA] p-3 md:p-4">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#4F7596] mb-2">Control Tower Metrics</div>
                <ul className="space-y-1.5 text-[11px] text-[#3A5E7D]">
                  {platformMetrics.map((item, i) => <li key={i}>— {item}</li>)}
                </ul>
              </div>
              <div className="platform-kpi opacity-0 bg-[#ECF5FF] border border-[#CDE2F6] p-3 md:p-4">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#4F7596] mb-2">Typical Timeframes</div>
                <ul className="space-y-1.5 text-[11px] text-[#2F587A]">
                  {platformTimeframes.map((item, i) => <li key={i}>— {item}</li>)}
                </ul>
              </div>
            </div>

            <div className="platform-block opacity-0 mt-3 bg-[#F0F7FF] border border-[#DCEBFA] p-3 md:p-4 text-[11px] md:text-[12px] text-[#375C7C] leading-relaxed">
              <strong className="text-[#1A4C74]">Thuy&apos;s ideal model:</strong> Portal-first intake. AI as a bridge for legacy paperwork. Formula-ID standardization to eliminate translation errors. Pioneer as operational source of truth. GHL reconciliation for commercial visibility. This is the repeatable engine for 15-state scale.
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: MARKET GAP ─────────────────────────────── z-40 */}
      <section
        id="market"
        ref={(el) => { observerRefs.current["market"] = el; }}
        className="sticky top-14 md:top-16 h-[100dvh] bg-[#0D0D0D] text-white z-40 overflow-hidden"
        style={{ boxShadow: "0 -6px 40px rgba(0,0,0,0.30)" }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col py-4 md:py-10">
          {/* Header */}
          <div className="flex justify-between items-end border-b border-[#2A2A2A] pb-3 md:pb-5 mb-4 md:mb-8 flex-shrink-0">
            <div className="flex items-baseline gap-3">
              <span className="text-[9px] font-mono text-[#004a99] uppercase tracking-[0.2em]">03 / 05</span>
              <h2 className="text-xl md:text-[32px] font-bold tracking-tight">The Market Gap</h2>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#555555]">Andres: &ldquo;No conversions at all.&rdquo; — Feb 13</span>
          </div>

          {/* Transcript context */}
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#444444] mb-3 md:mb-5 flex-shrink-0">
            Thuy, Feb 13: &ldquo;It&apos;s not working right, to be honest with you. I don&apos;t know nothing about marketing — I go with my nose.&rdquo; &nbsp;·&nbsp; Ryan audited 5 local providers to find out why.
          </p>

          <div className="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-2 md:gap-0 overflow-y-auto md:overflow-visible no-scrollbar">
            {/* Competitor list */}
            <div className="md:border-r md:border-[#222222] md:pr-10 space-y-3 md:space-y-6 md:flex md:flex-col md:justify-center">
              {competitors.map((c, i) => (
                <div
                  key={i}
                  className={`competitor-row pb-3 md:pb-5 border-b ${c.korean ? "border-[#004a99]" : "border-[#222222]"} opacity-0`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className={`text-xs md:text-sm font-bold ${c.korean ? "text-white" : "text-[#777777]"}`}>
                        {c.name}
                      </span>
                      <span className="text-[10px] text-[#444444] ml-2 hidden sm:inline">{c.location}</span>
                    </div>
                    <span className={`font-mono text-base md:text-lg font-bold ml-3 flex-shrink-0 ${c.korean ? "text-white" : "text-[#666666]"}`}>
                      {c.price}
                    </span>
                  </div>
                  <div className="flex gap-4 text-[10px]">
                    <span className={c.whiteJade ? "text-[#5599FF]" : "text-[#333333]"}>
                      백옥: {c.whiteJade === true ? "✓" : c.whiteJade === false ? "✗" : `⚠`}
                    </span>
                    <span className={c.korean ? "text-[#5599FF]" : "text-[#333333]"}>
                      Korean: {c.korean ? "✓" : "✗"}
                    </span>
                    {c.note && <span className="text-[#444444] hidden sm:inline italic">{c.note}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Big stat */}
            <div className="flex items-center justify-center md:pl-10 mt-4 md:mt-0">
              <div className="text-center">
                <div className="stat-number text-[80px] sm:text-[120px] md:text-[180px] font-bold font-mono text-[#004a99] leading-none select-none" data-val="0">
                  0
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#555555] mt-2 max-w-[220px] mx-auto leading-relaxed">
                  Local competitors with medical credibility AND Korean positioning. This is why it wasn&apos;t converting.
                </div>
                <div className="mt-4 border border-[#004a99] px-4 py-2 inline-block">
                  <div className="text-[9px] uppercase tracking-widest text-[#004a99]">Blue Ocean — First Mover Advantage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: LAUNCH ECONOMICS ──────────────────────── z-50 */}
      <section
        id="economics"
        ref={(el) => { observerRefs.current["economics"] = el; }}
        className="sticky top-14 md:top-16 h-[100dvh] bg-white z-50 overflow-hidden"
        style={{ boxShadow: "0 -6px 40px rgba(0,0,0,0.12)" }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col py-4 md:py-10">
          {/* Header */}
          <div className="flex justify-between items-end border-b border-[#EEEEEE] pb-3 md:pb-5 mb-4 md:mb-8 flex-shrink-0">
            <div className="flex items-baseline gap-3">
              <span className="text-[9px] font-mono text-[#004a99] uppercase tracking-[0.2em]">04 / 05</span>
              <h2 className="text-xl md:text-[32px] font-bold tracking-tight">Launch Economics</h2>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#999999]">Thuy: &ldquo;Take off problems off my plate, and convert.&rdquo;</span>
          </div>

          {/* Transcript context */}
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#AAAAAA] mb-3 md:mb-5 flex-shrink-0">
            Thuy, Feb 13: &ldquo;Take off some problems off my plate, please, Ryan, and convert. That&apos;s all I&apos;m saying.&rdquo; &nbsp;·&nbsp; Prescriber pipeline: &ldquo;Two months to onboard — we need to chunk it down to a couple weeks.&rdquo;
          </p>

          {/* Panels — vertical on mobile, 3-col grid on desktop */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar md:overflow-visible">
            <div className="flex flex-col gap-4 pb-4 md:grid md:grid-cols-3 md:gap-5 md:h-full md:pb-0">
              {/* Panel 1: Offer Math */}
              <div className="flex-shrink-0 w-full md:w-auto flex flex-col border border-[#EEEEEE] overflow-hidden">
                <div className="bg-[#FAFAFA] border-b border-[#EEEEEE] px-4 md:px-6 py-2.5 flex-shrink-0">
                  <h3 className="text-[9px] uppercase tracking-widest text-[#888888]">The Offer Math</h3>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="space-y-0 flex-1">
                    {[
                      { label: "White Jade × 2 sessions", value: "$450", hi: false },
                      { label: "Sessions delivered", value: "3", hi: false },
                      { label: "Patient cost per session", value: "$150", hi: true },
                      { label: "Competitor avg per session", value: "$235", hi: false },
                      { label: "Cash collected by Soleil", value: "$450", hi: true },
                    ].map((r, i) => (
                      <div key={i} className={`flex justify-between items-center py-3 border-b border-[#F5F5F5] ${r.hi ? "font-bold" : ""}`}>
                        <span className={`text-sm ${r.hi ? "text-[#222222]" : "text-[#666666]"}`}>{r.label}</span>
                        <span className={`font-mono text-sm ${r.hi ? "text-[#004a99]" : "text-[#444444]"}`}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-[#EEF5FF] border border-[#C4D9F5] p-3 text-[11px] text-[#004a99] leading-relaxed">
                    Psychology: Patient feels they scored a deal. You collected full pre-payment. Commitment drives compliance.
                  </div>
                </div>
              </div>

              {/* Panel 2: 60-Day Milestones */}
              <div className="flex-shrink-0 w-full md:w-auto flex flex-col border border-[#EEEEEE] overflow-hidden">
                <div className="bg-[#FAFAFA] border-b border-[#EEEEEE] px-4 md:px-6 py-2.5 flex-shrink-0">
                  <h3 className="text-[9px] uppercase tracking-widest text-[#888888]">60-Day Milestones</h3>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="space-y-0">
                    {[
                      { day: "Day 10",  text: "Site live — GHL form active", critical: false },
                      { day: "Day 10",  text: "GHL HIPAA BAA signed ⚠", critical: true },
                      { day: "Day 15",  text: "Medical Director contracted ⚠", critical: true },
                      { day: "Day 15",  text: "Pre-sale checkout opens", critical: false },
                      { day: "Day 28",  text: "Revenue target: $15,000", critical: false },
                      { day: "Day 42",  text: "Soft launch (invite-only)", critical: false },
                      { day: "Day 60",  text: "Grand Opening: $40–50K", critical: false },
                    ].map((m, i) => (
                      <div key={i} className="flex gap-3 py-3 border-b border-[#F5F5F5] items-center">
                        <span className="font-mono text-[10px] text-[#999999] w-12 flex-shrink-0">{m.day}</span>
                        <span className={`text-[13px] leading-snug ${m.critical ? "text-red-600 font-bold" : "text-[#555555]"}`}>
                          {m.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-[10px] text-[#AAAAAA]">⚠ Required before Day 1 patient interactions</div>
                </div>
              </div>

              {/* Panel 3: LTV Grid */}
              <div className="flex-shrink-0 w-full md:w-auto flex flex-col border border-[#EEEEEE] overflow-hidden">
                <div className="bg-[#FAFAFA] border-b border-[#EEEEEE] px-4 md:px-6 py-2.5 flex-shrink-0">
                  <h3 className="text-[9px] uppercase tracking-widest text-[#888888]">LTV Model (Annual)</h3>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="space-y-0 flex-1">
                    {[
                      { tier: "Casual — 1×/month",       monthly: "$225",   annual: "$2,700" },
                      { tier: "Burnout Reset Membership", monthly: "$680",   annual: "$8,160" },
                      { tier: "Mixed — 4×/month",         monthly: "$900",   annual: "$10,800" },
                      { tier: "Power User — 8×/month",    monthly: "$1,800", annual: "$21,600" },
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-[#F5F5F5]">
                        <span className="text-sm text-[#666666]">{r.tier}</span>
                        <div className="text-right ml-4">
                          <div className="font-mono text-sm">{r.monthly}<span className="text-[10px] text-[#AAAAAA]">/mo</span></div>
                          <div className="font-mono text-[11px] font-bold text-[#004a99]">{r.annual}/yr</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border border-[#004a99] p-4 text-center">
                    <div className="text-[9px] uppercase tracking-widest text-[#999999] mb-1">Pre-Sale Target</div>
                    <div className="text-2xl font-mono font-bold">33 Packages</div>
                    <div className="text-[11px] text-[#666666] mt-1">= $15,000 at $450 each</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: B2B TARGETS + DECISION ────────────────── z-60 */}
      <section
        id="b2b"
        ref={(el) => { observerRefs.current["b2b"] = el; }}
        className="sticky top-14 md:top-16 h-[100dvh] bg-[#F5F5F5] z-[60] overflow-hidden"
        style={{ boxShadow: "0 -6px 40px rgba(0,0,0,0.10)" }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col py-4 md:py-10">
          {/* Header */}
          <div className="flex justify-between items-end border-b border-[#E0E0E0] pb-3 md:pb-5 mb-4 md:mb-8 flex-shrink-0">
            <div className="flex items-baseline gap-3">
              <span className="text-[9px] font-mono text-[#004a99] uppercase tracking-[0.2em]">05 / 05</span>
              <h2 className="text-xl md:text-[32px] font-bold tracking-tight">That Is Your B2B Outreach</h2>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#999999]">Partners With the Same Cultural Mindset</span>
          </div>

          <div className="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-12 md:gap-8 overflow-y-auto md:overflow-visible no-scrollbar">
            {/* B2B grid */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {b2bTargets.map((t, i) => (
                  <div
                    key={i}
                    className={`b2b-card bg-white border ${t.korean ? "border-[#A6C7E7]" : "border-[#E0E0E0]"} hover:border-[#004a99] transition-colors p-3 md:p-4 flex flex-col opacity-0`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-[11px] md:text-[13px] font-bold text-[#222222] leading-tight pr-1">{t.name}</div>
                      {t.korean && <span className="text-[#004a99] text-xs flex-shrink-0">★</span>}
                    </div>
                    <div className="text-[10px] text-[#004a99] mb-2">{t.doctor}</div>
                    <div className="mt-auto pt-2 border-t border-[#F0F0F0]">
                      <div className="text-[10px] font-mono text-[#888888]">{t.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[9px] text-[#999999]">
                ★ Korean-American practitioner. All businesses verified Feb 19, 2026.
              </div>
            </div>

            {/* Decision column */}
            <div className="md:col-span-5 md:border-l md:border-[#E0E0E0] md:pl-8 flex flex-col justify-between mt-4 md:mt-0 border-t border-[#E0E0E0] pt-4 md:border-t-0 md:pt-0">
              <div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-[#999999] mb-3 md:mb-5 border-b border-[#E0E0E0] pb-3 md:pb-4">
                  Thuy&apos;s Mandate · Ryan&apos;s Response
                </div>
                <blockquote className="text-[10px] md:text-[11px] italic text-[#888888] leading-relaxed mb-3 md:mb-5 border-l-2 border-[#004a99] pl-3">
                  &ldquo;You will need to market to the end user, but also find partners that resonate with us — that have the same cultural mindset to help the public. That is your B2B outreach.&rdquo;
                  <span className="block mt-1 not-italic text-[9px] uppercase tracking-widest text-[#BBBBBB]">— Thuy, Feb 13 · @22:00</span>
                </blockquote>
                <h3 className="text-[30px] md:text-[52px] font-bold tracking-tight leading-[0.9] mb-3 md:mb-6">
                  LOCK IN<br />
                  <span className="text-[#004a99]">$225.</span>
                </h3>
                <p className="text-[#666666] text-xs md:text-sm leading-relaxed mb-3 md:mb-6">
                  Undercuts VitaFusion ($250) while sitting well above mobile add-ons ($140). Matches KARA Med Spa NJ — the Korean-market proof point.
                </p>
                <div className="space-y-2 md:space-y-3">
                  {[
                    { label: "Approve White Jade launch at", value: "$225" },
                    { label: "Approve pre-sale package", value: "$450 / 3 sessions" },
                    { label: "Medical Director by", value: "Day 15" },
                    { label: "GHL HIPAA BAA by", value: "Day 10" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-[#EEEEEE] pb-2 md:pb-3">
                      <span className="text-[11px] md:text-[12px] text-[#666666]">{item.label}</span>
                      <span className="font-mono text-[11px] md:text-[13px] font-bold ml-2 flex-shrink-0">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mt-4 md:mt-0">
                <Link
                  href="/"
                  className="block w-full bg-[#004a99] text-white text-center py-3 md:py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#003377] transition-colors"
                >
                  Return to Main Site
                </Link>
                <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#AAAAAA] pt-1">
                  <span>Soleil Infusion</span>
                  <span>Confidential — Feb 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll spacer — lets the sticky deck fully unwind */}
      <div style={{ height: "400vh" }} aria-hidden="true" />

      {/* ─── FIXED BOTTOM TICKER ────────────────────────────────────
           Two strips: top scrolls left, bottom scrolls right.
           Section-aware colors. z-[150]: above sticky sections, below header. */}
      <style>{`
        @keyframes tickL { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes tickR { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
        @media (prefers-reduced-motion: reduce) {
          .pillar-card, .competitor-row, .b2b-card, .intro-stat, .platform-stage, .platform-block, .platform-kpi, .platform-quote { opacity: 1 !important; }
        }
        /* Hide scrollbars on inner-scrollable panes */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="fixed bottom-0 left-0 w-full z-[150] pointer-events-none hidden md:block">
        <div className={`overflow-hidden h-[26px] flex items-center border-t transition-colors duration-500 ${activeSection === "market" ? "bg-[#111111] border-[#2A2A2A]" : "bg-[#F0F0F0] border-[#E0E0E0]"}`}>
          <div className="flex whitespace-nowrap" style={{ animation: "tickL 28s linear infinite" }}>
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className={`text-[8px] uppercase tracking-[0.28em] font-bold px-10 transition-colors duration-500 ${activeSection === "market" ? "text-[#444444]" : "text-[#BBBBBB]"}`}>
                WHITE JADE · 백옥주사 · &ldquo;BUILD A SYSTEM WE CAN SCALE AND SELL&rdquo; · ZERO LOCAL COMPETITORS · $225 VALIDATED · GLEN BURNIE MD · SOLEIL INFUSION ·
              </span>
            ))}
          </div>
        </div>
        <div className={`overflow-hidden h-[26px] flex items-center transition-colors duration-500 ${activeSection === "market" ? "bg-[#1A1A1A]" : "bg-[#004a99]"}`}>
          <div className="flex whitespace-nowrap" style={{ animation: "tickR 35s linear infinite" }}>
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className="text-[8px] uppercase tracking-[0.28em] font-bold px-10 text-white/35">
                60 DAYS TO LAUNCH · PRE-SALE $15K · &ldquo;TAKE OFF PROBLEMS OFF MY PLATE, AND CONVERT&rdquo; · &ldquo;THAT IS YOUR B2B OUTREACH&rdquo; · FIRST MOVER ADVANTAGE ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
