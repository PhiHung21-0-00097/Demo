import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "CodeShare | Share Your Snippets",
    template: "%s | CodeShare",
  },
  description:
    "A platform for developers to share, tag, and discover code snippets.",
  keywords: ["code snippets", "programming", "Next.js", "developers"],
  metadataBase: new URL("https://demosnipet.vercel.app/"),
  openGraph: {
    title: "CodeShare",
    description: "Share and explore developer code snippets.",
    url: "https://demosnipet.vercel.app/",
    siteName: "CodeShare",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SnippetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
