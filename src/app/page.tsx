import Image from "next/image";
import GHLForm from "@/components/GHLForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <span className="text-blue-600">Sola</span> Infusion
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors border-2 border-blue-600 px-5 py-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
              Book Consultation
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                  Expert Infusion & <span className="text-blue-600 text-glow">Personalized Care</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                  At Sola Infusion, we specialize in delivering safe, comfortable, and clinically expert IV infusion therapy tailored to your unique wellness needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 text-center">
                    Get Started
                  </a>
                  <a href="#services" className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all text-center border border-slate-200">
                    Our Services
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-[2rem] overflow-hidden shadow-2xl relative">
                  {/* Placeholder for high-quality medical image */}
                  <div className="absolute inset-0 flex items-center justify-center text-blue-300">
                    <svg className="w-48 h-48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
                {/* Float card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block max-w-[240px]">
                  <div className="flex items-center gap-4 mb-3 text-blue-600">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z"></path></svg>
                    </div>
                    <span className="font-bold">Accredited Team</span>
                  </div>
                  <p className="text-sm text-slate-500">Board-certified specialists dedicated to your comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Clinical Excellence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Specialized treatments designed for optimal absorption and effective health management.</p>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              { title: "IV Infusion Therapy", desc: "Hydration and nutrient delivery for immediate absorption and recovery." },
              { title: "Chronic Disease Management", desc: "Specialized biologics for autoimmune and complex chronic conditions." },
              { title: "Personalized Compounding", desc: "Medications tailored exactly to your unique biological requirements." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact/GHL Section */}
        <section id="contact" className="py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Book Your Appointment</h2>
            <p className="text-slate-600 mb-12">Complete the form below to connect with our care team and schedule your clinical assessment.</p>
            
            <GHLForm formId="SOLA-INTAKE-01" />
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-6">
          <div className="text-slate-900 font-bold">Sola Infusion</div>
          <p className="text-slate-400 text-sm">© 2026 Sola Infusion. All rights reserved. HIPAA Compliant Care.</p>
        </div>
      </footer>
    </div>
  );
}