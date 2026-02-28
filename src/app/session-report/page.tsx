"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2, FileText, ArrowRight, ShieldCheck, Calendar, Send, Clock, BarChart3, Laptop } from "lucide-react";

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
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Image src="/soleil-logo.png" alt="Soleil Logo" width={40} height={40} />
            <span className="font-bold text-lg tracking-tight text-[#111111]">SOLEIL INFUSION</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#004a99] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#646464]">Progress Report</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
          Session <span className="font-medium text-[#004a99]">Summary</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#646464] max-w-2xl leading-relaxed">
          Your patient booking system is now live. We have completed the setup for your online calendars, automated reminders, and the internal coordination infrastructure.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono text-[#646464]">
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 text-[#111111]">Feb 27, 2026</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 font-medium text-[#111111]">Project: Soleil Infusion</div>
          <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-black/5 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-600" />
            Status: Fully Operational
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
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Executive Summary</h2>
          </div>
          <div className="md:col-span-8 prose prose-lg">
            <p className="text-2xl font-light leading-snug text-balance">
              Today, we successfully moved your booking system from the planning stage into a <span className="font-medium text-[#004a99]">fully working tool</span>. 
            </p>
            <p className="text-xl text-[#646464] leading-relaxed mt-6 font-light">
              Your patients can now book their own appointments online, and your clinic will automatically keep them informed via text and email. This removes the administrative burden from your staff while ensuring every patient feels well-cared for from the moment they book.
            </p>
          </div>
        </motion.section>

        {/* Shipped To Production */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">The Results</h2>
          </div>
          <div className="md:col-span-8 space-y-12">
            
            {/* Calendar & Booking */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-[#004a99]" size={24} />
                <h3 className="text-2xl font-medium tracking-tight">Automated Patient Booking</h3>
              </div>
              <p className="text-[#646464] font-light mb-6">We have set up two specialized calendars to handle your patient volume:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                  <h4 className="font-medium mb-2">New Patient Consultations</h4>
                  <p className="text-[#646464] font-light">A 60-minute window for first-time visitors, including their intake forms.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                  <h4 className="font-medium mb-2">Returning Patients</h4>
                  <p className="text-[#646464] font-light">A 75-minute treatment window for regular clients, optimized for care quality.</p>
                </div>
              </div>
            </div>

            {/* The Follow-Up System */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-[#008B8B]" size={24} />
                <h3 className="text-2xl font-medium tracking-tight">The "No-Show" Prevention System</h3>
              </div>
              <p className="text-[#646464] font-light mb-6">Your system now handles all patient communication automatically, saving hours of staff time each week:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Instant Confirmation", desc: "Text & email sent immediately after booking." },
                  { name: "24-Hour Reminder", desc: "Final confirmation sent one day before." },
                  { name: "2-Hour Nudge", desc: "A quick text reminder as they prepare to leave." },
                  { name: "No-Show Recovery", desc: "Automatic follow-up if a patient misses a visit." }
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
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Growth & Partnerships</h2>
          </div>
          <div className="md:col-span-8">
            <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <Send className="text-[#A6C7E7]" size={24} />
                <h3 className="text-xl font-medium">Clinic Partnership Strategy</h3>
              </div>
              <p className="text-[#646464] font-light leading-relaxed">
                We have refined how we approach other medical clinics. Instead of just introducing your services, we are positioning Soleil as a solution to their biggest headaches (like B12 home-care logistics). This will make it much easier for them to say "Yes" to a partnership.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-[#EEF5FF] rounded-lg text-[#004a99] text-xs font-mono uppercase tracking-widest">Medicaid Expansion Included</div>
                <div className="px-4 py-2 bg-[#EEF5FF] rounded-lg text-[#004a99] text-xs font-mono uppercase tracking-widest">Professional Outreach Ready</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Future Roadmap */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">What's Next</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Upcoming: Professional Website</h3>
              <p className="text-[#646464] font-light text-balance">Now that the booking system is live, our next priority is launching your public-facing website. This will include your "White Jade" branding and "Medical Integrity" messaging.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Integration & Content</h3>
              <ul className="space-y-2 text-[#646464] font-light">
                <li className="flex items-center gap-2"><ArrowRight size={14} /> Building the public site layout</li>
                <li className="flex items-center gap-2"><ArrowRight size={14} /> Writing high-end patient content</li>
                <li className="flex items-center gap-2"><ArrowRight size={14} /> Connecting the "Book" buttons live</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Review & Detailed Info */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#646464] sticky top-8">Project Details</h2>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-4">
              {[
                { title: "Review Marketing Kit", desc: "Review the new email templates we've drafted for your clinic partners.", slug: "apollo-kit" },
                { title: "Quality Checklists", desc: "See the step-by-step plan we used to verify your system is working correctly.", slug: "qa-test-plan" },
                { title: "Project Status", desc: "A simple overview of what's done and what's coming up next.", slug: "handoff-pack" }
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
            <h2 className="text-3xl md:text-5xl font-light mb-8 relative z-10">Current Project Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div>
                <p className="text-[#646464] font-mono text-sm uppercase tracking-widest mb-4">The Result</p>
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                  Your booking system is <span className="text-white font-medium">100% installed and active</span>. Everything is verified and ready for your first patients.
                </p>
              </div>
              <div>
                <p className="text-[#646464] font-mono text-sm uppercase tracking-widest mb-4">The Next Step</p>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-[#A6C7E7]">
                  Start growing your practice with the new partnership strategy.
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
