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
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "CodeShare",
    description: "Share and explore developer code snippets.",
    url: "https://yourdomain.com",
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
  return <section className="max-w-5xl mx-auto px-4 py-6">{children}</section>;
}
