"use client";

import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { ArrowLeft, FileText, CheckCircle2, Copy, BarChart3, ShieldCheck } from "lucide-react";
import Link from "next/link";

const DOCS_CONTENT: Record<string, { title: string; content: React.ReactNode }> = {
  "dashboard-setup": {
    title: "Dashboard Setup Guide",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">How to Track Your Clinic&apos;s Success</h3>
          <p className="leading-relaxed">
            We use GoHighLevel&apos;s internal &ldquo;Dashboard&rdquo; and &ldquo;Reporting&rdquo; tabs to monitor how many patients are booking and showing up for their infusions.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">Key Reporting Screens</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-black/5">
              <div className="flex items-center gap-2 mb-2 font-medium text-[#111111]">
                <Calendar size={16} className="text-[#004a99]" />
                Appointment Report
              </div>
              <p className="text-sm">Tracks your <strong>Show Rate</strong> and <strong>No-Show Rate</strong> automatically. Target: Keep no-shows below 20%.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-black/5">
              <div className="flex items-center gap-2 mb-2 font-medium text-[#111111]">
                <Users size={16} className="text-[#004a99]" />
                Attribution Report
              </div>
              <p className="text-sm">Shows which clinics are sending you the most referrals and how well they convert.</p>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">The &ldquo;Control Tower&rdquo; Dashboard</h3>
          <p className="text-sm mb-4 italic text-[#646464]">We recommend adding these visual widgets to your main GHL screen:</p>
          <ul className="space-y-3">
            {[
              "Appointment Snapshot (Pie chart showing Shows vs No-Shows)",
              "Referral Pipeline Value (The total value of clinical partners being onboarded)",
              "Lead Source Breakdown (Website vs. Referrals)"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-lg border border-black/5">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </ul>
        </section>
      </div>
    )
  },
  "kpi-checklist": {
    title: "Contract KPI Checklist",
    content: (
      <div className="space-y-8 font-light text-[#444444]">
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">The Standard for Success</h3>
          <p className="leading-relaxed">
            Your agreement defines a &ldquo;PASS&rdquo; based on these specific metrics. We track these weekly to ensure the system is scaling as planned.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4">Patient Care Metrics</h3>
          <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAFAFA] border-b border-black/5">
                <tr>
                  <th className="px-6 py-3 font-medium">Metric</th>
                  <th className="px-6 py-3 font-medium text-right">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 font-mono">
                <tr>
                  <td className="px-6 py-3">Speed-to-Lead</td>
                  <td className="px-6 py-3 text-right text-green-600">{'< 5 Minutes'}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3">Show Rate</td>
                  <td className="px-6 py-3 text-right text-green-600">80%+</td>
                </tr>
                <tr>
                  <td className="px-6 py-3">No-Show %</td>
                  <td className="px-6 py-3 text-right text-green-600">{'< 20%'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-medium text-[#111111] mb-4 text-balance">Partnership Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#EEF5FF] p-5 rounded-xl border border-[#004a99]/10">
              <div className="text-sm font-bold text-[#004a99] mb-1">New Partners</div>
              <div className="text-2xl font-light">10+ Total</div>
              <div className="text-[10px] uppercase tracking-wider text-[#646464] mt-2 font-mono">Within 90 Days</div>
            </div>
            <div className="bg-[#EEF5FF] p-5 rounded-xl border border-[#004a99]/10">
              <div className="text-sm font-bold text-[#004a99] mb-1">Weekly Referrals</div>
              <div className="text-2xl font-light">5+ / Week</div>
              <div className="text-[10px] uppercase tracking-wider text-[#646464] mt-2 font-mono">By Day 90</div>
            </div>
          </div>
        </section>
      </div>
    )
  }
};

// Internal icons for the content
type IconProps = React.ComponentProps<typeof BarChart3>;
function Calendar(props: IconProps) { return <BarChart3 {...props} />; }
function Users(props: IconProps) { return <ShieldCheck {...props} />; }

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string;
  const doc = DOCS_CONTENT[slug];

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
          <Link href="/hub" className="text-[#004a99] hover:underline">Back to Hub</Link>
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
          <Link href="/hub" className="flex items-center gap-2 text-sm text-[#646464] hover:text-[#111111] transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Resource Hub</span>
          </Link>
          <div className="text-xs font-mono uppercase tracking-widest text-[#999999]">Clinic Operations Guide</div>
        </div>
      </motion.nav>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="pt-32 px-6 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-[#004a99] flex items-center justify-center text-white shadow-lg shadow-blue-900/10">
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
            <h3 className="text-xl font-light mb-2">Track your progress live</h3>
            <p className="text-sm text-[#646464]">These metrics are updated in your GoHighLevel dashboard every Friday.</p>
          </div>
          <button className="relative z-10 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-[#F0F0F0] transition-colors group">
            <Copy size={16} className="group-hover:scale-110 transition-transform" />
            <span>Copy Guide Link</span>
          </button>
        </div>
      </motion.main>
    </div>
  );
}
