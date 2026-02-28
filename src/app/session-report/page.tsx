"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, FileText, ArrowRight, ShieldCheck, Calendar, Send, Clock } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { normalizeLocale, type Locale } from "@/lib/localization";
import { SESSION_REPORT_TRANSLATIONS } from "@/lib/translations/session-report";

export default function SessionReport() {
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

  const t = SESSION_REPORT_TRANSLATIONS[lang];

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
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] selection:bg-[#004a99] selection:text-white font-sans pb-32">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pt-20 pb-12 px-6 md:px-12 max-w-6xl mx-auto border-b border-black/5"
      >
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-4 group">
            <BrandLogo alt="Soleil Logo" priority />
            <div className="flex flex-col text-[#111111]">
              <span className="font-bold text-xl tracking-tight leading-none mb-1 text-[#004a99] group-hover:text-[#003377] transition-colors">SOLEIL</span>
              <span className="font-bold text-xl tracking-tight leading-none">INFUSION</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={lang} onChange={setLang} />
            <Link href="/" className="hidden md:block text-xs font-mono uppercase tracking-widest text-[#646464] hover:text-[#111111] transition-colors">← Main Site</Link>
            <Link href="/#book" className="bg-[#004a99] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#003377] transition-colors">Book Now</Link>
            <div className="h-2 w-2 rounded-full bg-[#004a99] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#646464]">{t.reportLabel}</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
          {lang === 'en' ? (
            <>Session <span className="font-medium text-[#004a99]">Summary</span></>
          ) : t.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#646464] max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono text-[#646464]">
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 text-[#111111]">Feb 27, 2026</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 font-medium text-[#111111]">Project: Soleil Infusion</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-600" />
            {t.statusLabel}
          </div>
        </div>
      </motion.header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-6 md:px-12 max-w-6xl mx-auto mt-16 space-y-24"
      >
        {/* Executive Summary */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">{t.executiveSummary}</h2>
          </div>
          <div className="md:col-span-8 prose prose-lg">
            <p className="text-2xl font-light leading-snug text-balance">
              {t.execDesc1}
            </p>
            <p className="text-xl text-[#646464] leading-relaxed mt-6 font-light">
              {t.execDesc2}
            </p>
          </div>
        </motion.section>

        {/* Shipped To Production */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">{t.resultsLabel}</h2>
          </div>
          <div className="md:col-span-8 space-y-12">
            
            {/* Calendar & Booking */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-[#004a99]" size={24} />
                <h3 className="text-2xl font-medium tracking-tight">{t.bookingTitle}</h3>
              </div>
              <p className="text-[#646464] font-light mb-6">{t.bookingDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                  <h4 className="font-medium mb-2">{t.newPatientTitle}</h4>
                  <p className="text-[#646464] font-light">{t.newPatientDesc}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                  <h4 className="font-medium mb-2">{t.returnPatientTitle}</h4>
                  <p className="text-[#646464] font-light">{t.returnPatientDesc}</p>
                </div>
              </div>
            </div>

            {/* The Follow-Up System */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-[#008B8B]" size={24} />
                <h3 className="text-2xl font-medium tracking-tight">{t.followupTitle}</h3>
              </div>
              <p className="text-[#646464] font-light mb-6">{t.followupDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: t.followupItem1, desc: t.followupItem1Desc },
                  { name: t.followupItem2, desc: t.followupItem2Desc },
                  { name: t.followupItem3, desc: t.followupItem3Desc },
                  { name: t.followupItem4, desc: t.followupItem4Desc }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-start gap-4">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shadow-[0_0_8px_rgba(34,197,94,0.5)] flex-shrink-0" />
                    <div>
                      <span className="font-medium block mb-1">{item.name}</span>
                      <span className="text-[#646464] font-light text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.section>

        {/* Growth & Strategy */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">{t.growthTitle}</h2>
          </div>
          <div className="md:col-span-8">
            <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <Send className="text-[#A6C7E7]" size={24} />
                <h3 className="text-xl font-medium">{t.partnershipTitle}</h3>
              </div>
              <p className="text-[#646464] font-light leading-relaxed">
                {t.partnershipDesc}
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-[#EEF5FF] rounded-lg text-[#004a99] text-xs font-mono uppercase tracking-widest">
                  {lang === 'ko' ? "메디케이드 보장 확대 포함" : lang === 'vi' ? "Mở rộng Medicaid" : "Medicaid Expansion Included"}
                </div>
                <div className="px-4 py-2 bg-[#EEF5FF] rounded-lg text-[#004a99] text-xs font-mono uppercase tracking-widest">
                  {lang === 'ko' ? "전문가 아웃리치 준비 완료" : lang === 'vi' ? "Tiếp cận chuyên nghiệp sẵn sàng" : "Professional Outreach Ready"}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Future Roadmap */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">{t.nextTitle}</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">{t.upcomingTitle}</h3>
              <p className="text-[#646464] font-light text-balance">{t.upcomingDesc}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">{t.integrationTitle}</h3>
              <ul className="space-y-2 text-[#646464] font-light">
                <li className="flex items-center gap-2"><ArrowRight size={14} /> {t.integrationItem1}</li>
                <li className="flex items-center gap-2"><ArrowRight size={14} /> {t.integrationItem2}</li>
                <li className="flex items-center gap-2"><ArrowRight size={14} /> {t.integrationItem3}</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Review & Detailed Info */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">{t.projectDetails}</h2>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-4">
              {[
                { title: lang === 'ko' ? "마케팅 키트 검토" : lang === 'vi' ? "Xem xét bộ Marketing" : "Review Marketing Kit", desc: lang === 'ko' ? "클리닉 파트너를 위해 작성된 새 이메일 템플릿을 검토하세요." : lang === 'vi' ? "Xem xét các mẫu email mới dành cho đối tác phòng khám." : "Review the new email templates we've drafted for your clinic partners.", slug: "apollo-kit" },
                { title: lang === 'ko' ? "품질 체크리스트" : lang === 'vi' ? "Danh mục kiểm tra chất lượng" : "Quality Checklists", desc: lang === 'ko' ? "시스템이 올바르게 작동하는지 확인하기 위해 사용한 단계별 계획을 확인하세요." : lang === 'vi' ? "Xem kế hoạch từng bước được sử dụng để xác minh hệ thống." : "See the step-by-step plan we used to verify your system is working correctly.", slug: "qa-test-plan" },
                { title: lang === 'ko' ? "프로젝트 상태" : lang === 'vi' ? "Trạng thái dự án" : "Project Status", desc: lang === 'ko' ? "완료된 작업과 다음 단계에 대한 간단한 개요입니다." : lang === 'vi' ? "Tổng quan đơn giản về những việc đã hoàn thành và sắp tới." : "A simple overview of what's done and what's coming up next.", slug: "handoff-pack" }
              ].map((doc, i) => (
                <Link href={`/session-report/docs/${doc.slug}`} key={i} className="block">
                  <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-black/5 shadow-sm group hover:border-[#004a99]/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#004a99]/5 flex items-center justify-center text-[#004a99] group-hover:bg-[#004a99] group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-[#646464] font-light">{doc.desc}</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-black/10 group-hover:text-[#004a99] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Status Snapshot */}
        <motion.section variants={itemVariants} className="pt-12 border-t border-black/5">
          <div className="bg-[#111111] text-white p-12 rounded-[2rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-light mb-8 relative z-10">{t.currentStatus}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div>
                <p className="text-[#646464] font-mono text-sm uppercase tracking-widest mb-4">The Result</p>
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                  {t.resultNote}
                </p>
              </div>
              <div>
                <p className="text-[#646464] font-mono text-sm uppercase tracking-widest mb-4">The Next Step</p>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-[#A6C7E7]">
                  {t.nextStepNote}
                </p>
              </div>
            </div>
            <div className="mt-16 flex items-center gap-3 text-sm font-mono text-[#646464]">
              <ShieldCheck size={16} />
              <span>System Security & Verification Complete</span>
            </div>
          </div>
        </motion.section>

      </motion.main>
    </div>
  );
}
