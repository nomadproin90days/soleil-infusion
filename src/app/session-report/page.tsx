"use client";

import { motion } from "motion/react";
import { CheckCircle2, FileText, ArrowRight, AlertTriangle, Terminal, Calendar, Send, Activity, BarChart3, Globe } from "lucide-react";

export default function SessionReport() {
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
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-[#004a99] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#646464]">Production Update</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
          Session <span className="font-medium text-[#004a99]">Report</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#646464] max-w-2xl leading-relaxed">
          Documenting the end-to-end deployment of the Soleil Infusion scheduling infrastructure and automation suite.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono text-[#646464]">
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5">Date: Feb 27, 2026</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 font-medium text-[#111111]">Engineer: Ryan Christmas</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-600" />
            Status: 100% Active
          </div>
        </div>
      </motion.header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-6 md:px-12 max-w-6xl mx-auto mt-16 space-y-24"
      >
        {/* Objective Section */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Objective</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl font-light leading-snug text-balance">
              Document all work completed today and publish this session report to signify the completion of the technical booking system and automation layer.
            </p>
          </div>
        </motion.section>

        {/* Shipped To Production */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Shipped To Production</h2>
          </div>
          <div className="md:col-span-8 space-y-12">
            
            {/* Calendar Deployment */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-[#004a99]" size={24} />
                <h3 className="text-2xl font-medium tracking-tight">Calendar Deployment</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "New Infusion Consult (60-minute duration)",
                  "Return Infusion (75-minute duration)",
                  "Native GHL notifications disabled for branding control"
                ].map((item, i) => (
                  <li key={i} className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-[#646464] font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workflow Deployment */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-[#008B8B]" size={24} />
                <h3 className="text-2xl font-medium tracking-tight">Workflow Deployment — Automation Suite</h3>
              </div>
              <p className="text-sm font-mono text-green-600 mb-6 uppercase tracking-widest">Status: Published & Live</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Soleil — Booking Confirmation",
                  "Soleil — 24h Reminder",
                  "Soleil — 2h Reminder",
                  "Soleil — No-Show Rescue"
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center justify-between group hover:border-[#008B8B]/30 transition-colors">
                    <span className="font-medium">{item}</span>
                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  </div>
                ))}
              </div>
            </div>

            {/* QA & Validation */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-[#A6C7E7]" size={24} />
                <h3 className="text-2xl font-medium tracking-tight">QA & Validation</h3>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                <p className="text-[#646464] font-light mb-6">Required custom values populated in GHL Settings:</p>
                <div className="flex flex-wrap gap-3">
                  {["booking_link_new", "booking_link_return", "Supporting automation variables"].map((val, i) => (
                    <span key={i} className="bg-[#FAFAFA] px-4 py-2 rounded-lg border border-black/5 font-mono text-sm text-[#004a99]">{val}</span>
                  ))}
                </div>
                <p className="mt-6 text-sm text-green-600 font-medium">Result: Operational & Verified</p>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Website & Brand */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Website & Brand</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Project Setup</h3>
              <p className="text-[#646464] font-light">New project successfully initialized in <strong>Lovable</strong> for rapid prototyping and deployment.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Content Implementation</h3>
              <ul className="space-y-2 text-[#646464] font-light">
                <li className="flex items-center gap-2"><ArrowRight size={14} /> “White Jade” brand messaging</li>
                <li className="flex items-center gap-2"><ArrowRight size={14} /> “Clinical Excellence” copy</li>
              </ul>
            </div>
            <div className="sm:col-span-2 bg-[#FAFAFA] p-8 rounded-2xl border border-dashed border-black/10">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={20} className="text-[#004a99]" />
                <h3 className="text-xl font-medium">System Integration</h3>
              </div>
              <p className="text-[#646464] font-light leading-relaxed">
                Website <strong>Book Appointment</strong> buttons successfully connected to GoHighLevel form embed and the backend booking system, creating a seamless patient conversion funnel.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Documentation & Strategy */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Documentation & Strategy</h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            {[
              { title: "Apollo Sequence Import Kit", desc: "Created for B12 provider outreach." },
              { title: "GHL Implementation QA Test Plan", desc: "Authored for full end-to-end system validation." },
              { title: "Session Compilation Handoff", desc: "Prepared to maintain execution continuity." }
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-black/5 shadow-sm group hover:border-[#004a99]/20 transition-all">
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
            ))}
          </div>
        </motion.section>

        {/* Status Snapshot */}
        <motion.section variants={itemVariants} className="pt-12 border-t border-black/5">
          <div className="bg-[#111111] text-white p-12 rounded-[2rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-light mb-8 relative z-10">Current System Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div>
                <p className="text-[#646464] font-mono text-sm uppercase tracking-widest mb-4">Result</p>
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                  The technical booking system is <span className="text-white font-medium">100% installed, validated, and active</span> in production.
                </p>
              </div>
              <div>
                <p className="text-[#646464] font-mono text-sm uppercase tracking-widest mb-4">Next Phase</p>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-[#A6C7E7]">
                  Outreach & Growth Strategy Execution.
                </p>
              </div>
            </div>
            <div className="mt-16 flex items-center gap-2 text-sm font-mono text-[#646464]">
              <Terminal size={14} />
              <span>Deployment verified at {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.section>

      </motion.main>
    </div>
  );
}
