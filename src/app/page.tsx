"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2,
  Sparkles,
  Zap,
  Droplets,
  Calendar,
  Waves,
  Heart,
  Search,
  ArrowUpRight,
  X
} from "lucide-react";

export default function Home() {
  const [activeBooking, setActiveBooking] = useState<'none' | 'new' | 'return'>('none');

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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight text-[#111111]">
            <Link href="#services" className="hover:text-[#004a99] transition-colors">Treatments</Link>
            <Link href="#why" className="hover:text-[#004a99] transition-colors">Our Difference</Link>
            <Link href="#location" className="hover:text-[#004a99] transition-colors">Location</Link>
            <Link href="/referral" className="hover:text-[#004a99] transition-colors font-mono uppercase text-[10px] tracking-[0.2em] border border-black/10 px-3 py-1 rounded-md">Partners</Link>
            <Link href="#book" className="bg-[#004a99] text-white px-6 py-2.5 rounded-full hover:bg-[#003377] transition-all shadow-lg shadow-blue-900/10 active:scale-95">
              Book Appointment
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <span className="bg-[#EEF5FF] text-[#004a99] text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-[#004a99]/10">
                Opening Soon in Glen Burnie
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-light tracking-tighter text-[#111111] mb-10 leading-[0.9] text-balance">
              Medical <span className="font-medium text-[#004a99]">Integrity.</span> <br/>
              Lifestyle <span className="italic">Wellness.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#646464] font-light leading-relaxed max-w-2xl mb-12 text-balance">
              Experience clinically expert IV infusion therapy tailored to your unique biology. Bridging the gap between medical necessity and daily vitality.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-center">
              <Link href="#book" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#111111] text-white px-12 py-6 rounded-[2rem] text-lg font-medium hover:bg-black transition-all group shadow-xl shadow-black/10">
                Claim Launch Offer
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#services" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white border border-black/5 text-[#111111] px-12 py-6 rounded-[2rem] text-lg font-medium hover:border-[#004a99]/30 transition-all shadow-sm">
                View Menu
              </Link>
            </motion.div>

            {/* Launch Offer Card */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 bg-[#EEF5FF] border border-[#004a99]/10 p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 max-w-2xl"
            >
              <div className="flex items-center gap-4 text-[#004a99]">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Sparkles size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">🔥 Exclusive Launch Offer</span>
                  <p className="text-xl font-medium text-[#111111]">Buy 2 infusions, get 1 <span className="text-[#004a99] underline decoration-2 underline-offset-4 font-bold italic">FREE</span></p>
                </div>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#004a99]/60">Limited Time Only</div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-[20%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#A6C7E7]/20 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#004a99]/5 to-transparent blur-[100px] pointer-events-none" />
      </section>

      {/* Trust Bar */}
      <section className="py-16 border-y border-black/5 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><ShieldCheck size={18} /> USP {'<797>'} Compliant</div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><ShieldCheck size={18} /> ISO 5 Sterile Environment</div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><ShieldCheck size={18} /> MD-Oversight</div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><CheckCircle2 size={18} /> Licensed Clinicians</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 border-b border-black/5 pb-12">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#004a99] mb-6 block font-bold">The Treatment Menu</span>
              <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-[#111111]">Outcome-Driven <br/><span className="italic font-medium">Therapies.</span></h2>
            </div>
            <div className="max-w-xs">
              <p className="text-[#646464] font-light leading-relaxed mb-6">Customized formulations designed for specific health goals, from rapid recovery to cellular repair.</p>
              <div className="h-1 w-12 bg-[#004a99]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Essential Hydration */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#FAFAFA] p-8 rounded-[3rem] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-[#004a99] mb-8 shadow-sm">
                <Waves size={24} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4">Essential Hydration</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">Rapid rehydration for general wellness and recovery. Restores electrolyte balance instantly.</p>
              <div className="text-lg font-mono text-[#111111] font-bold tracking-tight">$165 — $175</div>
            </motion.div>

            {/* Energy & Immunity */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#FAFAFA] p-8 rounded-[3rem] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-[#004a99] mb-8 shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4">Energy & Immunity</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">Formulations to boost vitality and support your body&rsquo;s natural immune defense systems.</p>
              <div className="text-lg font-mono text-[#111111] font-bold tracking-tight">$195 — $215</div>
            </motion.div>

            {/* White Jade & Glow */}
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[3rem] border border-[#004a99]/20 shadow-xl shadow-blue-900/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <Star className="text-[#004a99] fill-[#004a99] animate-pulse" size={16} />
              </div>
              <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-8 shadow-sm">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4 flex items-center gap-2">White Jade & Glow</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">The famous &ldquo;Cinderella&rdquo; drip. High-dose Glutathione for clinical skin brightening and deep detoxification.</p>
              <div className="text-lg font-mono text-[#004a99] font-bold tracking-tight">$225 — $250</div>
              <div className="mt-4 text-[10px] font-mono font-bold uppercase text-[#004a99]">⭐ Korean Market Hero</div>
            </motion.div>

            {/* Advanced Functional */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#FAFAFA] p-8 rounded-[3rem] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-[#008B8B] mb-8 shadow-sm">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4">Advanced Functional</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">Specialized drips (NAD+, Liver Support) targeting cellular repair and biological longevity.</p>
              <div className="text-lg font-mono text-[#111111] font-bold tracking-tight">$275 — $295</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section id="why" className="py-40 px-6 bg-[#111111] text-white overflow-hidden relative rounded-[4rem] mx-6">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="md:w-1/2">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#A6C7E7] mb-8 block font-bold">Why Choose Soleil?</span>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12 leading-[1.1] text-balance">
                High-End <span className="text-[#A6C7E7] italic font-medium">Standards.</span> <br/>
                Boutique <span className="font-medium">Luxury.</span>
              </h2>
              
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-1">01</div>
                  <div>
                    <h4 className="text-xl font-medium mb-3">Vertical Integration</h4>
                    <p className="text-[#646464] font-light leading-relaxed">Partnered with Voshell&rsquo;s Pharmacy for direct sourcing of sterile preparations, ensuring the highest quality control and potency.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-1">02</div>
                  <div>
                    <h4 className="text-xl font-medium mb-3">Sterile Compounding</h4>
                    <p className="text-[#646464] font-light leading-relaxed">Utilizing a USP {'<797>'}-compliant ISO 5 laminar flow hood for hospital-grade sterility that typical med-spas cannot match.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-1">03</div>
                  <div>
                    <h4 className="text-xl font-medium mb-3">Korean-American Specialists</h4>
                    <p className="text-[#646464] font-light leading-relaxed">Culturally tailored protocols including &ldquo;White Jade&rdquo; and &ldquo;Garlic&rdquo; drips, with bilingual care teams specialized in metabolic health.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative aspect-square w-full max-w-[500px]">
              <motion.div 
                animate={{ 
                  y: [0, -30, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[5rem] border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden shadow-2xl shadow-blue-900/20"
              >
                <div className="text-center relative z-10">
                  <Droplets size={100} className="text-[#A6C7E7] mx-auto mb-8 opacity-40 animate-pulse" />
                  <div className="text-7xl font-bold text-[#A6C7E7] mb-2 tracking-tighter">USP {'<797>'}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#646464]">Clinical Sterility Grade</div>
                </div>
                {/* Orbital dots */}
                <div className="absolute inset-0 border border-dashed border-white/5 rounded-full m-12 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 border border-dashed border-white/5 rounded-full m-24 animate-[spin_15s_linear_infinite_reverse]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-48 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#004a99] mb-6 block font-bold">Start Your Journey</span>
            <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-[#111111] mb-8">Secure Your <br/><span className="font-medium text-[#004a99]">Treatment Chair.</span></h2>
            <p className="text-[#646464] text-xl font-light mb-12 max-w-2xl mx-auto">Select a booking type below. All first-time visits include a brief clinical consultation with our Nurse Practitioner.</p>
          </div>
          
          <AnimatePresence mode="wait">
            {activeBooking === 'none' ? (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              >
                <button 
                  onClick={() => setActiveBooking('new')}
                  className="bg-[#FAFAFA] p-10 rounded-[3rem] border border-black/5 hover:border-[#004a99]/20 transition-all flex flex-col items-center text-center group"
                >
                  <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-[#004a99] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Star size={32} />
                  </div>
                  <h3 className="text-2xl font-medium mb-4 text-[#111111]">New Patient</h3>
                  <p className="text-[#646464] font-light text-sm mb-10">Initial consultation + first infusion treatment. (60 min)</p>
                  <div className="w-full bg-[#004a99] text-white py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#003377] transition-all shadow-lg shadow-blue-900/10">
                    Book Consult
                  </div>
                </button>
                <button 
                  onClick={() => setActiveBooking('return')}
                  className="bg-[#FAFAFA] p-10 rounded-[3rem] border border-black/5 hover:border-[#004a99]/20 transition-all flex flex-col items-center text-center group"
                >
                  <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-[#004a99] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Droplets size={32} />
                  </div>
                  <h3 className="text-2xl font-medium mb-4 text-[#111111]">Returning Patient</h3>
                  <p className="text-[#646464] font-light text-sm mb-10">Scheduled treatment follow-up. (75 min)</p>
                  <div className="w-full bg-white border border-black/10 text-[#111111] py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:border-[#004a99] transition-all">
                    Book Treatment
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-4 md:p-8 rounded-[3rem] border border-black/5 shadow-xl shadow-blue-900/5 relative"
              >
                <button 
                  onClick={() => setActiveBooking('none')}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#FAFAFA] text-[#646464] hover:text-[#111111] transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="min-h-[800px] w-full bg-[#FAFAFA] rounded-[2rem] overflow-hidden">
                  {activeBooking === 'new' ? (
                    <iframe 
                      src="https://api.voshellspharmacy.com/widget/booking/vi5Ov0XkJLgD8z8jFWS5" 
                      style={{ width: '100%', height: '800px', border: 'none', overflow: 'hidden' }}
                      scrolling="no" 
                      id="vi5Ov0XkJLgD8z8jFWS5_1772309403783"
                    ></iframe>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[800px] text-center p-12 font-light">
                      <p className="text-lg mb-4">Returning patient booking coming soon.</p>
                      <button onClick={() => setActiveBooking('none')} className="text-[#004a99] underline">Back to selection</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">Need assistance? Call us at <span className="text-[#111111] font-bold">(443) 281-9157</span></p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-32 px-6 bg-[#FAFAFA] border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[4rem] border border-black/5 p-12 md:p-20 flex flex-col md:flex-row gap-16 items-center shadow-sm">
            <div className="md:w-1/2">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#004a99] mb-8 block font-bold">Visit Us</span>
              <h2 className="text-5xl font-light tracking-tight mb-8">Glen Burnie <br/><span className="font-medium">Medical Hub.</span></h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-[#004a99] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-xl font-medium text-[#111111]">801 Landmark Drive</p>
                    <p className="text-[#646464] font-light">Glen Burnie, MD 21061</p>
                    <p className="text-sm text-[#999999] mt-2 italic">Located just 15 mins from BWI & Ellicott City</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-[#004a99] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-[#111111] font-medium">Treatment Hours</p>
                    <p className="text-[#646464] font-light">Mon–Fri: 9am–6pm</p>
                    <p className="text-[#646464] font-light">Sat: 10am–4pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full aspect-video rounded-[3rem] bg-[#EEF5FF] border border-black/5 flex items-center justify-center overflow-hidden group relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl border border-black/5 shadow-xl">
                <Link href="https://maps.google.com" target="_blank" className="flex items-center gap-3 text-[#004a99] font-bold uppercase tracking-widest text-xs">
                  Get Directions <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-20 mb-32">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-10">
                <Image src="/soleil-logo.png" alt="Soleil Logo" width={50} height={50} />
                <span className="font-bold text-2xl tracking-tighter text-[#111111]">SOLEIL INFUSION</span>
              </div>
              <p className="text-[#646464] font-light text-lg leading-relaxed">
                Elevating the standard of clinical wellness in Maryland. Licensed, sterile, and outcome-driven IV therapy solutions powered by Voshell&rsquo;s Pharmacy.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h4 className="font-bold text-[10px] font-mono uppercase tracking-[0.3em] text-[#111111] mb-8">Navigation</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><Link href="#services" className="hover:text-[#004a99] transition-colors">Treatments</Link></li>
                  <li><Link href="#why" className="hover:text-[#004a99] transition-colors">Our Difference</Link></li>
                  <li><Link href="#book" className="hover:text-[#004a99] transition-colors">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[10px] font-mono uppercase tracking-[0.3em] text-[#111111] mb-8">Legal</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><Link href="#" className="hover:text-[#004a99] transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-[#004a99] transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-[#004a99] transition-colors">HIPAA Notice</Link></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold text-[10px] font-mono uppercase tracking-[0.3em] text-[#111111] mb-8">Admin</h4>
                <Link href="/hub" className="inline-flex items-center gap-2 bg-[#FAFAFA] border border-black/5 px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest hover:border-[#004a99]/30 transition-all">
                  Resource Hub <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-40 grayscale">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Encrypted & Secure</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] font-medium">© 2026 SOLEIL INFUSION LLC. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
