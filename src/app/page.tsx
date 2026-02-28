"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  Droplets,
  Heart
} from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#646464] font-sans selection:bg-[#004a99] selection:text-white">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-[100] border-b border-black/5 bg-white/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/soleil-logo.png" 
              alt="Soleil Infusion Logo" 
              width={45} 
              height={45} 
              className="object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-[#111111]">
              <span className="text-[#004a99]">SOLEIL</span> INFUSION
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight">
            <Link href="#services" className="hover:text-[#004a99] transition-colors">Services</Link>
            <Link href="#clinical" className="hover:text-[#004a99] transition-colors">Clinical Integrity</Link>
            <Link href="/referral" className="hover:text-[#004a99] transition-colors font-mono uppercase text-[10px] tracking-[0.2em]">Partner Portal</Link>
            <Link href="#book" className="bg-[#004a99] text-white px-6 py-2.5 rounded-full hover:bg-[#003377] transition-all shadow-lg shadow-blue-900/10 active:scale-95">
              Book Appointment
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#004a99]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#004a99]">Medical Grade Wellness</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-light tracking-tight text-[#111111] mb-8 leading-[0.95]">
              Redefining the <br/>
              <span className="font-medium text-[#004a99] italic">Infusion Experience.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#646464] font-light leading-relaxed max-w-2xl mb-12 text-balance">
              Pharmaceutical integrity meets boutique hospitality. Advanced hydration and outcome-driven therapies delivered in a clinical setting you&rsquo;ll actually enjoy.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link href="#services" className="flex items-center justify-center gap-3 bg-[#111111] text-white px-10 py-5 rounded-[2rem] text-lg font-medium hover:bg-black transition-all group">
                View Treatment Menu
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#book" className="flex items-center justify-center gap-3 bg-white border border-black/5 text-[#111111] px-10 py-5 rounded-[2rem] text-lg font-medium hover:border-[#004a99]/30 transition-all shadow-sm">
                Reserve Your Chair
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Visual Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 right-[-10%] w-[600px] h-[600px] pointer-events-none hidden lg:block"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#A6C7E7] to-transparent blur-[100px]" />
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-12 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"><ShieldCheck size={16} /> USP {'<797>'} Compliant</div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"><ShieldCheck size={16} /> ISO 5 Sterile Environment</div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"><ShieldCheck size={16} /> MD-Oversight</div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"><ShieldCheck size={16} /> Licensed Clinicians</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#004a99] mb-4 block">The Treatment Menu</span>
              <h2 className="text-5xl font-light tracking-tight text-[#111111]">Targeted <span className="italic font-medium">Outcomes.</span></h2>
            </div>
            <p className="text-[#646464] font-light max-w-sm">Every drip is compounded on-site to ensure the highest bioavailability and potency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* White Jade */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A6C7E7]/10 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="h-14 w-14 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-8">
                <Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-medium text-[#111111] mb-4">White Jade & Glow</h3>
              <p className="text-sm font-light leading-relaxed mb-8">The ultimate clinical brightening treatment featuring high-dose Glutathione for cellular detoxification and skin radiance.</p>
              <div className="text-xl font-mono text-[#111111]">$225 — $250</div>
            </motion.div>

            {/* Performance */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#004a99]/5 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="h-14 w-14 rounded-2xl bg-[#F0F7FF] flex items-center justify-center text-[#004a99] mb-8">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-medium text-[#111111] mb-4">Peak Performance</h3>
              <p className="text-sm font-light leading-relaxed mb-8">Designed for athletes and high-performers. Accelerates recovery, restores electrolytes, and boosts muscular endurance.</p>
              <div className="text-xl font-mono text-[#111111]">$195 — $215</div>
            </motion.div>

            {/* Advanced Functional */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#008B8B]/5 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="h-14 w-14 rounded-2xl bg-[#E6F4F4] flex items-center justify-center text-[#008B8B] mb-8">
                <Droplets size={28} />
              </div>
              <h3 className="text-2xl font-medium text-[#111111] mb-4">Advanced Functional</h3>
              <p className="text-sm font-light leading-relaxed mb-8">Specialized protocols including NAD+ and Liver Support. Targeting longevity and cellular repair at the root level.</p>
              <div className="text-xl font-mono text-[#111111]">$275 — $295</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Clinical Integrity Section */}
      <section id="clinical" className="py-32 bg-[#111111] text-white overflow-hidden relative rounded-[4rem] mx-6">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A6C7E7] mb-6 block">Pharmacy Grade Facility</span>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
                Medical <br/>
                <span className="font-medium text-[#A6C7E7]">Integrity</span> <br/>
                Redefined.
              </h2>
              <p className="text-[#646464] text-xl font-light leading-relaxed mb-12">
                Unlike traditional "drip bars," Soleil Infusion is vertically integrated with a licensed compounding pharmacy. We don't use pre-mixed bags. Every dose is prepared fresh in our ISO 5 sterile environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#A6C7E7] mt-1 flex-shrink-0" />
                  <span>Licensed 503A Compounding Partner</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#A6C7E7] mt-1 flex-shrink-0" />
                  <span>ISO 5 Sterile Hood Preparation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#A6C7E7] mt-1 flex-shrink-0" />
                  <span>Maryland Board of Pharmacy Compliant</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#A6C7E7] mt-1 flex-shrink-0" />
                  <span>Outcome-Validated Protocols</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden"
              >
                <Droplets size={120} className="text-[#A6C7E7] opacity-20 absolute" />
                <div className="relative text-center">
                  <div className="text-8xl font-bold text-[#A6C7E7] mb-2 tracking-tighter italic">99.9%</div>
                  <div className="text-xs font-mono uppercase tracking-[0.4em] text-[#646464]">Sterility Guaranteed</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#004a99] mb-6 block">Ready to Begin?</span>
          <h2 className="text-5xl font-light tracking-tight text-[#111111] mb-8">Secure Your <span className="font-medium">Infusion Chair.</span></h2>
          <p className="text-[#646464] text-lg font-light mb-12">Select your treatment type below to view availability.</p>
          
          <div className="bg-white p-4 md:p-8 rounded-[3rem] border border-black/5 shadow-xl shadow-blue-900/5 overflow-hidden">
            <div className="min-h-[600px] w-full flex flex-col items-center justify-center bg-[#FAFAFA] rounded-[2rem] border border-dashed border-black/10">
              <Calendar size={48} className="text-[#EEEEEE] mb-6" />
              <p className="text-[#999999] font-mono text-[10px] uppercase tracking-widest mb-2">[ GHL CALENDAR EMBED ]</p>
              <div className="flex flex-col gap-3 mt-4">
                <Link href="#" className="bg-[#004a99] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#003377] transition-all">
                  New Patient Consultation
                </Link>
                <Link href="#" className="bg-white border border-black/5 text-[#111111] px-8 py-3 rounded-full text-sm font-medium hover:border-[#004a99]/30 transition-all">
                  Return Patient Treatment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Image src="/soleil-logo.png" alt="Soleil Logo" width={40} height={40} />
                <span className="font-bold text-lg tracking-tight text-[#111111]">SOLEIL INFUSION</span>
              </div>
              <p className="text-[#646464] font-light text-sm max-w-sm leading-relaxed">
                Elevating the standard of clinical wellness in Maryland. Licensed, sterile, and outcome-driven IV therapy solutions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-[#111111] mb-6">Location</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-center gap-3"><MapPin size={16} className="text-[#004a99]" /> 801 Landmark Drive, Glen Burnie, MD</li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-[#004a99]" /> (443) 281-9157</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#111111] mb-6">Hours</h4>
              <ul className="space-y-4 text-sm font-light">
                <li>Mon–Fri: 9am–6pm</li>
                <li>Sat: 10am–4pm</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">© 2026 Soleil Infusion LLC. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">
              <Link href="#" className="hover:text-[#004a99] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#004a99] transition-colors">Terms of Service</Link>
              <Link href="/hub" className="hover:text-[#004a99] transition-colors">Admin Hub</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
