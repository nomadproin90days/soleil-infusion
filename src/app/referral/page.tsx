"use client";

import Image from "next/image";
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

export default function ReferralKit() {
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
            <div className="relative w-[52px] h-[52px]">
              <Image 
                src="/soleil-logo.png" 
                alt="Soleil Logo" 
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#111111] leading-none mb-1">
                <span className="text-[#004a99]">SOLEIL</span> INFUSION
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50">Partner Program</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/hub" className="text-xs font-mono uppercase tracking-widest text-[#646464] hover:text-[#111111] transition-colors">
              Partner Hub
            </Link>
            <a href="#refer" className="bg-[#004a99] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#003377] transition-colors">
              Refer a Patient
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#646464]">Clinical Partnership Program</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-balance">
          A specialized extension of <br/>
          <span className="font-medium text-[#004a99]">your care team.</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#646464] max-w-3xl mx-auto leading-relaxed font-light">
          We handle sterile compounding and logistical coordination for your patients, allowing your team to focus purely on clinical outcomes.
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
            <h3 className="text-xl font-medium mb-3 text-balance">Clinical Integrity</h3>
            <p className="text-[#646464] font-light text-sm leading-relaxed">
              All compounding is performed under strict USP {'<797>'} standards in our ISO 5 sterile lab environment.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3 text-balance">Patient Coordination</h3>
            <p className="text-[#646464] font-light text-sm leading-relaxed">
              We manage the end-to-end logistics: from insurance verification and payment to home delivery and reminders.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-6">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3 text-balance">Bilingual Education</h3>
            <p className="text-[#646464] font-light text-sm leading-relaxed">
              Culturally resonant care with bilingual instruction kits (EN/ES/KR) to ensure 100% adherence for diverse populations.
            </p>
          </div>
        </motion.section>

        {/* Home B12 Workflow */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[#004a99] mb-4">Case Study</div>
            <h2 className="text-4xl font-light mb-6 tracking-tight">Home B12 <br/><span className="font-medium">Administration</span></h2>
            <p className="text-[#646464] font-light leading-relaxed mb-8">
              We support genetics and metabolism practices by standardizing the B12 home-injection workflow. No more multi-dose vial risks or caregiver confusion.
            </p>
            <ul className="space-y-4">
              {[
                "Pre-loaded single-dose syringes",
                "Step-by-step bilingual instructions",
                "Automated refill coordination",
                "Direct contact for caregiver questions"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-light">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7 bg-[#111111] rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent" />
            <h3 className="text-2xl font-light mb-8 relative z-10">The Refill Pathway</h3>
            <div className="space-y-6 relative z-10 font-mono text-xs uppercase tracking-[0.1em]">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">1</div>
                <div className="flex-1 pb-4 border-b border-white/10">Refill Due (System Alert)</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">2</div>
                <div className="flex-1 pb-4 border-b border-white/10">We Verify Active Rx</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-[#A6C7E7] border-[#A6C7E7]">3</div>
                <div className="flex-1 pb-4 border-b border-white/10 text-[#A6C7E7]">Direct-to-Patient Shipping</div>
              </div>
            </div>
            <p className="mt-12 text-sm text-[#646464] font-light italic">
              "No phone tag. No chasing logistics. One pathway."
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
            <h2 className="text-4xl font-light mb-6 tracking-tight">Expanded Coverage for <span className="font-medium text-[#004a99]">Mid-Atlantic Families</span></h2>
            <p className="text-[#4F7190] text-lg leading-relaxed mb-10 font-light text-balance">
              We are proud to support patients across state lines with recent approvals for Delaware and Pennsylvania Medicaid, ensuring high-end care is accessible to all.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Maryland", "Pennsylvania", "Delaware", "DC (Pending)"].map((state, i) => (
                <div key={i} className="bg-white px-4 py-3 rounded-xl border border-[#004a99]/10 text-center text-xs font-medium uppercase tracking-wider text-[#004a99]">
                  {state}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Referral Form Section */}
        <motion.section id="refer" variants={itemVariants} className="text-center py-20">
          <h2 className="text-4xl font-light mb-6 tracking-tight">Start a <span className="font-medium text-[#004a99]">Partnership</span></h2>
          <p className="text-[#646464] font-light max-w-xl mx-auto mb-12">
            Complete the secure, HIPAA-compliant form below to begin the clinical onboarding process or refer your first patient.
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
            <script src="https://api.voshellspharmacy.com/js/form_embed.js" async></script>
          </div>
        </motion.section>

        {/* Contact info */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-20 border-t border-black/5">
          <div>
            <h3 className="text-xl font-medium mb-6">Direct Clinician Support</h3>
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
                <span className="text-sm font-light italic">Rx changes confirmed within 1 business day.</span>
              </div>
            </div>
          </div>
          <div className="bg-[#111111] p-10 rounded-[2rem] text-white">
            <h3 className="text-lg font-light mb-4">Are you a patient?</h3>
            <p className="text-[#646464] text-sm font-light mb-8">
              Explore our boutique IV therapy services and book your visit online.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-[#A6C7E7] hover:text-white transition-colors group">
              <span>Visit Soleil Infusion</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>
      </motion.main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-black/5 z-[100] py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">
          <span>© 2026 Soleil Infusion Partnership Program</span>
          <div className="flex gap-6">
            <Link href="/hub" className="hover:text-[#004a99] transition-colors flex items-center gap-1">
              Resource Hub <ArrowUpRight size={10} />
            </Link>
            <Link href="/session-report" className="hover:text-[#004a99] transition-colors flex items-center gap-1">
              Latest Report <ArrowUpRight size={10} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
