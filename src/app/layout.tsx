import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soleil Infusion | Expert Clinical IV Therapy & Wellness",
  description: "Experience safe, comfortable, and expert IV infusion therapy at Soleil Infusion. Personalized care for hydration, wellness, and chronic conditions.",
  keywords: ["IV Infusion", "Wellness", "Clinical Therapy", "Hydration", "Medical Care", "Soleil Infusion"],
  openGraph: {
    title: "Soleil Infusion | Expert Clinical IV Therapy",
    description: "Personalized IV therapy and clinical wellness.",
    type: "website",
    locale: "en_US",
    url: "https://soleilinfusion.com", // Ryan to update with actual domain
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}