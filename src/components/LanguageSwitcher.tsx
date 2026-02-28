"use client";

import { Globe } from "lucide-react";
import type { Locale } from "@/lib/localization";

type LanguageSwitcherProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  className?: string;
};

const LANGUAGE_LABELS: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
  { code: "vi", label: "VI" },
];

export default function LanguageSwitcher({ locale, onChange, className }: LanguageSwitcherProps) {
  return (
    <div
      className={[
        "inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-2 py-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Language switcher"
    >
      <Globe size={14} className="text-[#646464]" aria-hidden="true" />
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#646464]">Language</span>
      <div className="inline-flex items-center rounded-full bg-[#F6F6F6] p-0.5">
        {LANGUAGE_LABELS.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={[
              "min-w-10 rounded-full px-2 py-1 text-[11px] font-bold uppercase transition-colors",
              locale === code ? "bg-[#004a99] text-white" : "text-[#555555] hover:text-[#111111]",
            ].join(" ")}
            aria-pressed={locale === code}
            aria-label={`Switch language to ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
