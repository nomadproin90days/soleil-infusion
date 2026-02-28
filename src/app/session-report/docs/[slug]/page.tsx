"use client";

import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, CheckCircle2, Copy } from "lucide-react";
import Link from "next/link";

const DOCS_CONTENT: Record<string, { title: string; content: React.ReactNode }> = {
  "apollo-kit": {
    title: "Apollo Sequence Import Kit",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">1) Sequence Settings</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Name:</strong> B12 Provider Outreach — v2</li>
            <li><strong>Segment:</strong> Genetics / Metabolism clinics</li>
            <li><strong>Cap:</strong> 30–50/day</li>
            <li><strong>Window:</strong> Tue–Thu, 8:30 AM–3:30 PM</li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">2) Step 1 — The Outcome Hook</h3>
          <div className="bg-white p-6 rounded-xl border border-black/5 font-mono text-sm leading-relaxed">
            <p className="mb-4 text-[#004a99]">Subject: B12 home-use workflow at {"{{company}}"}</p>
            <p>Hi {"{{first_name}}"},</p>
            <p className="mt-4">Are you still seeing friction around home B12 administration (prep consistency, caregiver confusion, or refill coordination)?</p>
            <p className="mt-4">We support genetics/metabolism practices by standardizing this workflow with pre-loaded syringes and direct coordination.</p>
            <p className="mt-4">Would Tuesday 11:30am ET work for a 10-minute intro?</p>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">3) Performance Targets</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#EEF5FF] p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#004a99]">4%</div>
              <div className="text-[10px] uppercase tracking-wider">Reply Rate</div>
            </div>
            <div className="bg-[#EEF5FF] p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#004a99]">1.5%</div>
              <div className="text-[10px] uppercase tracking-wider">Pos. Reply</div>
            </div>
            <div className="bg-[#EEF5FF] p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#004a99]">0.8%</div>
              <div className="text-[10px] uppercase tracking-wider">Booked</div>
            </div>
          </div>
        </section>
      </div>
    )
  },
  "qa-test-plan": {
    title: "GHL Implementation QA Test Plan",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">Phase 1: Infrastructure Verification</h3>
          <div className="space-y-3">
            {[
              "Confirm New Infusion (60m) and Return Infusion (75m) exist.",
              "Verify ALL native notifications are UNCHECKED.",
              "Confirm booking_link_new/return resolve to live URLs.",
              "Verify Appointment-Scheduled and No-Show tags exist."
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-black/5">
                <div className="h-5 w-5 rounded border border-black/10 flex-shrink-0" />
                <span className="text-sm">{task}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">Phase 3: Workflow Trigger Testing</h3>
          <div className="bg-[#fefce8] p-6 rounded-xl border border-[#fef08a]">
            <p className="text-sm text-[#854d0e] font-medium mb-2">No-Show Rescue Test</p>
            <ol className="list-decimal pl-5 text-sm space-y-2 text-[#a16207]">
              <li>Change test appt status to "No Show".</li>
              <li>Wait 31 Minutes (Workflow D delay).</li>
              <li>Verify receipt of Rescue SMS.</li>
              <li>Verify CRM task creation for follow-up.</li>
            </ol>
          </div>
        </section>
      </div>
    )
  },
  "handoff-pack": {
    title: "Session Compilation Handoff",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">1) Session Outcome</h3>
          <p className="mb-4 italic">"Bridged the gap between documentation and live systems."</p>
          <div className="bg-white p-6 rounded-xl border border-black/5">
            <h4 className="font-medium mb-2 text-sm">Primary Deliverables</h4>
            <ul className="text-sm space-y-1">
              <li>• docs/GHL_Calendar_Infrastructure.md</li>
              <li>• docs/Apollo_Sequence_Import_Kit.md</li>
              <li>• workflows/ (All 4 Patient Workflows Live)</li>
            </ul>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">2) Definition of Done Status</h3>
          <div className="space-y-2">
            {[
              { label: "Calendars live and publicly bookable", done: true },
              { label: "Workflows published and verified", done: true },
              { label: "Templates active in production", done: true },
              { label: "Custom values resolve in every message", done: true },
              { label: "QA evidence exists for paths", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.done ? <CheckCircle2 size={16} className="text-green-500" /> : <div className="h-4 w-4 rounded-full border border-black/10" />}
                <span className={`text-sm ${item.done ? "text-[#111111]" : "text-[#999999]"}`}>{item.label}</span>
              </div>
            ))}
          </div>
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
            <span>Back to Session Report</span>
          </Link>
          <div className="text-xs font-mono uppercase tracking-widest text-[#999999]">Confidential Strategy Doc</div>
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
            <h3 className="text-xl font-light mb-2">Ready for Implementation?</h3>
            <p className="text-sm text-[#646464]">This document has been validated against the production GHL build.</p>
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
