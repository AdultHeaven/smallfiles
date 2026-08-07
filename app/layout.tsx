import type { Metadata, Viewport } from "next";
import { ToastProvider } from "../context/ToastContext";
import "../styles/walkfiles.css";
import "./app.css";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "WalkFiles - Private, High-Speed & Secure File Sharing",
    template: "%s | WalkFiles"
  },
  description:
    "Looking for a fast, free Pixeldrain, Gofile, or WeTransfer alternative? WalkFiles offers secure, anonymous file sharing and private cloud storage with high-speed direct CDN downloads, folder sharing, and native video/image previews with zero tracking.",
  keywords: [
    "file sharing",
    "free file upload",
    "walkfiles",
    "secure file transfer",
    "temporary file hosting",
    "privacy first file sharing",
    "send files",
    "cloud storage",
    "direct upload",
    "gofile alternative",
    "pixeldrain alternative",
    "wetransfer alternative",
    "gofile alternative",
    "secure file transfer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: "WalkFiles Team", url: "https://walkfiles.com" }],
  metadataBase: new URL("https://walkfiles.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WalkFiles - Private & Fast File Sharing (Pixeldrain & Gofile Alternative)",
    description: "Upload and share files instantly with zero throttling, high-speed CDN routing, and private stream previews.",
    siteName: "WalkFiles",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WalkFiles - High-Speed Private File Sharing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WalkFiles - Private & Fast File Sharing (Pixeldrain & Gofile Alternative)",
    description:
      "Upload and share files securely with zero speed limits and native browser media previews.",
    images: ["https://walkfiles.com/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ JuicyAds Verification Meta */}
        <meta
          name="juicyads-site-verification"
          content="1afa48bbdeed42d1aef7f0528a490eff"
        />
        {/* Structured JSON-LD Data for Google & AI search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "WalkFiles",
                "url": "https://walkfiles.com",
                "description": "WalkFiles is a high-speed, secure, and private cloud storage and file sharing platform. Share files anonymously or sign up for cloud storage with direct CDN downloads and native media previews.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://walkfiles.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                },
                "author": {
                  "@type": "Organization",
                  "name": "WalkFiles Team",
                  "logo": "https://walkfiles.com/favicon.ico"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "WalkFiles",
                "applicationCategory": "MultimediaApplication, CloudStorageApplication, FileTransfer",
                "operatingSystem": "Web, All",
                "url": "https://walkfiles.com",
                "description": "Fast, private cloud storage and instant file sharing alternative to Pixeldrain, Gofile, and WeTransfer. Offers direct CDN downloads, zero speed limits, and streaming previews.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }
            ])
          }}
        />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
