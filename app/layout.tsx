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

const description =
  "A TypeScript-like language with its own interpreter, built from scratch in Java.";

export const metadata: Metadata = {
  // absolute URLs for the link-preview image; Vercel deployments infer this if unset
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: "miniTS: a language & interpreter built from scratch",
  description,
  openGraph: {
    title: "miniTS: a language & interpreter built from scratch",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "miniTS: a language & interpreter built from scratch",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
