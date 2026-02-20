import Image from "next/image";
import GHLForm from "@/components/GHLForm";
import StatsHighlight from "@/components/StatsHighlight";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-800">
            <span className="text-[var(--medical-dark-blue)]">Soleil</span> Infusion
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-[var(--medical-dark-blue)] transition-colors">Treatments</a>
            <a href="#about" className="hover:text-[var(--medical-dark-blue)] transition-colors">Our Difference</a>
            <a href="#contact" className="hover:text-[var(--medical-dark-blue)] transition-colors border-2 border-[var(--medical-blue)] px-5 py-2 rounded-full text-[var(--medical-dark-blue)] hover:bg-[var(--medical-blue)] hover:text-white transition-all">
              Book Appointment
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[var(--medical-light-blue)] to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-[var(--medical-dark-blue)] uppercase bg-blue-50 rounded-full border border-blue-100">
                  Now Open in Glen Burnie
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-slate-900">
                  MEDICAL <br/>
                  INTEGRITY <br/>
                  <span className="text-[var(--medical-dark-blue)]">REDEFINED.</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                  Experience clinically expert IV infusion therapy tailored to your unique biology. Bridging the gap between medical necessity and daily vitality.
                </p>
                
                {/* Launch Offer Badge */}
                <div className="mb-10 bg-blue-50 border border-blue-200 p-4 rounded-xl inline-block">
                  <span className="font-bold text-[var(--medical-dark-blue)] block mb-1">🔥 Exclusive Launch Offer</span>
                  <span className="text-slate-700">Buy a package of <span className="font-bold">2 infusions</span>, get <span className="font-bold">1 FREE</span>.</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="bg-[var(--medical-dark-blue)] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[var(--medical-blue)] transition-all shadow-lg shadow-blue-200/50 text-center">
                    Claim Offer
                  </a>
                  <a href="#services" className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center border border-slate-200 shadow-sm">
                    View Menu
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] bg-white rounded-[2rem] overflow-hidden shadow-2xl relative border-8 border-white">
                  {/* Placeholder for high-quality medical/lifestyle image */}
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300">
                    <div className="text-center">
                      <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <span className="text-sm font-medium">Lifestyle Image Placeholder</span>
                    </div>
                  </div>
                </div>
                
                {/* Float card - Trust Signal */}
                <div className="absolute top-10 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 hidden md:block max-w-[260px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="font-bold text-slate-800">Sterile Compounding</span>
                  </div>
                  <p className="text-xs text-slate-500">Powered by Voshell's Pharmacy infrastructure for hospital-grade safety.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-slate-900">Outcome-Driven Therapies</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Customized formulations designed for specific health goals, from rapid recovery to cellular repair.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-100 text-[var(--medical-dark-blue)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--medical-dark-blue)] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.53a1 1 0 0 1 .76.36l1.98 2.64 1.98-2.64a1 1 0 0 1 .76-.36H16a2 2 0 0 1 2 2v6.86" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Essential Hydration</h3>
              <p className="text-sm text-slate-500 mb-4 h-12">Rapid rehydration for general wellness and recovery.</p>
              <div className="text-[var(--medical-dark-blue)] font-bold">$165 - $175</div>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Energy & Immunity</h3>
              <p className="text-sm text-slate-500 mb-4 h-12">Formulations to boost vitality and support immune defense.</p>
              <div className="text-[var(--medical-dark-blue)] font-bold">$195 - $215</div>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">White Jade & Glow</h3>
              <p className="text-sm text-slate-500 mb-4 h-12">The famous "Cinderella" drip (Glutathione) for skin brightening and detox.</p>
              <div className="text-[var(--medical-dark-blue)] font-bold">$225 - $250</div>
            </div>

            {/* Service 4 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Advanced Functional</h3>
              <p className="text-sm text-slate-500 mb-4 h-12">Specialized drips (NAD+, Liver Support) for cellular repair.</p>
              <div className="text-[var(--medical-dark-blue)] font-bold">$275 - $295</div>
            </div>
          </div>
        </section>

        {/* Stats Highlight Section */}
        <StatsHighlight />

        {/* About Section */}
        <section id="about" className="py-24 bg-[var(--medical-light-blue)]">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Why Choose Soleil?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-slate-800">Vertical Integration</h3>
                    <p className="text-slate-600">Partnered with Voshell's Pharmacy for direct sourcing of sterile preparations, ensuring the highest quality control.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-slate-800">Sterile Compounding</h3>
                    <p className="text-slate-600">Utilizing a USP &lt;797&gt;-compliant ISO 5 laminar flow hood for hospital-grade sterility that typical med-spas cannot match.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-slate-800">Korean-American Specialists</h3>
                    <p className="text-slate-600">Culturally tailored protocols including "White Jade" and "Garlic" drips, with bilingual care teams.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-center text-slate-800">Visit Us</h3>
              <div className="space-y-4 text-slate-600">
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[var(--medical-dark-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>801 Landmark Drive, Glen Burnie, MD</span>
                </p>
                <div className="h-px bg-slate-100 my-4"></div>
                <p className="text-sm text-center italic">Located just 15 mins from BWI & Ellicott City</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/GHL Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Start Your Wellness Journey</h2>
            <p className="text-slate-600 mb-12">Complete the form below to connect with our care team. We are currently accepting new patients.</p>
            
            <GHLForm formId="SOLEIL-INTAKE-01" />
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-6">
          <div className="text-slate-900 font-bold text-xl">Soleil Infusion</div>
          <div className="flex gap-6 text-slate-500 text-sm">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Soleil Infusion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
