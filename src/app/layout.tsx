import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Soleil Infusion | Clinical IV Therapy Glen Burnie & Ellicott City",
  description: "Experience boutique medical-grade IV therapy in Glen Burnie, MD. Specializing in NAD+, Glutathione (White Jade), and B12 injections with hospital-grade sterility.",
  keywords: [
    "IV Therapy Glen Burnie", 
    "IV Infusion Ellicott City", 
    "Maryland Wellness Clinic", 
    "B12 Injections MD", 
    "NAD+ Therapy Maryland", 
    "Glutathione Drip", 
    "White Jade Drip Korea",
    "Soleil Infusion",
    "Clinical IV Hydration"
  ],
  authors: [{ name: "Soleil Infusion" }],
  openGraph: {
    title: "Soleil Infusion | Clinical IV Excellence in Maryland",
    description: "Boutique medical-grade IV therapy. Hospital-grade sterility meets lifestyle wellness.",
    type: "website",
    locale: "en_US",
    url: "https://soleilinfusion.com",
    siteName: "Soleil Infusion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soleil Infusion | Clinical IV Therapy",
    description: "Expert IV infusion therapy tailored to your biology in Glen Burnie, MD.",
  },
  robots: {
    index: true,
    follow: true,
  }
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