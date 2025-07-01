'use client';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="contact-wrapper">
      <main className="contact-container">
        <h1>Contact Us</h1>

        <p>
          If you have any questions, suggestions, or need help with anything related to <strong>SmallFiles.fun</strong>, feel free to reach out. We're here to help.
        </p>

        <p>
          📧 Email us at: <a href="mailto:adultheaven@proton.me">adultheaven@proton.me</a>
        </p>

        <p>
          We aim to respond within 24–48 hours on business days.
        </p>

        <Link href="/" className="back-btn">← Back to Home</Link>
      </main>

      <style jsx>{`
        .contact-wrapper {
          min-height: 100vh;
          background: #f9f9f9;
          padding: 64px 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: 'Inter', sans-serif;
        }

        .contact-container {
          max-width: 680px;
          width: 100%;
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          color: #222;
          border: 1px solid #e5e5e5;
        }

        h1 {
          font-size: 2.2rem;
          margin-bottom: 16px;
          color: #111;
        }

        p {
          line-height: 1.6;
          margin-bottom: 16px;
          color: #444;
        }

        a {
          color: #0066cc;
          font-weight: 500;
          text-decoration: none;
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
          .contact-container {
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
