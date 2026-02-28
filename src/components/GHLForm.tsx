'use client';

import Script from 'next/script';

interface GHLFormProps {
  formId?: string;
  baseUrl?: string;
  className?: string;
  title?: string;
  height?: number;
}

export default function GHLForm({
  formId = "8c7tIeZhpGM0ULERcESp",
  baseUrl = "https://api.voshellspharmacy.com",
  className = "",
  title = "Soleil IV Infusions Form",
  height = 1156
}: GHLFormProps) {
  return (
    <div className={`w-full bg-white rounded-[3rem] border border-black/5 overflow-hidden relative shadow-sm ${className}`} style={{ minHeight: height }}>
      <iframe
        src={`${baseUrl}/widget/form/${formId}`}
        style={{ width: '100%', height: `${height}px`, border: 'none' }}
        id={`inline-${formId}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-height={String(height)}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={title}
      ></iframe>
      <Script src={`${baseUrl}/js/form_embed.js`} strategy="afterInteractive" />
    </div>
  );
}
