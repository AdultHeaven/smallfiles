'use client';
import Link from 'next/link';

export default function DmcaPage() {
  return (
    <div className="dmca-wrapper">
      <main className="dmca-container">
        <h1>DMCA Takedown Policy</h1>

        <p>
          At <strong>SmallFiles.fun</strong>, we take copyright infringement seriously. Our platform allows users to upload and share content, and while we encourage creativity and freedom, we do not tolerate unauthorized use of copyrighted material.
        </p>

        <p>
          If you believe any file uploaded to our site infringes your copyright, we’re here to help. We will take prompt action to remove such content upon receiving a valid DMCA notice.
        </p>

        <h2>📧 Where to Send Your Request</h2>
        <p>
          Please email your takedown request to: <a href="mailto:adultheaven@proton.me">adultheaven@proton.me</a>
        </p>

        <h3>📝 What to Include in Your Email</h3>
        <ul>
          <li>Your full name and a valid email address</li>
          <li>URLs of the infringing content hosted on our site</li>
          <li>Description of the original copyrighted work</li>
          <li>A statement that you believe in good faith the use is unauthorized</li>
          <li>A declaration that the information you’re providing is accurate</li>
          <li>Your electronic signature</li>
        </ul>

        <p>
          We review all requests carefully. If the content violates copyright law, it will be promptly removed.
        </p>

        <Link href="/" className="back-btn">← Back to Home</Link>
      </main>

      <style jsx>{`
        .dmca-wrapper {
          min-height: 100vh;
          background: #f9f9f9;
          padding: 64px 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: 'Inter', sans-serif;
        }

        .dmca-container {
          max-width: 720px;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          color: #222;
        }

        h1 {
          font-size: 2.4rem;
          margin-bottom: 16px;
          color: #111;
        }

        h2, h3 {
          color: #333;
          font-size: 1.25rem;
          margin-top: 32px;
          margin-bottom: 12px;
        }

        p {
          line-height: 1.6;
          margin-bottom: 16px;
          color: #444;
        }

        ul {
          padding-left: 20px;
          margin-bottom: 24px;
          color: #444;
        }

        li {
          margin-bottom: 10px;
        }

        a {
          color: #0066cc;
          text-decoration: none;
          font-weight: 500;
        }

        a:hover {
          text-decoration: underline;
        }

        .back-btn {
          margin-top: 32px;
          display: inline-block;
          padding: 10px 20px;
          background: #222;
          color: white;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .back-btn:hover {
          background: #000;
        }

        @media (max-width: 600px) {
          .dmca-container {
            padding: 24px;
          }

          h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
