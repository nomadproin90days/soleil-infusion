'use client';

import { useEffect, useRef } from 'react';

interface GHLFormProps {
  formId?: string;
  baseUrl?: string;
}

export default function GHLForm({ 
  formId = "PLACEHOLDER_FORM_ID", 
  baseUrl = "https://link.msgsndr.com" 
}: GHLFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is where the GHL script would normally be initialized.
    // For now, it's a placeholder. When you get the real script from GHL, 
    // you can paste it here or follow their specific implementation guide.
    console.log(`GHL Form ${formId} ready to be mounted at ${baseUrl}`);
    
    // Example of how GHL scripts are often injected:
    /*
    const script = document.createElement('script');
    script.src = `${baseUrl}/js/form_embed.js`;
    script.async = true;
    document.body.appendChild(script);
    */
  }, [formId, baseUrl]);

  return (
    <div className="w-full min-h-[500px] bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 overflow-hidden relative">
      <div className="text-center p-8">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Lead Capture Active</h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto">
          The GoHighLevel form will render here once the Agency Script is connected.
        </p>
        <div className="mt-6 font-mono text-[10px] text-slate-400 bg-white px-3 py-1 rounded border border-slate-100">
          ID: {formId}
        </div>
      </div>
      
      {/* 
          UNCOMMENT & REPLACE with actual GHL embed code when ready:
          <iframe 
            src={`${baseUrl}/widget/form/${formId}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            id={`inline-${formId}`}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Sola Intake"
            data-scrollbar="yes"
            data-contact-events="yes"
            title="Sola Intake"
          ></iframe>
      */}
    </div>
  );
}
