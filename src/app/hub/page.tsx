"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Search, 
  FileText, 
  ArrowRight, 
  Settings, 
  Calendar, 
  Activity, 
  Layout, 
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  Users,
  Clock,
  BarChart3
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { normalizeLocale, type Locale } from "@/lib/localization";
import { HUB_TRANSLATIONS } from "@/lib/translations/hub";

const RESOURCES = [
  {
    title: "Today's Session Summary",
    desc: "Progress report for Feb 27: Booking system live and partnership strategy.",
    href: "/session-report",
    category: "Reports",
    icon: FileText
  },
  {
    title: "The Scaling Blueprint",
    desc: "Strategy for transforming a local pharmacy into a 15-state franchise platform.",
    href: "/edge",
    category: "Strategy",
    icon: Layout
  },
  {
    title: "B2B Lead Nurture",
    desc: "WF-01: Automated onboarding for clinical and community partners.",
    href: "/hub/workflow/wf-01-b2b-lead-nurture",
    category: "Workflows",
    icon: Users
  },
  {
    title: "Rx Intake & Pharmacist Alert",
    desc: "WF-02: Instant coordination between patient forms and the pharmacy lab.",
    href: "/hub/workflow/wf-02-rx-intake-pharmacist-alert",
    category: "Workflows",
    icon: ShieldCheck
  },
  {
    title: "Patient Rx Payment & Consent",
    desc: "WF-03: Automated follow-up for missing payments or signatures.",
    href: "/hub/workflow/wf-03-patient-rx-payment-consent",
    category: "Workflows",
    icon: Settings
  },
  {
    title: "New Patient Booking",
    desc: "WF-04: Full confirmation and reminder sequence for new visitors.",
    href: "/hub/workflow/wf-04-new-patient-booking",
    category: "Workflows",
    icon: Calendar
  },
  {
    title: "Post-Infusion Follow-up",
    desc: "WF-05: Caring for patients after their visit and encouraging reviews.",
    href: "/hub/workflow/wf-05-post-infusion-followup",
    category: "Workflows",
    icon: Activity
  },
  {
    title: "No-Show Recovery",
    desc: "WF-06: Friendly automated re-engagement for missed appointments.",
    href: "/hub/workflow/wf-06-no-show-recovery",
    category: "Workflows",
    icon: Clock
  },
  {
    title: "Pre-launch Package Sales",
    desc: "WF-07: Managing the 'Buy 2 Get 1' limited-time launch offer.",
    href: "/hub/workflow/wf-07-prelaunch-package-sales",
    category: "Workflows",
    icon: Smartphone
  },
  {
    title: "Web Lead Nurture",
    desc: "WF-08: Nurturing website visitors from inquiry to first appointment.",
    href: "/hub/workflow/wf-08-b2c-web-lead-nurture",
    category: "Workflows",
    icon: Layout
  },
  {
    title: "Membership Enrollment",
    desc: "WF-09: Automated onboarding and renewal for monthly members.",
    href: "/hub/workflow/wf-09-membership-enrollment-renewal",
    category: "Workflows",
    icon: ShieldCheck
  },
  {
    title: "Google Review Request",
    desc: "WF-10: Capturing positive feedback from satisfied patients.",
    href: "/hub/workflow/wf-10-google-review-request",
    category: "Workflows",
    icon: Activity
  },
  {
    title: "Missed Call Text-back",
    desc: "WF-11: Ensuring no patient inquiry goes unanswered.",
    href: "/hub/workflow/wf-11-missed-call-textback",
    category: "Workflows",
    icon: Smartphone
  },
  {
    title: "B2B Referral Tracking",
    desc: "WF-12: Attribution and tracking for our clinical referral partners.",
    href: "/hub/workflow/wf-12-b2b-referral-tracking",
    category: "Workflows",
    icon: Users
  },
  {
    title: "GHL Foundation Setup",
    desc: "Technical configuration guide for the Soleil automation engine.",
    href: "/hub/workflow/ghl-foundation-setup",
    category: "Infrastructure",
    icon: Settings
  },
  {
    title: "Referral Kit Page",
    desc: "B2B clinical partnership landing page for referring practitioners.",
    href: "/referral",
    category: "Strategy",
    icon: Users
  },
  {
    title: "Dashboard Setup Guide",
    desc: "Instructions for tracking Speed-to-Lead, Show Rate, and other KPIs.",
    href: "/hub/docs/dashboard-setup",
    category: "Infrastructure",
    icon: BarChart3
  },
  {
    title: "Contract KPI Checklist",
    desc: "The exact metrics required by your 90-day agreement.",
    href: "/hub/docs/kpi-checklist",
    category: "Strategy",
    icon: ShieldCheck
  }
];

export default function ResourceHub() {
  const [query, setSearchQuery] = useState("");
  const [lang, setLang] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const urlLocale = normalizeLocale(new URLSearchParams(window.location.search).get("lang"));
    const savedLocale = normalizeLocale(window.localStorage.getItem("preferred_locale"));
    const browserLocale = normalizeLocale(navigator.language);
    return urlLocale !== "en" ? urlLocale : savedLocale !== "en" ? savedLocale : browserLocale;
  });

  const BREADCRUMB_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://soleilinfusion.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Resource Hub",
        "item": "https://soleilinfusion.com/hub"
      }
    ]
  };

  useEffect(() => {
    window.localStorage.setItem("preferred_locale", lang);
    document.cookie = `preferred_locale=${lang}; path=/; max-age=31536000; samesite=lax`;
    const url = new URL(window.location.href);
    if (lang === "en") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", lang);
    }
    window.history.replaceState({}, "", url.toString());
  }, [lang]);

  const t = HUB_TRANSLATIONS[lang];

  const filtered = RESOURCES.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.desc.toLowerCase().includes(query.toLowerCase()) ||
    t.categories[r.category as keyof typeof t.categories]?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-20 pb-12 px-6 md:px-12 max-w-6xl mx-auto border-b border-black/5"
      >
        <div className="flex items-center justify-between mb-12 text-[#111111]">
          <Link href="/" className="flex items-center gap-4 group">
            <BrandLogo alt="Soleil Logo" priority />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none mb-1 text-[#004a99] group-hover:text-[#003377] transition-colors">SOLEIL</span>
              <span className="font-bold text-xl tracking-tight leading-none">INFUSION</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={lang} onChange={setLang} />
            <Link href="/" className="hidden md:block text-xs font-mono uppercase tracking-widest text-[#646464] hover:text-[#111111] transition-colors">← Main Site</Link>
            <Link href="/#book" className="bg-[#004a99] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#003377] transition-colors">Book Now</Link>
            <div className="h-2 w-2 rounded-full bg-[#004a99] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#646464]">{t.hubLabel}</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-balance">
          {lang === 'en' ? (
            <>All Project <span className="font-medium text-[#004a99]">Documents</span></>
          ) : t.title}
        </h1>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
          <input 
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full bg-white border border-black/5 rounded-2xl py-4 pl-12 pr-6 text-lg outline-none focus:border-[#004a99]/30 focus:shadow-sm transition-all shadow-sm"
            value={query}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.header>

      <main className="px-6 md:px-12 max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={res.href} className="group block h-full">
                <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md hover:border-[#004a99]/20 transition-all flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-[#FAFAFA] flex items-center justify-center text-[#646464] group-hover:bg-[#004a99] group-hover:text-white transition-colors">
                      <res.icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">
                      {t.categories[res.category as keyof typeof t.categories] || res.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-[#004a99] transition-colors">{res.title}</h3>
                  <p className="text-[#646464] font-light text-sm leading-relaxed flex-1">
                    {res.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#004a99] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-300">
                    <span>{t.viewDocument}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#999999]">{t.noResults} &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </main>

      {/* Footer / Quick Access */}
      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-black/5 z-[100] py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">
          <span>© 2026 {t.hubLabel}</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[#004a99] transition-colors flex items-center gap-1">
              {t.mainSite} <ArrowUpRight size={10} />
            </Link>
            <Link href="/session-report" className="hover:text-[#004a99] transition-colors flex items-center gap-1">
              {t.latestReport} <ArrowUpRight size={10} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
