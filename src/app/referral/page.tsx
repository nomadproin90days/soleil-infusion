"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  FileText,
  Phone,
  Globe,
  Clock,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { normalizeLocale, type Locale } from "@/lib/localization";
import { REFERRAL_TRANSLATIONS } from "@/lib/translations/referral";

export default function ReferralKit() {
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

  const t = REFERRAL_TRANSLATIONS[lang];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 15 } },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans pb-32 selection:bg-[#004a99] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-[100] border-b border-black/5 font-sans">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <BrandLogo alt="Soleil Logo" priority className="transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#111111] leading-none mb-1">
                <span className="text-[#004a99]">SOLEIL</span> INFUSION
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50">{t.partnerProgram}</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <LanguageSwitcher locale={lang} onChange={setLang} />
            <Link href="/hub" className="text-xs font-mono uppercase tracking-widest text-[#646464] hover:text-[#111111] transition-colors">
              {t.partnerHub}
            </Link>
            <a href="#refer" className="bg-[#004a99] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#003377] transition-colors">
              {t.referPatient}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto text-center"
      >
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-[#004a99] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#646464]">{t.clinicalProgram}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-balance">
          {lang === 'en' ? (
            <>A specialized extension of <br/><span className="font-medium text-[#004a99]">your care team.</span></>
          ) : t.headline}
        </h1>
        <p className="text-xl md:text-2xl text-[#646464] max-w-3xl mx-auto leading-relaxed font-light">
          {t.subheadline}
        </p>
      </motion.header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-6 md:px-12 max-w-6xl mx-auto space-y-32"
      >
        {/* Core Value Props */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3 text-balance">{t.integrityTitle}</h3>
            <p className="text-[#646464] font-light text-sm leading-relaxed">
              {t.integrityDesc}
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3 text-balance">{t.coordinationTitle}</h3>
            <p className="text-[#646464] font-light text-sm leading-relaxed">
              {t.coordinationDesc}
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-6">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3 text-balance">{t.bilingualTitle}</h3>
            <p className="text-[#646464] font-light text-sm leading-relaxed">
              {t.bilingualDesc}
            </p>
          </div>
        </motion.section>

        {/* Home B12 Workflow */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[#004a99] mb-4">{t.caseStudyLabel}</div>
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              {lang === 'en' ? (
                <>Home B12 <br/><span className="font-medium">Administration</span></>
              ) : t.caseStudyTitle}
            </h2>
            <p className="text-[#646464] font-light leading-relaxed mb-8">
              {t.caseStudyDesc}
            </p>
            <ul className="space-y-4">
              {(lang === 'ko' ? [
                "사전 충전된 1회용 주사기",
                "단계별 이중 언어 지침",
                "자동 리필 조정",
                "보호자 질문을 위한 직접 소통"
              ] : lang === 'vi' ? [
                "Bơm tiêm liều đơn đã nạp sẵn thuốc",
                "Hướng dẫn song ngữ từng bước",
                "Điều phối cấp lại thuốc tự động",
                "Liên lạc trực tiếp cho các câu hỏi của người chăm sóc"
              ] : [
                "Pre-loaded single-dose syringes",
                "Step-by-step bilingual instructions",
                "Automated refill coordination",
                "Direct contact for caregiver questions"
              ]).map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-light">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7 bg-[#111111] rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent" />
            <h3 className="text-2xl font-light mb-8 relative z-10">{t.refillPathwayTitle}</h3>
            <div className="space-y-6 relative z-10 font-mono text-xs uppercase tracking-[0.1em]">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">1</div>
                <div className="flex-1 pb-4 border-b border-white/10">{t.refillStep1}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">2</div>
                <div className="flex-1 pb-4 border-b border-white/10">{t.refillStep2}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-[#A6C7E7] border-[#A6C7E7]">3</div>
                <div className="flex-1 pb-4 border-b border-white/10 text-[#A6C7E7]">{t.refillStep3}</div>
              </div>
            </div>
            <p className="mt-12 text-sm text-[#646464] font-light italic">
              {t.refillQuote}
            </p>
          </div>
        </motion.section>

        {/* Medicaid Expansion */}
        <motion.section variants={itemVariants} className="bg-[#F3F9FF] rounded-[3rem] p-12 md:p-20 border border-[#004a99]/5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#004a99]" size={24} />
              <span className="text-xs font-mono uppercase tracking-widest text-[#004a99]">Regional Access</span>
            </div>
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              {lang === 'en' ? (
                <>Expanded Coverage for <span className="font-medium text-[#004a99]">Mid-Atlantic Families</span></>
              ) : t.medicaidTitle}
            </h2>
            <p className="text-[#4F7190] text-lg leading-relaxed mb-10 font-light text-balance">
              {t.medicaidDesc}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(lang === 'ko' ? ["메릴랜드", "펜실베이니아", "델라웨어", "DC (보류 중)"] : lang === 'vi' ? ["Maryland", "Pennsylvania", "Delaware", "DC (Đang chờ)"] : ["Maryland", "Pennsylvania", "Delaware", "DC (Pending)"]).map((state, i) => (
                <div key={i} className="bg-white px-4 py-3 rounded-xl border border-[#004a99]/10 text-center text-xs font-medium uppercase tracking-wider text-[#004a99]">
                  {state}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Referral Form Section */}
        <motion.section id="refer" variants={itemVariants} className="text-center py-20">
          <h2 className="text-4xl font-light mb-6 tracking-tight">
            {lang === 'en' ? (
              <>Start a <span className="font-medium text-[#004a99]">Partnership</span></>
            ) : t.startPartnership}
          </h2>
          <p className="text-[#646464] font-light max-w-xl mx-auto mb-12">
            {t.startPartnershipDesc}
          </p>
          
          <div className="max-w-3xl mx-auto bg-white p-4 md:p-8 rounded-[3rem] border border-black/5 shadow-sm min-h-[800px] overflow-hidden">
            <iframe
              src="https://api.voshellspharmacy.com/widget/form/vidpgunEF5sDUTl0wVyU"
              style={{ width: '100%', height: '1400px', border: 'none', borderRadius: '3px' }}
              id="inline-vidpgunEF5sDUTl0wVyU" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Soleil - B2B Referral Form"
              data-height="1400"
              data-layout-iframe-id="inline-vidpgunEF5sDUTl0wVyU"
              data-form-id="vidpgunEF5sDUTl0wVyU"
              title="Soleil - B2B Referral Form"
            ></iframe>
            <Script src="https://api.voshellspharmacy.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </motion.section>

        {/* Business Discovery Call Calendar */}
        <motion.section variants={itemVariants} className="bg-white rounded-[4rem] p-12 md:p-20 border border-[#004a99]/5 shadow-sm overflow-hidden text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              {lang === 'en' ? (
                <>Book a <span className="font-medium text-[#004a99]">Partnership Discovery Call</span></>
              ) : t.discoveryCallTitle}
            </h2>
            <p className="text-[#646464] font-light text-lg leading-relaxed">
              {t.discoveryCallDesc}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-[#FAFAFA] rounded-[3rem] p-4 min-h-[850px] overflow-hidden">
            <iframe 
              src="https://api.voshellspharmacy.com/widget/booking/BmauXC3RW6J6IQDl0fEc" 
              style={{ width: '100%', height: '850px', border: 'none', overflow: 'hidden' }}
              scrolling="no" 
              id="4hqXKsvC0RlDfyt590Qf_1772312008724"
              title="Business Connection & Support Calendar"
            ></iframe>
            <Script src="https://api.voshellspharmacy.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </motion.section>

        {/* Contact info */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-20 border-t border-black/5">
          <div>
            <h3 className="text-xl font-medium mb-6">{t.directSupport}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#646464]">
                <div className="h-10 w-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <span className="font-mono text-sm">(443) 281-9157</span>
              </div>
              <div className="flex items-center gap-4 text-[#646464]">
                <div className="h-10 w-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <span className="text-sm font-light italic">{t.rxConfirmNote}</span>
              </div>
            </div>
          </div>
          <div className="bg-[#111111] p-10 rounded-[2rem] text-white">
            <h3 className="text-lg font-light mb-4">{t.areYouPatient}</h3>
            <p className="text-[#646464] text-sm font-light mb-8">
              {t.patientDesc}
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-[#A6C7E7] hover:text-white transition-colors group">
              <span>{t.visitSoleil}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>
      </motion.main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-black/5 z-[100] py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">
          <span>© 2026 {t.footerLabel}</span>
          <div className="flex gap-6">
            <Link href="/hub" className="hover:text-[#004a99] transition-colors flex items-center gap-1">
              {t.resourceHub} <ArrowUpRight size={10} />
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
