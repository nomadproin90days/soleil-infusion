'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface GHLFormProps {
  formId?: string;
  baseUrl?: string;
  className?: string;
  title?: string;
}

export default function GHLForm({ 
  formId = "TD6hYijKkRFiwxR39U9B", 
  baseUrl = "https://api.voshellspharmacy.com",
  className = "",
  title = "Soleil IV Infusions Form"
}: GHLFormProps) {
  return (
    <div className={`w-full min-h-[725px] bg-white rounded-[3rem] border border-black/5 overflow-hidden relative shadow-sm ${className}`}>
      <iframe
        src={`${baseUrl}/widget/form/${formId}`}
        style={{ width: '100%', height: '725px', border: 'none' }}
        id={`inline-${formId}`} 
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-height="725"
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={title}
      ></iframe>
      <Script src={`${baseUrl}/js/form_embed.js`} strategy="afterInteractive" />
    </div>
  );
}
