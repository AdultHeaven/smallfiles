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
    "Upload and share files privately with high-speed direct browser uploads. WalkFiles offers secure cloud storage, folder sharing, and native media previews with zero activity tracking.",
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
    "cloudflare r2",
    "anonymous upload",
    "video sharing",
    "folder preview"
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
  authors: [{ name: "WalkFiles Team", url: "https://walkfiles.fun" }],
  metadataBase: new URL("https://walkfiles.fun"),
  openGraph: {
    title: "WalkFiles — Private & Fast File Sharing",
    description:
      "Upload and share folders, documents, images, and videos securely up to 1 GB for free. Powered by direct Cloudflare R2 browser uploads.",
    url: "https://walkfiles.fun",
    siteName: "WalkFiles",
    type: "website",
    images: [
      {
        url: "https://walkfiles.fun/favicon.ico",
        width: 1200,
        height: 630,
        alt: "WalkFiles Secure File Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WalkFiles — Private & Fast File Sharing",
    description:
      "Upload and share files securely with zero speed limits and native browser media previews.",
    images: ["https://walkfiles.fun/favicon.ico"],
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
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
