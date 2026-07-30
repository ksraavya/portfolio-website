import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sraavya's Portfolio",
  description:
    "Pre-final year CS student at MAIT, GGSIPU. Building AI systems that think at scale. Interned at I4C (Ministry of Home Affairs) and SentinelOne. LeetCode Knight, ICPC Top 400.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    // For Apple devices
    apple: "/apple-touch-icon.png", 
  },
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
    url: "https://sraavya.vercel.app", 
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