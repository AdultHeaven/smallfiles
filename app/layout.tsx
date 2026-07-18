import type { Metadata, Viewport } from "next";
import { ToastProvider } from "../context/ToastContext";
import "../styles/walkfiles.css";
import "./app.css";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "WalkFiles — Private, High-Speed & Secure File Sharing",
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
    "mega alternative",
    "mediafire alternative",
    "dropbox alternative",
    "cloudflare r2",
    "anonymous upload",
    "video sharing",
    "folder preview",
    "share large files",
    "free storage hosting"
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
    title: "WalkFiles — Private & Fast File Sharing (Pixeldrain & Gofile Alternative)",
    description:
      "Upload and share folders, documents, images, and videos securely up to 5 GB for free. Powered by direct Cloudflare R2 browser uploads.",
    url: "https://walkfiles.com",
    siteName: "WalkFiles",
    type: "website",
    images: [
      {
        url: "https://walkfiles.com/favicon.ico",
        width: 1200,
        height: 630,
        alt: "WalkFiles Secure File Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WalkFiles — Private & Fast File Sharing (Pixeldrain & Gofile Alternative)",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "WalkFiles",
              "url": "https://walkfiles.com",
              "description": "WalkFiles is a high-speed, secure, and private file sharing platform. Share files anonymously or sign up for larger cloud storage, with direct browser downloads and native media preview player support.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://walkfiles.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "author": {
                "@type": "Organization",
                "name": "WalkFiles Team",
                "logo": "https://walkfiles.com/favicon.ico"
              },
              "sameAs": [
                "https://twitter.com/walkfiles",
                "https://github.com/walkfiles"
              ],
              "applicationCategory": "File Sharing Service, Cloud Storage",
              "operatingSystem": "All",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": "0",
                "highPrice": "15.00",
                "offerCount": "3"
              }
            })
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
