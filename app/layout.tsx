import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sraavya — AI/ML Engineer & Data Scientist",
  description:
    "Pre-final year CS student at MAIT, GGSIPU. Building AI systems that think at scale. Interned at I4C (Ministry of Home Affairs) and SentinelOne. LeetCode Knight, ICPC Top 400.",
  keywords: [
    "Sraavya Kochhar",
    "AI Engineer",
    "Data Scientist",
    "Machine Learning",
    "Portfolio",
    "MAIT",
    "Python",
    "RAG",
    "Neo4j",
  ],
  authors: [{ name: "Sraavya Kochhar" }],
  openGraph: {
    title: "Sraavya — AI/ML Engineer & Data Scientist",
    description:
      "Building AI systems that think at scale. Check out my projects, experience, and achievements.",
    type: "website",
    url: "https://sraavya.vercel.app", // TODO: update with your actual URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Sraavya — AI/ML Engineer & Data Scientist",
    description: "Building AI systems that think at scale.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}