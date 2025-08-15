// app/page.tsx (Next.js 13+ App Router)
'use client';

import React, { useState } from 'react';
import './home.css';
import { v4 as uuidv4 } from 'uuid';
import { Copy } from 'lucide-react';
import { uploadToBunny } from './uploadToBunny';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [link, setLink] = useState<string>('');

  const MAX_SIZE_MB = 10;
  const DISALLOWED_EXT = ['exe', 'sh', 'bat', 'js', 'php', 'py', 'dll', 'scr'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const ext = selected.name.split('.').pop()?.toLowerCase() || '';
    const sizeMB = selected.size / (1024 * 1024);

    if (DISALLOWED_EXT.includes(ext)) {
      setError("This file type is not allowed.");
      setFile(null);
      return;
    }

    if (sizeMB > MAX_SIZE_MB) {
      setError("File must be under 100MB.");
      setFile(null);
      return;
    }

    setError('');
    setFile(selected);
  };

  // const handleUpload = async () => {
  //   if (!file) return;
  //   setUploading(true);
  //   setProgress(0);

  //   const ext = file.name.split('.').pop();
  //   const uniqueName = uuidv4() + (ext ? `.${ext}` : '');

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('filename', uniqueName);

  //   try {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('POST', '/api/upload');

  //     xhr.upload.onprogress = (e) => {
  //       if (e.lengthComputable) {
  //         const percent = Math.round((e.loaded / e.total) * 100);
  //         setProgress(percent);
  //       }
  //     };

  //     xhr.onload = () => {
  //       if (xhr.status === 200) {
  //         setLink(`https://smallfiles.fun/file/${uniqueName}`);
  //       } else {
  //         setError('Upload failed. Please try again later.');
  //       }
  //       setUploading(false);
  //     };

  //     xhr.onerror = () => {
  //       setError('Upload failed. Please try again later.');
  //       setUploading(false);
  //     };

  //     xhr.send(formData);
  //   } catch (err) {
  //     setError("Upload failed. Please try again later.");
  //     setUploading(false);
  //   }
  // };
const handleUpload = async () => {
  if (!file) return;
  setUploading(true);
  setProgress(0);

  try {
    const url = await uploadToBunny(file);
    setLink(url);
  } catch (err) {
    console.error("❌ Upload error:", err);
    setError('Upload failed. Please try again later.');
  }

  setUploading(false);
};
  const copyToClipboard = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this file on SmallFiles.fun',
        url: link
      });
    } else {
      alert('Your browser does not support the Web Share API');
    }
  };

  return (
    <div className="page-wrapper">
      <main className="container">
        <h1 className="site-name">SmallFiles.fun</h1>
        <div className="subtitle">
          <div className="feature-badge">
            <span className="icon">💾</span>
            <span>10MB Free Storage</span>
          </div>
          <div className="feature-badge">
            <span className="icon">🔒</span>
            <span>No Logs</span>
          </div>
          <div className="feature-badge">
            <span className="icon">♾️</span>
            <span>Permanent</span>
          </div>
        </div>

        <div className="upload-section">
          <label className={`upload-box ${file ? 'has-file' : ''}`}>
            <input type="file" hidden onChange={handleFileChange} />
            {file ? <span title={file.name}>{file.name}</span> : <span>Click to Select a File</span>}
          </label>

          {error && <div className="error">{error}</div>}

          <button className="upload-btn" disabled={!file || uploading} onClick={handleUpload}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

   {uploading && (
  <div className="progress-box">
    <div className="progress-bar-wrapper">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
    <p>Uploading... {progress}%</p>
  </div>
)}


        {link && (
          <div className="link-box">
            <p>File Uploaded!</p>
            <div className="link-controls">
              <input
                value={link}
                readOnly
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <div className="button-group">
                <button className="copy-btn" onClick={copyToClipboard} title="Copy Link">
                  <Copy size={18} />
                  Copy
                </button>
                <button className="share-btn" onClick={shareLink}>
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="/contact">Contact Us</a> | <a href="/dmca">DMCA</a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} SmallFiles.fun — All rights reserved.
        </div>
      </footer>
    </div>
  );
}

