import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmallFiles.fun — Private & Fast File Sharing",
  description:
    "Upload and share small files securely without registration. No tracking, no clutter — just simple and fast file sharing. Perfect for temporary sharing under 100MB.",
  keywords: [
    "file sharing",
    "free file upload",
    "small files",
    "secure file transfer",
    "temporary file hosting",
    "privacy first file sharing",
    "send files",
    "share files anonymously",
  ],
  authors: [{ name: "SmallFiles.fun Team", url: "https://smallfiles.fun" }],
  metadataBase: new URL("https://smallfiles.fun"),
  openGraph: {
    title: "SmallFiles.fun — Share Files Privately",
    description:
      "Simple, fast, and private file sharing under 100MB. No accounts. No spam. Just upload and share.",
    url: "https://smallfiles.fun",
    siteName: "SmallFiles.fun",
    type: "website",
    images: [
      {
        url: "https://smallfiles.fun/favicon.ico",
        width: 1200,
        height: 630,
        alt: "SmallFiles.fun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmallFiles.fun",
    description:
      "Fast and private file sharing with no registration required. Just upload and share.",
    images: ["https://smallfiles.fun/favicon.ico"],
  },
  themeColor: "#000000",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
