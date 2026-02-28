"use client";

import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { ArrowLeft, FileText, CheckCircle2, Copy } from "lucide-react";
import Link from "next/link";

const DOCS_CONTENT: Record<string, { title: string; content: React.ReactNode }> = {
  "apollo-kit": {
    title: "Marketing Guide: Clinical Partnerships",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">1) Reaching Out to Other Clinics</h3>
          <p className="leading-relaxed">
            We have refined the way you introduce your services to other genetics and metabolism practices. Instead of a generic pitch, we focus on how you solve their biggest headaches—specifically the logistics of home B12 care.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">2) The Outreach Message</h3>
          <div className="bg-white p-6 rounded-xl border border-black/5 leading-relaxed italic text-[#646464]">
            <p>"Are you seeing friction around home B12 administration? We support practices like yours by standardizing this workflow with pre-loaded syringes and direct coordination, so your staff doesn't have to chase the logistics."</p>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">3) Why This Works for You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#EEF5FF] p-5 rounded-xl border border-[#004a99]/10">
              <h4 className="font-medium text-[#004a99] mb-2 text-sm uppercase tracking-wider">Expert Authority</h4>
              <p className="text-sm">We highlight your recent Medicaid approvals in PA and DE to build immediate trust.</p>
            </div>
            <div className="bg-[#EEF5FF] p-5 rounded-xl border border-[#004a99]/10">
              <h4 className="font-medium text-[#004a99] mb-2 text-sm uppercase tracking-wider">Solution-Focused</h4>
              <p className="text-sm">We show them you are a partner that saves them time, not just another pharmacy vendor.</p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  "qa-test-plan": {
    title: "Quality Checklist: Your System Setup",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">1) Ensuring a Smooth Patient Experience</h3>
          <p className="mb-6">We followed a strict process to verify that every part of your booking system is working perfectly before your patients see it.</p>
          <div className="space-y-3">
            {[
              "Verified both New and Returning Patient calendars are active.",
              "Confirmed all patient text and email reminders are ready to send.",
              "Tested all online booking links to ensure they go to the right place.",
              "Ensured your clinic address and phone number appear correctly."
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-black/5">
                <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                <span className="text-sm">{task}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">2) Testing the "Safety Nets"</h3>
          <div className="bg-[#fefce8] p-6 rounded-xl border border-[#fef08a]">
            <p className="text-sm text-[#854d0e] font-medium mb-2">Automated No-Show Recovery</p>
            <p className="text-sm text-[#a16207] leading-relaxed">
              If a patient misses their appointment, the system is designed to automatically wait 30 minutes before sending a friendly invitation to reschedule. We have tested this trigger to ensure no revenue is lost from missed visits.
            </p>
          </div>
        </section>
      </div>
    )
  },
  "handoff-pack": {
    title: "Project Status: Building Your Platform",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">Current Progress</h3>
          <p className="mb-4">We have successfully transitioned from the planning stage to a live, working environment. Here is where we stand:</p>
          <div className="bg-white p-6 rounded-xl border border-black/5 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="font-medium text-sm">Booking Infrastructure</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">100% DONE</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="font-medium text-sm">Automated Reminders</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">100% DONE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Professional Website</span>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-bold">UP NEXT</span>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">What's Next?</h3>
          <p className="leading-relaxed">
            The technical booking foundation is solid. Our next focus is launching your professional website and starting the clinical partnership outreach.
          </p>
        </section>
      </div>
    )
  }
};

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string;
  const doc = DOCS_CONTENT[slug];

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
          <Link href="/session-report" className="text-[#004a99] hover:underline">Back to Report</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans pb-32">
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-black/5"
      >
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/session-report" className="flex items-center gap-2 text-sm text-[#646464] hover:text-[#111111] transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Summary</span>
          </Link>
          <div className="text-xs font-mono uppercase tracking-widest text-[#999999]">Confidential Client Report</div>
        </div>
      </motion.nav>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="pt-32 px-6 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-[#004a99] flex items-center justify-center text-white">
            <FileText size={24} />
          </div>
          <h1 className="text-4xl font-light tracking-tight">{doc.title}</h1>
        </div>

        <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm p-8 md:p-12">
          {doc.content}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-[#111111] rounded-2xl text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-xl font-light mb-2">Ready to move forward?</h3>
            <p className="text-sm text-[#646464]">Your practice is now supported by a fully automated patient care system.</p>
          </div>
          <button className="relative z-10 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-[#F0F0F0] transition-colors group">
            <Copy size={16} className="group-hover:scale-110 transition-transform" />
            <span>Copy Reference Link</span>
          </button>
        </div>
      </motion.main>
    </div>
  );
}
