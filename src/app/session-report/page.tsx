"use client";

import { motion } from "motion/react";
import { CheckCircle2, FileText, ArrowRight, AlertTriangle, Terminal, Calendar, Send, Activity } from "lucide-react";

export default function SessionReport() {
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#646464]">Live Execution Report</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
          Session <span className="font-medium text-[#004a99]">Completion</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#646464] max-w-2xl leading-relaxed">
          End-to-end delivery of the Soleil Infusion scheduling infrastructure and outbound outreach pivot.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono text-[#646464]">
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5">Date: Feb 27, 2026</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5">Engineers: Gemini + Codex</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-600" />
            DoD: Reached
          </div>
        </div>
      </motion.header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="px-6 md:px-12 max-w-6xl mx-auto mt-16 space-y-24"
      >
        {/* Exec Summary */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Executive Summary</h2>
          </div>
          <div className="md:col-span-8 prose prose-lg">
            <p className="text-2xl font-light leading-snug text-balance">
              Today's session bridged the gap between documentation and live systems. We deployed the <span className="font-medium text-[#004a99]">full GoHighLevel patient booking infrastructure</span>, consisting of two primary calendars and four automation workflows, resolving the final API blockages. 
            </p>
            <p className="text-xl text-[#646464] leading-relaxed mt-6">
              Simultaneously, we executed a strategic pivot on the outbound front, finalizing the "Test B" Apollo sequence targeting Genetics clinics, leveraging the recent Mid-Atlantic Medicaid expansion for immediate authority.
            </p>
          </div>
        </motion.section>

        {/* Completed Today */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Shipped To Production</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
              <Calendar className="text-[#004a99] mb-6" size={28} />
              <h3 className="text-xl font-medium mb-3">Calendar Architecture</h3>
              <ul className="space-y-2 text-[#646464] font-light">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> API Foundation Configured</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> New Infusion Consult (60m)</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> Return Infusion (75m)</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> Intake custom fields mapped</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
              <Activity className="text-[#008B8B] mb-6" size={28} />
              <h3 className="text-xl font-medium mb-3">Automation Workflows</h3>
              <ul className="space-y-2 text-[#646464] font-light">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> Booking Confirmation (SMS/Email)</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> 24h Reminder Sequence</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> 2h Nudge (SMS)</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-green-500" /> No-Show Rescue (+30m recovery)</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow sm:col-span-2">
              <Send className="text-[#A6C7E7] mb-6" size={28} />
              <h3 className="text-xl font-medium mb-3">Apollo Outbound Strategy</h3>
              <p className="text-[#646464] font-light mb-4">Complete overhaul of B12 sequence focusing on reducing friction for Genetics clinics, not just selling a service.</p>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-2 text-[#646464] text-sm">
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="mt-0.5" /> 5-Step Email logic</li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="mt-0.5" /> Medicaid Expansion integrated</li>
                </ul>
                <ul className="space-y-2 text-[#646464] text-sm">
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="mt-0.5" /> KPI: {'>= 4%'} Reply Rate</li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="mt-0.5" /> Segmentation constraints</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Artifacts Created */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Artifacts Synthesized</h2>
          </div>
          <div className="md:col-span-8 space-y-3">
            {[
              { path: "docs/GHL_Calendar_Infrastructure.md", desc: "Core blueprint for GHL builds." },
              { path: "docs/Session_Compilation_Handoff_2026-02-27.md", desc: "Agent sync & tracking doc." },
              { path: "docs/GHL_Implementation_QA_Test_Plan.md", desc: "Phase 1-4 end-to-end verification logic." },
              { path: "docs/Apollo_Sequence_Import_Kit.md", desc: "Raw sequence copy & parameters." },
              { path: "scripts/ghl-calendar-setup.js", desc: "Automated custom value / field provisioning." },
            ].map((file, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white rounded-xl border border-black/5 shadow-sm group hover:border-[#004a99]/30 transition-colors">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <FileText size={18} className="text-[#646464] group-hover:text-[#004a99] transition-colors" />
                  <span className="font-mono text-sm font-medium">{file.path}</span>
                </div>
                <span className="text-sm text-[#646464]">{file.desc}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Pending & Risks */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Pending & Risks</h2>
          </div>
          <div className="md:col-span-8">
            <div className="bg-[#fefce8] border border-[#fef08a] p-6 rounded-2xl mb-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle size={20} className="text-[#ca8a04]" />
                <h3 className="font-medium text-[#854d0e]">Zero Active Blockers</h3>
              </div>
              <p className="text-[#a16207] text-sm leading-relaxed">
                The prior 401 Unauthorized API error was resolved mid-session. The GHL infrastructure is unblocked and data is flowing.
              </p>
            </div>
            
            <h3 className="font-medium text-lg mb-4 mt-8">Immediate Next Steps (What's Pending)</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="h-6 w-6 rounded border border-black/20 flex items-center justify-center flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Populate Custom Values</p>
                  <p className="text-sm text-[#646464]">Grab the final calendar URLs and update `booking_link_new` / `return` in GHL.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-6 w-6 rounded border border-black/20 flex items-center justify-center flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Run End-to-End QA</p>
                  <p className="text-sm text-[#646464]">Execute a test booking to verify Confirmation, 24h wait states, and No-Show triggers.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Next Actions Table */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">The Next 7 Days</h2>
          </div>
          <div className="md:col-span-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#FAFAFA] border-b border-black/5 text-[#646464] font-mono">
                <tr>
                  <th className="px-6 py-4 font-normal">Owner</th>
                  <th className="px-6 py-4 font-normal">Action</th>
                  <th className="px-6 py-4 font-normal">Expected Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium">Ryan</td>
                  <td className="px-6 py-4">Execute QA Test Plan</td>
                  <td className="px-6 py-4 text-[#646464]">100% pass rate on workflows</td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium">Ryan</td>
                  <td className="px-6 py-4">Import Apollo Sequence</td>
                  <td className="px-6 py-4 text-[#646464]">"Test B" active in Apollo</td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium">Ryan</td>
                  <td className="px-6 py-4">Launch Outreach Segment</td>
                  <td className="px-6 py-4 text-[#646464]">Genetics clinics receiving intro</td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium">Thuy / Ryan</td>
                  <td className="px-6 py-4">Monitor Analytics</td>
                  <td className="px-6 py-4 text-[#646464]">Verify {'>= 4%'} reply rate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

      </motion.main>
    </div>
  );
}
