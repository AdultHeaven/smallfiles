// components/UploadZone.tsx
'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Copy,
  X,
  Loader2,
  FileImage,
  FileVideo,
  FileAudio,
  FileText,
  FileArchive,
  File
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  speed: number; // bytes/sec
  timeRemaining: number; // seconds
  status: 'pending' | 'uploading' | 'success' | 'failed' | 'cancelled';
  shareLink?: string;
  error?: string;
}

interface UploadZoneProps {
  onUploadSuccess?: () => void;
}

export default function UploadZone({ onUploadSuccess }: UploadZoneProps) {
  const { showToast } = useToast();
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const uploadTasks = useRef<{ [key: string]: XMLHttpRequest }>({});
  const cancelledUploads = useRef<Set<string>>(new Set());
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error('Error fetching profile in UploadZone:', err);
      }
    }
    loadProfile();
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatSpeed = (bytesPerSecond: number) => {
    return `${formatSize(bytesPerSecond)}/s`;
  };

  const formatTime = (seconds: number) => {
    if (seconds === Infinity || isNaN(seconds)) return 'estimating...';
    if (seconds < 60) return `${Math.round(seconds)}s left`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs}s left`;
  };

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return <FileImage size={20} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />;
    }
    if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext || '')) {
      return <FileVideo size={20} style={{ color: '#8b5cf6', flexShrink: 0 }} />;
    }
    if (['mp3', 'wav', 'ogg', 'flac'].includes(ext || '')) {
      return <FileAudio size={20} style={{ color: 'var(--warning-color)', flexShrink: 0 }} />;
    }
    if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext || '')) {
      return <FileArchive size={20} style={{ color: 'var(--success-color)', flexShrink: 0 }} />;
    }
    return <FileText size={20} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />;
  };

  const cancelUpload = (id: string) => {
    cancelledUploads.current.add(id);
    const xhr = uploadTasks.current[id];
    if (xhr) {
      xhr.abort();
      delete uploadTasks.current[id];
    }
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'cancelled', progress: 0 } : f))
    );
    showToast('Upload cancelled.', 'info');
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    showToast('Share link copied to clipboard!', 'success');
  };

  const startUpload = useCallback(async (file: File, id: string) => {
    try {
      // 1. Get signed R2 Upload URL and check limits
      const res = await fetch('/api/files/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          fileSize: file.size,
          contentType: file.type || 'application/octet-stream',
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to acquire upload authorization.');
      }

      const { signedUrl, key } = await res.json();

      // 2. Direct browser upload to R2
      const xhr = new XMLHttpRequest();
      uploadTasks.current[id] = xhr;

      const startTime = Date.now();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          const elapsed = (Date.now() - startTime) / 1000; // in seconds
          const speed = elapsed > 0 ? event.loaded / elapsed : 0;
          const remainingBytes = event.total - event.loaded;
          const timeRemaining = speed > 0 ? remainingBytes / speed : 0;

          setFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? {
                  ...f,
                  progress,
                  speed,
                  timeRemaining,
                }
                : f
            )
          );
        }
      });

      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Storage service error: ${xhr.statusText}`));
          }
        });
        xhr.addEventListener('error', () => reject(new Error('Network connection issues.')));
        xhr.addEventListener('abort', () => reject(new Error('Upload cancelled.')));
      });

      xhr.open('PUT', signedUrl, true);
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
      xhr.send(file);

      await uploadPromise;

      if (cancelledUploads.current.has(id)) {
        cancelledUploads.current.delete(id);
        return;
      }

      // 3. Register file metadata in database
      const regRes = await fetch('/api/files/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: file.name,
          size: file.size,
          mimeType: file.type || 'application/octet-stream',
          r2Key: key,
          isPublic: true,
        }),
      });

      if (cancelledUploads.current.has(id)) {
        cancelledUploads.current.delete(id);
        return;
      }

      if (!regRes.ok) {
        const regErr = await regRes.json();
        throw new Error(regErr.error || 'Failed to register file properties.');
      }

      const registeredFile = await regRes.json();
      const shareLink = registeredFile.short_code
        ? `${window.location.origin}/f/${registeredFile.short_code}`
        : `${window.location.origin}/download/${registeredFile.id}`;

      if (cancelledUploads.current.has(id)) {
        cancelledUploads.current.delete(id);
        return;
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
              ...f,
              status: 'success',
              progress: 100,
              shareLink,
            }
            : f
        )
      );

      showToast(`${file.name} uploaded successfully!`, 'success');
      delete uploadTasks.current[id];
      cancelledUploads.current.delete(id);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err: any) {
      console.error(err);
      if (err.message !== 'Upload cancelled.' && !cancelledUploads.current.has(id)) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                ...f,
                status: 'failed',
                error: err.message || 'An unexpected error occurred.',
              }
              : f
          )
        );
        showToast(`Failed to upload ${file.name}: ${err.message}`, 'error');
      }
      delete uploadTasks.current[id];
      cancelledUploads.current.delete(id);
    }
  }, [onUploadSuccess, showToast]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mapped = acceptedFiles.map((file) => {
        const id = crypto.randomUUID();
        const uploadingFile: UploadingFile = {
          id,
          name: file.name,
          size: file.size,
          progress: 0,
          speed: 0,
          timeRemaining: 0,
          status: 'uploading',
        };
        // Run async upload
        startUpload(file, id);
        return uploadingFile;
      });

      setFiles((prev) => [...mapped, ...prev]);
    },
    [startUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        {...getRootProps()}
        className={`dropzone-container ${isDragActive ? 'is-drag-active' : ''}`}
        style={{
          transform: isDragActive ? 'scale(1.015)' : 'scale(1)',
          borderColor: isDragActive ? 'rgba(255, 255, 255, 0.3)' : undefined,
          backgroundColor: isDragActive ? 'rgba(255, 255, 255, 0.02)' : undefined,
          boxShadow: isDragActive ? '0 12px 30px rgba(0, 0, 0, 0.5)' : undefined,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <input {...getInputProps()} />
        <UploadCloud size={40} style={{ color: 'var(--text-muted)', marginBottom: '4px' }} />
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px', color: 'var(--text-primary)' }}>
            Drag & drop files here, or click to browse
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Supports files up to {profile?.plan?.max_file_size ? formatSize(profile.plan.max_file_size) : '150 MB'} ({profile?.plan?.name || 'Free'} Tier)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Upload Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    {getFileIcon(file.name)}
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span
                        style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}
                        title={file.name}
                      >
                        {file.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {formatSize(file.size)}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    {file.status === 'uploading' && (
                      <button
                        type="button"
                        onClick={() => cancelUpload(file.id)}
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.75rem', minHeight: '30px' }}
                      >
                        Cancel
                      </button>
                    )}

                    {file.status === 'success' && file.shareLink && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(file.shareLink!)}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.75rem', minHeight: '30px', gap: '6px' }}
                      >
                        <Copy size={12} />
                        <span>Copy Share Link</span>
                      </button>
                    )}
                  </div>
                </div>

                {(file.status === 'uploading' || file.status === 'success') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div className="progress-container">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${file.status === 'success' ? 100 : file.progress}%`,
                          background: file.status === 'success' ? 'var(--success-color)' : undefined,
                        }}
                      ></div>
                    </div>
                    {file.status === 'uploading' ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>{file.progress}% uploaded</span>
                        <span>{formatSpeed(file.speed)} • {formatTime(file.timeRemaining)}</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                        <CheckCircle size={14} />
                        <span>Upload complete!</span>
                      </div>
                    )}
                  </div>
                )}

                {file.status === 'failed' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--error-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                    <AlertCircle size={14} />
                    <span>{file.error || 'Upload failed.'}</span>
                  </div>
                )}

                {file.status === 'cancelled' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                    <X size={14} />
                    <span>Upload cancelled.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
