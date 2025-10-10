// /app/(protected)/layout.tsx
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "CodeShare | Share Your Snippets",
    template: "%s | CodeShare",
  },
  description: "Platform for developers to share and explore code snippets",
  keywords: ["code snippets", "programming", "Next.js", "developers"],
  metadataBase: new URL("https://demosnipet.vercel.app/"),
  openGraph: {
    title: "CodeShare",
    description: "Share and explore developer code snippets",
    url: "https://demosnipet.vercel.app/",
    siteName: "CodeShare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeShare",
    description: "Share and explore developer code snippets",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className={`${inter.variable} antialiased`}>{children}</div>
    </Providers>
  );
}
