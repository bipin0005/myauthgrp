import type React from "react"
import type { Metadata, Viewport } from "next"
import { Orbitron, Poppins } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "MyAuthGrp - Web Development Agency | Modern Websites & Apps",
    template: "%s | MyAuthGrp",
  },
  description:
    "MyAuthGrp is a professional web development agency specializing in custom website development, UI/UX design, app prototyping, and SEO optimization. We build modern, fast, and beautiful digital experiences.",
  keywords: [
    "web development",
    "web development agency",
    "website development",
    "custom website",
    "UI/UX design",
    "app development",
    "web design",
    "SEO optimization",
    "frontend development",
    "React development",
    "Next.js development",
    "responsive website",
    "mobile app development",
    "ecommerce website",
    "landing page design",
    "MyAuthGrp",
    "web developers",
    "professional website",
    "modern web design",
    "full stack development",
  ],
  authors: [{ name: "MyAuthGrp", url: "https://myauthgrp.com" }],
  creator: "MyAuthGrp",
  publisher: "MyAuthGrp",
  metadataBase: new URL("https://myauthgrp.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myauthgrp.com",
    siteName: "MyAuthGrp",
    title: "MyAuthGrp - Web Development Agency | Modern Websites & Apps",
    description:
      "Professional web development agency specializing in custom websites, UI/UX design, app prototyping, and SEO. Transform your digital presence with MyAuthGrp.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyAuthGrp - We Build the Web of the Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyAuthGrp - Web Development Agency",
    description:
      "Professional web development agency. Custom websites, UI/UX design, app prototyping & SEO optimization.",
    images: ["/og-image.png"],
    creator: "@myauthgrp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code from Google Search Console
  },
  category: "technology",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MyAuthGrp",
  alternateName: "MyAuthGrp Web Development",
  url: "https://myauthgrp.com",
  logo: "https://myauthgrp.com/logo.png",
  description:
    "Professional web development agency specializing in custom website development, UI/UX design, app prototyping, and SEO optimization.",
  email: "myauthgrp@gmail.com",
  sameAs: [
    "https://github.com/myauthgrp",
    "https://linkedin.com/company/myauthgrp",
    "https://instagram.com/myauthgrp",
    "https://t.me/myauthgrp",
    "https://discord.gg/myauthgrp",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "Worldwide",
  },
  areaServed: "Worldwide",
  foundingDate: "2024",
  slogan: "We Build the Web of the Future",
  knowsAbout: [
    "Web Development",
    "UI/UX Design",
    "App Prototyping",
    "SEO Optimization",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
          description:
            "Custom responsive websites built with modern technologies like React and Next.js",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description:
            "Beautiful, user-centered interface designs that enhance user experience",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "App Prototyping",
          description:
            "Rapid prototyping and MVP development for web and mobile applications",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Optimization",
          description:
            "Search engine optimization to improve visibility and organic traffic",
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable}`}>
      <head>
        <link rel="canonical" href="https://myauthgrp.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-poppins">{children}</body>
    </html>
  )
}
