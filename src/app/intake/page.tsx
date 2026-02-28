"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  CheckCircle2,
  Lock,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { normalizeLocale, type Locale } from "@/lib/localization";
import { INTAKE_TRANSLATIONS } from "@/lib/translations/intake";

export default function PrescriptionIntake() {
  const [lang, setLang] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const urlLocale = normalizeLocale(new URLSearchParams(window.location.search).get("lang"));
    const savedLocale = normalizeLocale(window.localStorage.getItem("preferred_locale"));
    const browserLocale = normalizeLocale(navigator.language);
    return urlLocale !== "en" ? urlLocale : savedLocale !== "en" ? savedLocale : browserLocale;
  });

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

  const t = INTAKE_TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans pb-32 selection:bg-[#004a99] selection:text-white">
      {/* Header */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-[100] border-b border-black/5 bg-white/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <BrandLogo alt="Soleil Logo" priority className="transition-transform duration-500 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#111111] leading-none mb-1">
                <span className="text-[#004a99]">SOLEIL</span> PHARMACY
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50">Clinical Intake Portal</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <LanguageSwitcher locale={lang} onChange={setLang} />
            <Link href="/" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#646464] hover:text-[#111111] transition-colors">
              <ArrowLeft size={14} /> {t.backHome}
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-48 pb-20 px-6 max-w-4xl mx-auto text-center"
      >
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99]">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#004a99] font-bold">{t.label}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#111111] mb-10 leading-tight text-balance">
          {lang === 'en' ? (
            <><span className="font-medium text-[#004a99]">Secure</span> Prescription Intake.</>
          ) : t.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-[#646464] font-light leading-relaxed mb-12 text-balance">
          {t.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono uppercase tracking-widest text-[#999999]">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
            <Lock size={12} className="text-green-600" /> HIPAA Compliant
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
            <Clock size={12} className="text-[#004a99]" /> Est. time: 10 mins
          </div>
        </div>
      </motion.header>

      {/* Form Section */}
      <main className="px-6 max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-[4rem] border border-black/5 shadow-2xl shadow-blue-900/5 min-h-[2115px] overflow-hidden p-2 md:p-6"
        >
          <iframe
            src="https://api.voshellspharmacy.com/widget/form/3hXlVkwkuGCoLTkHA6d5"
            style={{ width: '100%', height: '2115px', border: 'none', borderRadius: '3px' }}
            id="inline-3hXlVkwkuGCoLTkHA6d5" 
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Soleil Pharmacy - Prescription Intake"
            data-height="2115"
            data-layout-iframe-id="inline-3hXlVkwkuGCoLTkHA6d5"
            data-form-id="3hXlVkwkuGCoLTkHA6d5"
            title="Soleil Pharmacy - Prescription Intake"
          ></iframe>
          <Script src="https://api.voshellspharmacy.com/js/form_embed.js" strategy="afterInteractive" />
        </motion.div>

        {/* Support Section */}
        <div className="mt-20 text-center">
          <p className="text-[#646464] font-light mb-8">Need assistance while completing the form?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <div className="flex items-center gap-3 justify-center text-sm font-mono text-[#111111]">
              <span className="text-[#004a99] font-bold tracking-widest uppercase">Phone:</span>
              (443) 281-9157
            </div>
            <div className="flex items-center gap-3 justify-center text-sm font-mono text-[#111111]">
              <span className="text-[#004a99] font-bold tracking-widest uppercase">Support:</span>
              Mon-Fri 9am-6pm
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-black/5 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">
          <span>© 2026 {t.footerLabel}</span>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-[#004a99] transition-colors flex items-center gap-1">
              Main Site <ArrowUpRight size={10} />
            </Link>
            <Link href="/hub" className="hover:text-[#004a99] transition-colors flex items-center gap-1">
              Partner Hub <ArrowUpRight size={10} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
