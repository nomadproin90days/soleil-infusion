"use client";

import { useEffect, useState } from "react";
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
  ArrowUpRight,
  X
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { normalizeLocale } from "@/lib/localization";

type Language = "en" | "ko" | "vi";

const TRANSLATIONS = {
  en: {
    opening: "Opening Soon in Glen Burnie",
    headline: "Medical Integrity. Lifestyle Wellness.",
    subhead: "Experience clinically expert IV infusion therapy tailored to your unique biology. Bridging the gap between medical necessity and daily vitality.",
    ctaOffer: "Claim Launch Offer",
    ctaMenu: "View Menu",
    offerLabel: "🔥 Exclusive Launch Offer",
    offerDetail: "Buy 2 infusions, get 1 FREE",
    limitedTime: "Limited Time Only",
    trust1: "USP <797> Compliant",
    trust2: "ISO 5 Sterile Environment",
    trust3: "MD-Oversight",
    trust4: "Licensed Clinicians",
    menuLabel: "The Treatment Menu",
    menuHeadline: "Outcome-Driven Therapies.",
    menuSub: "Customized formulations designed for specific health goals, from rapid recovery to cellular repair.",
    service1Title: "Essential Hydration",
    service1Desc: "Rapid rehydration for general wellness and recovery. Restores electrolyte balance instantly.",
    service2Title: "Energy & Immunity",
    service2Desc: "Formulations to boost vitality and support your body's natural immune defense systems.",
    service3Title: "White Jade & Glow",
    service3Desc: "The famous 'Cinderella' drip. High-dose Glutathione for clinical skin brightening and deep detoxification.",
    service3Badge: "⭐ Korean Market Hero",
    service4Title: "Advanced Functional",
    service4Desc: "Specialized drips (NAD+, Liver Support) targeting cellular repair and biological longevity.",
    whyLabel: "Why Choose Soleil?",
    whyHeadline: "High-End Standards. Boutique Luxury.",
    diff1Title: "Vertical Integration",
    diff1Desc: "Partnered with Voshell's Pharmacy for direct sourcing of sterile preparations, ensuring the highest quality control.",
    diff2Title: "Sterile Compounding",
    diff2Desc: "Utilizing a USP <797>-compliant ISO 5 laminar flow hood for hospital-grade sterility that typical med-spas cannot match.",
    diff3Title: "Specialist Care",
    diff3Desc: "Culturally tailored protocols with bilingual care teams specialized in metabolic health.",
    bookLabel: "Start Your Journey",
    bookHeadline: "Secure Your Treatment Chair.",
    bookSub: "Select a booking type below. All first-time visits include a brief clinical consultation.",
    newPatient: "New Patient",
    returnPatient: "Returning Patient",
    newPatientDesc: "Initial consultation + first infusion treatment. (60 min)",
    returnPatientDesc: "Scheduled treatment follow-up. (75 min)",
    bookBtn: "Book Consult",
    bookBtnReturn: "Book Treatment",
    needHelp: "Need assistance? Call us at",
    locationLabel: "Visit Us",
    locationHeadline: "Glen Burnie Medical Hub.",
    directions: "Get Directions",
    footerDesc: "Elevating the standard of clinical wellness in Maryland. Licensed, sterile, and outcome-driven IV therapy solutions.",
    navTreatments: "Treatments",
    navDifference: "Our Difference",
    navLocation: "Location",
    navPartners: "Partners"
  },
  ko: {
    opening: "글렌 버니 지역 곧 오픈 예정",
    headline: "의료적 신뢰. 라이프스타일 웰니스.",
    subhead: "개인의 생체 리듬에 맞춘 전문적인 IV 영양 수액 요법을 경험해 보세요. 의료적 필요성과 일상의 활력 사이의 가교 역할을 합니다.",
    ctaOffer: "오픈 기념 혜택 신청",
    ctaMenu: "메뉴 보기",
    offerLabel: "🔥 단독 오픈 기념 혜택",
    offerDetail: "수액 2회 구매 시, 1회 무료 증정",
    limitedTime: "한정 기간 제공",
    trust1: "USP <797> 준수",
    trust2: "ISO 5 무균 환경",
    trust3: "전문의 감독",
    trust4: "자격증 보유 의료진",
    menuLabel: "수액 치료 메뉴",
    menuHeadline: "결과 중심의 테라피.",
    menuSub: "빠른 회복부터 세포 재생까지, 특정 건강 목표를 위해 설계된 맞춤형 포뮬러.",
    service1Title: "필수 수분 공급",
    service1Desc: "일반적인 웰니스와 회복을 위한 빠른 수분 공급. 전해질 균형을 즉각적으로 회복시킵니다.",
    service2Title: "에너지 & 면역력",
    service2Desc: "활력을 높이고 신체의 자연 면역 방어 시스템을 지원하는 포뮬러.",
    service3Title: "백옥 주사 & 광채",
    service3Desc: "유명한 '신데렐라' 주사. 피부 미백과 깊은 해독을 위한 고용량 글루타치온 요법.",
    service3Badge: "⭐ 한국인 인기 메뉴",
    service4Title: "고급 기능성 수액",
    service4Desc: "세포 재생과 생물학적 장수를 목표로 하는 전문 드립(NAD+, 간 지원).",
    whyLabel: "왜 솔레이유 인퓨전인가요?",
    whyHeadline: "최고 수준의 기준. 부티크 럭셔리.",
    diff1Title: "수직적 통합 시스템",
    diff1Desc: "보쉘 약국(Voshell's Pharmacy)과의 파트너십을 통한 무균 제제 직접 조달로 최고 수준의 품질 관리를 보장합니다.",
    diff2Title: "무균 조제",
    diff2Desc: "일반 메드스파에서는 모방할 수 없는 병원급 무균 상태를 위해 USP <797> 준수 ISO 5 무균 작업대를 사용합니다.",
    diff3Title: "전문가 케어",
    diff3Desc: "대사 건강을 전문으로 하는 이중 언어 의료팀과 문화적으로 맞춤화된 프로토콜.",
    bookLabel: "여정을 시작하세요",
    bookHeadline: "치료 예약을 확정하세요.",
    bookSub: "아래에서 예약 유형을 선택하세요. 모든 첫 방문에는 간략한 전문 상담이 포함됩니다.",
    newPatient: "신규 환자",
    returnPatient: "기존 환자",
    newPatientDesc: "첫 상담 + 첫 수액 치료. (60분)",
    returnPatientDesc: "정기 치료 및 후속 관리. (75분)",
    bookBtn: "상담 예약",
    bookBtnReturn: "치료 예약",
    needHelp: "도움이 필요하신가요? 전화 문의:",
    locationLabel: "방문 안내",
    locationHeadline: "글렌 버니 메디컬 허브.",
    directions: "길 찾기",
    footerDesc: "메릴랜드의 임상 웰니스 기준을 높입니다. 면허 보유 의료진, 무균 환경, 결과 중심의 IV 테라피 솔루션.",
    navTreatments: "치료 메뉴",
    navDifference: "차별점",
    navLocation: "위치",
    navPartners: "파트너"
  },
  vi: {
    opening: "Sắp Khai Trương tại Glen Burnie",
    headline: "Y Đức Chuẩn Mực. Sống Khỏe Hiện Đại.",
    subhead: "Trải nghiệm liệu pháp truyền dịch IV chuyên khoa phù hợp với cơ địa riêng biệt của bạn. Kết nối nhu cầu y tế và sức sống hàng ngày.",
    ctaOffer: "Nhận Ưu Đãi Khai Trương",
    ctaMenu: "Xem Thực Đơn",
    offerLabel: "🔥 Ưu Đãi Khai Trương Độc Quyền",
    offerDetail: "Mua 2 gói truyền dịch, tặng 1 MIỄN PHÍ",
    limitedTime: "Thời Gian Có Hạn",
    trust1: "Tuân thủ USP <797>",
    trust2: "Môi trường vô trùng ISO 5",
    trust3: "Giám sát bởi Bác sĩ MD",
    trust4: "Đội ngũ Y tế chuyên nghiệp",
    menuLabel: "Thực Đơn Truyền Dịch",
    menuHeadline: "Liệu Pháp Hiệu Quả.",
    menuSub: "Công thức tùy chỉnh được thiết kế cho các mục tiêu sức khỏe cụ thể, từ phục hồi nhanh đến sửa chữa tế bào.",
    service1Title: "Cấp Nước Thiết Yếu",
    service1Desc: "Cấp nước nhanh chóng cho sức khỏe tổng quát và phục hồi. Khôi phục cân bằng điện giải ngay lập tức.",
    service2Title: "Năng Lượng & Miễn Dịch",
    service2Desc: "Công thức tăng cường sinh lực và hỗ trợ hệ thống phòng thủ miễn dịch tự nhiên của cơ thể.",
    service3Title: "Ngọc Trắng & Rạng Rỡ",
    service3Desc: "Liệu pháp truyền dịch 'Cinderella' nổi tiếng. Glutathione liều cao giúp làm sáng da và giải độc sâu.",
    service3Badge: "⭐ Ưu tiên cho thị trường Hàn Quốc",
    service4Title: "Chức Năng Nâng Cao",
    service4Desc: "Các gói truyền chuyên dụng (NAD+, Hỗ trợ Gan) nhắm vào việc sửa chữa tế bào và kéo dài tuổi thọ.",
    whyLabel: "Tại sao chọn Soleil?",
    whyHeadline: "Tiêu Chuẩn Cao Cấp. Sang Trọng Tinh Tế.",
    diff1Title: "Tích Hợp Trực Tiếp",
    diff1Desc: "Hợp tác với Nhà thuốc Voshell để cung cấp trực tiếp các chế phẩm vô trùng, đảm bảo kiểm soát chất lượng cao nhất.",
    diff2Title: "Pha Chế Vô Trùng",
    diff2Desc: "Sử dụng tủ hút vô trùng ISO 5 tuân thủ USP <797> cho độ vô trùng cấp bệnh viện mà các Med-spa thông thường không có.",
    diff3Title: "Chăm Sóc Chuyên Khoa",
    diff3Desc: "Các phác đồ phù hợp về văn hóa với đội ngũ chăm sóc song ngữ chuyên về sức khỏe chuyển hóa.",
    bookLabel: "Bắt Đầu Hành Trình",
    bookHeadline: "Đặt Chỗ Ngay Hôm Nay.",
    bookSub: "Chọn loại hình đặt chỗ bên dưới. Tất cả các lần thăm khám đầu tiên đều bao gồm tư vấn y tế ngắn gọn.",
    newPatient: "Bệnh Nhân Mới",
    returnPatient: "Bệnh Nhân Cũ",
    newPatientDesc: "Tư vấn ban đầu + liệu trình truyền dịch đầu tiên. (60 phút)",
    returnPatientDesc: "Theo dõi và điều trị định kỳ. (75 phút)",
    bookBtn: "Đặt Lịch Tư Vấn",
    bookBtnReturn: "Đặt Lịch Điều Trị",
    needHelp: "Cần hỗ trợ? Gọi cho chúng tôi tại",
    locationLabel: "Ghé Thăm Chúng Tôi",
    locationHeadline: "Trung Tâm Y Tế Glen Burnie.",
    directions: "Chỉ Đường",
    footerDesc: "Nâng tầm tiêu chuẩn chăm sóc sức khỏe tại Maryland. Giải pháp truyền dịch IV vô trùng, chuyên nghiệp và hiệu quả.",
    navTreatments: "Điều Trị",
    navDifference: "Khác Biệt",
    navLocation: "Vị Trí",
    navPartners: "Đối Tác"
  }
};

export default function Home() {
  const [activeBooking, setActiveBooking] = useState<'none' | 'new' | 'return'>('none');
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const urlLocale = normalizeLocale(new URLSearchParams(window.location.search).get("lang"));
    const savedLocale = normalizeLocale(window.localStorage.getItem("preferred_locale"));
    const browserLocale = normalizeLocale(navigator.language);
    return (urlLocale !== "en" ? urlLocale : savedLocale !== "en" ? savedLocale : browserLocale) as Language;
  });

  useEffect(() => {
    window.localStorage.setItem("preferred_locale", lang);
    document.cookie = `preferred_locale=${lang}; path=/; max-age=31536000; samesite=lax`;
    const url = new URL(window.location.href);
    if (lang === "en") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", lang);
    }
    window.history.replaceState({}, "", url.toString());
  }, [lang]);

  const t = TRANSLATIONS[lang];

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
        <div className="max-w-7xl mx-auto px-6 min-h-24 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <BrandLogo alt="Soleil Infusion Logo" priority className="transition-transform duration-500 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tight text-[#111111] leading-none mb-1">
                <span className="text-[#004a99]">SOLEIL</span> INFUSION
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50">Glen Burnie, MD</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-tight text-[#111111]">
              <Link href="#services" className="hover:text-[#004a99] transition-colors">{t.navTreatments}</Link>
              <Link href="#why" className="hover:text-[#004a99] transition-colors">{t.navDifference}</Link>
              <Link href="#location" className="hover:text-[#004a99] transition-colors">{t.navLocation}</Link>
              <Link href="/referral" className="hover:text-[#004a99] transition-colors font-mono uppercase text-[10px] tracking-[0.2em] border border-black/10 px-3 py-1 rounded-md">{t.navPartners}</Link>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center bg-[#FAFAFA] border border-black/5 p-1 rounded-full shadow-inner">
              {(["en", "ko", "vi"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                    lang === l ? 'bg-[#004a99] text-white shadow-sm' : 'text-[#999999] hover:text-[#111111]'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Link href="#book" className="hidden md:block bg-[#004a99] text-white px-8 py-3 rounded-full hover:bg-[#003377] transition-all shadow-lg shadow-blue-900/10 active:scale-95 text-sm font-bold uppercase tracking-widest">
              {t.bookBtn}
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-56 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <span className="bg-[#EEF5FF] text-[#004a99] text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-[#004a99]/10">
                {t.opening}
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-[100px] font-light tracking-tighter text-[#111111] mb-10 leading-[0.85] text-balance">
              {lang === "en" ? (
                <>Medical <span className="font-medium text-[#004a99]">Integrity.</span> <br/>Lifestyle <span className="italic font-normal">Wellness.</span></>
              ) : t.headline}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#646464] font-light leading-relaxed max-w-2xl mb-12 text-balance">
              {t.subhead}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-center">
              <Link href="#book" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#111111] text-white px-12 py-6 rounded-[2.5rem] text-lg font-medium hover:bg-black transition-all group shadow-xl shadow-black/10">
                {t.ctaOffer}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#services" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white border border-black/5 text-[#111111] px-12 py-6 rounded-[2.5rem] text-lg font-medium hover:border-[#004a99]/30 transition-all shadow-sm font-light">
                {t.ctaMenu}
              </Link>
            </motion.div>

            {/* Launch Offer Card */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 bg-[#EEF5FF] border border-[#004a99]/10 p-6 md:p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 max-w-2xl shadow-sm"
            >
              <div className="flex items-center gap-6 text-[#004a99]">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Sparkles size={32} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-1 opacity-70">{t.offerLabel}</span>
                  <p className="text-2xl font-medium text-[#111111] tracking-tight">{t.offerDetail}</p>
                </div>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#004a99]/60 bg-white/50 px-4 py-2 rounded-full border border-[#004a99]/5">{t.limitedTime}</div>
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
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><ShieldCheck size={18} /> {t.trust1}</div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><ShieldCheck size={18} /> {t.trust2}</div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><ShieldCheck size={18} /> {t.trust3}</div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]"><CheckCircle2 size={18} /> {t.trust4}</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 border-b border-black/5 pb-12">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#004a99] mb-6 block font-bold tracking-widest">{t.menuLabel}</span>
              <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-[#111111]">{t.menuHeadline}</h2>
            </div>
            <div className="max-w-xs">
              <p className="text-[#646464] font-light leading-relaxed mb-6">{t.menuSub}</p>
              <div className="h-1 w-12 bg-[#004a99]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Essential Hydration */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#FAFAFA] p-8 rounded-[3.5rem] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full group">
              <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-[#004a99] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Waves size={28} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4">{t.service1Title}</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">{t.service1Desc}</p>
              <div className="text-lg font-mono text-[#111111] font-bold tracking-tight">$165 — $175</div>
            </motion.div>

            {/* Energy & Immunity */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#FAFAFA] p-8 rounded-[3.5rem] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full group">
              <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-[#004a99] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4">{t.service2Title}</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">{t.service2Desc}</p>
              <div className="text-lg font-mono text-[#111111] font-bold tracking-tight">$195 — $215</div>
            </motion.div>

            {/* White Jade & Glow */}
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[3.5rem] border border-[#004a99]/20 shadow-xl shadow-blue-900/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <Star className="text-[#004a99] fill-[#004a99] animate-pulse" size={20} />
              </div>
              <div className="h-14 w-14 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4 flex items-center gap-2">{t.service3Title}</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">{t.service3Desc}</p>
              <div className="text-lg font-mono text-[#004a99] font-bold tracking-tight">$225 — $250</div>
              <div className="mt-4 text-[10px] font-mono font-bold uppercase text-[#004a99] tracking-wider">{t.service3Badge}</div>
            </motion.div>

            {/* Advanced Functional */}
            <motion.div whileHover={{ y: -10 }} className="bg-[#FAFAFA] p-8 rounded-[3.5rem] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full group">
              <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-[#008B8B] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-4">{t.service4Title}</h3>
              <p className="text-sm font-light leading-relaxed mb-8 flex-1">{t.service4Desc}</p>
              <div className="text-lg font-mono text-[#111111] font-bold tracking-tight">$275 — $295</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section id="why" className="py-40 px-6 bg-[#111111] text-white overflow-hidden relative rounded-[5rem] mx-6">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#004a99]/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-24 items-center">
            <div className="md:w-1/2">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#A6C7E7] mb-8 block font-bold">{t.whyLabel}</span>
              <h2 className="text-5xl md:text-8xl font-light tracking-tight mb-12 leading-[1.05] text-balance">
                {lang === 'en' ? (
                  <>High-End <span className="text-[#A6C7E7] italic font-medium">Standards.</span> <br/>Boutique <span className="font-medium">Luxury.</span></>
                ) : t.whyHeadline}
              </h2>
              
              <div className="space-y-12">
                <div className="flex gap-8 group">
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-1 group-hover:bg-[#A6C7E7] group-hover:text-[#111111] transition-all">01</div>
                  <div>
                    <h4 className="text-2xl font-medium mb-3 text-[#A6C7E7]">{t.diff1Title}</h4>
                    <p className="text-[#646464] font-light leading-relaxed text-lg">{t.diff1Desc}</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-1 group-hover:bg-[#A6C7E7] group-hover:text-[#111111] transition-all">02</div>
                  <div>
                    <h4 className="text-2xl font-medium mb-3 text-[#A6C7E7]">{t.diff2Title}</h4>
                    <p className="text-[#646464] font-light leading-relaxed text-lg">{t.diff2Desc}</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-1 group-hover:bg-[#A6C7E7] group-hover:text-[#111111] transition-all">03</div>
                  <div>
                    <h4 className="text-2xl font-medium mb-3 text-[#A6C7E7]">{t.diff3Title}</h4>
                    <p className="text-[#646464] font-light leading-relaxed text-lg">{t.diff3Desc}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative aspect-square w-full max-w-[550px]">
              <motion.div 
                animate={{ 
                  y: [0, -30, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-[6rem] border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden shadow-2xl shadow-blue-900/20"
              >
                <div className="text-center relative z-10">
                  <Droplets size={120} className="text-[#A6C7E7] mx-auto mb-8 opacity-40 animate-pulse" />
                  <div className="text-[100px] font-bold text-[#A6C7E7] mb-2 tracking-tighter leading-none italic">99.9%</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.6em] text-[#646464] font-bold">Clinical Sterility Grade</div>
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#004a99] mb-6 block font-bold">{t.bookLabel}</span>
            <h2 className="text-6xl md:text-[100px] font-light tracking-tighter text-[#111111] mb-8 leading-tight">{t.bookHeadline}</h2>
            <p className="text-[#646464] text-xl font-light mb-12 max-w-2xl mx-auto">{t.bookSub}</p>
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
                  className="bg-[#FAFAFA] p-12 rounded-[4rem] border border-black/5 hover:border-[#004a99]/20 transition-all flex flex-col items-center text-center group shadow-sm hover:shadow-xl hover:shadow-blue-900/5 duration-500"
                >
                  <div className="h-20 w-20 rounded-3xl bg-white flex items-center justify-center text-[#004a99] mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Star size={40} />
                  </div>
                  <h3 className="text-3xl font-medium mb-4 text-[#111111]">{t.newPatient}</h3>
                  <p className="text-[#646464] font-light text-base mb-12 leading-relaxed">{t.newPatientDesc}</p>
                  <div className="w-full bg-[#004a99] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#003377] transition-all shadow-lg shadow-blue-900/10">
                    {t.bookBtn}
                  </div>
                </button>
                <button 
                  onClick={() => setActiveBooking('return')}
                  className="bg-[#FAFAFA] p-12 rounded-[4rem] border border-black/5 hover:border-[#004a99]/20 transition-all flex flex-col items-center text-center group shadow-sm hover:shadow-xl hover:shadow-blue-900/5 duration-500"
                >
                  <div className="h-20 w-20 rounded-3xl bg-white flex items-center justify-center text-[#004a99] mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Droplets size={40} />
                  </div>
                  <h3 className="text-3xl font-medium mb-4 text-[#111111]">{t.returnPatient}</h3>
                  <p className="text-[#646464] font-light text-base mb-12 leading-relaxed">{t.returnPatientDesc}</p>
                  <div className="w-full bg-white border border-black/10 text-[#111111] py-6 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:border-[#004a99] transition-all">
                    {t.bookBtnReturn}
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-4 md:p-8 rounded-[4rem] border border-black/5 shadow-2xl shadow-blue-900/10 relative"
              >
                <button 
                  onClick={() => setActiveBooking('none')}
                  className="absolute top-8 right-8 z-10 p-3 rounded-full bg-[#FAFAFA] text-[#646464] hover:text-[#111111] transition-colors shadow-sm"
                >
                  <X size={24} />
                </button>
                <div className="min-h-[850px] w-full bg-[#FAFAFA] rounded-[3rem] overflow-hidden">
                  {activeBooking === 'new' ? (
                    <iframe 
                      src="https://api.voshellspharmacy.com/widget/booking/vi5Ov0XkJLgD8z8jFWS5" 
                      style={{ width: '100%', height: '850px', border: 'none', overflow: 'hidden' }}
                      scrolling="no" 
                      id="vi5Ov0XkJLgD8z8jFWS5_1772309403783"
                    ></iframe>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[850px] text-center p-12 font-light">
                      <p className="text-2xl mb-6">Returning patient booking coming soon.</p>
                      <button onClick={() => setActiveBooking('none')} className="text-[#004a99] underline font-medium">Back to selection</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="text-center mt-16 bg-[#FAFAFA] p-8 rounded-3xl border border-black/5">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#999999]">{t.needHelp} <span className="text-[#111111] font-bold">(443) 281-9157</span></p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-40 px-6 bg-[#FAFAFA] border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[5rem] border border-black/5 p-12 md:p-24 flex flex-col lg:flex-row gap-24 items-center shadow-sm relative overflow-hidden">
            <div className="lg:w-1/2 relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#004a99] mb-10 block font-bold">{t.locationLabel}</span>
              <h2 className="text-6xl md:text-8xl font-light tracking-tighter mb-12 leading-tight">{t.locationHeadline}</h2>
              <div className="space-y-12">
                <div className="flex gap-6 group">
                  <div className="h-14 w-14 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-medium text-[#111111] mb-1">801 Landmark Drive</p>
                    <p className="text-xl text-[#646464] font-light">Glen Burnie, MD 21061</p>
                    <p className="text-sm text-[#999999] mt-4 italic">Located just 15 mins from BWI & Ellicott City</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="h-14 w-14 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-[#004a99] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Clock size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-medium text-[#111111] mb-1">Treatment Hours</p>
                    <p className="text-lg text-[#646464] font-light leading-relaxed">
                      Mon–Fri: 9am–6pm <br/>
                      Sat: 10am–4pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full aspect-[4/3] rounded-[4rem] bg-[#EEF5FF] border border-black/5 flex items-center justify-center overflow-hidden group relative shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]" />
              <div className="relative z-10 bg-white/90 backdrop-blur-xl px-10 py-5 rounded-[2rem] border border-black/5 shadow-2xl">
                <Link href="https://maps.google.com" target="_blank" className="flex items-center gap-4 text-[#004a99] font-bold uppercase tracking-[0.2em] text-xs">
                  {t.directions} <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 px-6 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-24 mb-40">
            <div className="max-w-md">
              <div className="flex items-center gap-4 mb-12">
                <BrandLogo alt="Soleil Logo" />
                <div className="flex flex-col">
                  <span className="font-bold text-3xl tracking-tighter text-[#111111] leading-none mb-1">SOLEIL INFUSION</span>
                  <span className="text-[10px] font-mono tracking-[0.4em] uppercase opacity-40">Clinical Excellence</span>
                </div>
              </div>
              <p className="text-[#646464] font-light text-xl leading-relaxed">
                {t.footerDesc}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-32">
              <div>
                <h4 className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-[#111111] mb-10">Navigation</h4>
                <ul className="space-y-5 text-base font-light">
                  <li><Link href="#services" className="hover:text-[#004a99] transition-colors">{t.navTreatments}</Link></li>
                  <li><Link href="#why" className="hover:text-[#004a99] transition-colors">{t.navDifference}</Link></li>
                  <li><Link href="#book" className="hover:text-[#004a99] transition-colors">Book Now</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-[#111111] mb-10">Legal</h4>
                <ul className="space-y-5 text-base font-light">
                  <li><Link href="#" className="hover:text-[#004a99] transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-[#004a99] transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-[#004a99] transition-colors">HIPAA Notice</Link></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold text-[10px] font-mono uppercase tracking-[0.4em] text-[#111111] mb-10">Admin</h4>
                <Link href="/hub" className="inline-flex items-center gap-3 bg-[#FAFAFA] border border-black/5 px-6 py-3 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest hover:border-[#004a99]/30 transition-all hover:bg-white">
                  Resource Hub <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4 opacity-30 grayscale hover:opacity-100 transition-opacity cursor-help group">
              <ShieldCheck size={24} className="group-hover:text-[#004a99]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">HIPAA Compliant & Secure</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#999999] font-medium">© 2026 SOLEIL INFUSION LLC. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
