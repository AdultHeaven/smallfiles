// app/dashboard/files/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Copy, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  FolderClosed, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileText, 
  FileArchive, 
  File,
  Eye
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

interface FileMetadata {
  id: string;
  original_name: string;
  size: number;
  download_count: number;
  created_at: string;
  r2_key: string;
}

type CategoryType = 'all' | 'image' | 'video' | 'audio' | 'zip' | 'document';

export default function MyFilesPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 25; // Fetch larger batch for client filtering

  // Category filter state
  const [category, setCategory] = useState<CategoryType>('all');

  // Rename states (Modal based)
  const [renamingFile, setRenamingFile] = useState<FileMetadata | null>(null);
  const [newName, setNewName] = useState('');
  const [renaming, setRenaming] = useState(false);

  // Delete states (Modal based)
  const [deletingFile, setDeletingFile] = useState<FileMetadata | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/files?search=${encodeURIComponent(search)}&limit=${limit}&offset=${offset}`);
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
        setCount(data.count || 0);
      }
    } catch (err) {
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  }, [search, offset]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setOffset(0); // Reset pagination on search
  };

  const copyToClipboard = (file: FileMetadata) => {
    const link = file.short_code 
      ? `${window.location.origin}/f/${file.short_code}`
      : `${window.location.origin}/download/${file.id}`;
    navigator.clipboard.writeText(link);
    showToast('Share link copied to clipboard!', 'success');
  };

  const startRename = (file: FileMetadata) => {
    setRenamingFile(file);
    setNewName(file.original_name);
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingFile || !newName.trim()) return;

    setRenaming(true);
    try {
      const res = await fetch('/api/files/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: renamingFile.id, newName: newName.trim() }),
      });

      if (res.ok) {
        setFiles((prev) =>
          prev.map((f) => (f.id === renamingFile.id ? { ...f, original_name: newName.trim() } : f))
        );
        showToast('File renamed successfully.', 'success');
        setRenamingFile(null);
      } else {
        showToast('Failed to rename file.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error renaming file.', 'error');
    } finally {
      setRenaming(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingFile) return;

    setDeleting(true);
    try {
      const res = await fetch('/api/files/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: deletingFile.id }),
      });

      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.id !== deletingFile.id));
        setCount((prev) => prev - 1);
        showToast('File deleted permanently.', 'success');
        setDeletingFile(null);
        router.refresh(); // Refresh storage indicator in layout
      } else {
        showToast('Failed to delete file.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting file.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIconContainer = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    
    // Default fallback values
    let bg = 'rgba(255, 255, 255, 0.03)';
    let border = 'rgba(255, 255, 255, 0.06)';
    let icon = <FileText size={18} style={{ color: 'var(--text-secondary)' }} />;

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      bg = 'rgba(59, 130, 246, 0.1)';
      border = 'rgba(59, 130, 246, 0.2)';
      icon = <FileImage size={18} style={{ color: '#60a5fa' }} />;
    } else if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext || '')) {
      bg = 'rgba(139, 92, 246, 0.1)';
      border = 'rgba(139, 92, 246, 0.2)';
      icon = <FileVideo size={18} style={{ color: '#a78bfa' }} />;
    } else if (['mp3', 'wav', 'ogg', 'flac'].includes(ext || '')) {
      bg = 'rgba(245, 158, 11, 0.1)';
      border = 'rgba(245, 158, 11, 0.2)';
      icon = <FileAudio size={18} style={{ color: '#fbbf24' }} />;
    } else if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext || '')) {
      bg = 'rgba(16, 185, 129, 0.1)';
      border = 'rgba(16, 185, 129, 0.2)';
      icon = <FileArchive size={18} style={{ color: '#34d399' }} />;
    }

    return (
      <div style={{
        padding: '10px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: bg,
        border: `1px solid ${border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {icon}
      </div>
    );
  };

  // Client-side category filtering
  const filteredFiles = files.filter(file => {
    if (category === 'all') return true;
    const ext = file.original_name.split('.').pop()?.toLowerCase() || '';
    if (category === 'image') return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
    if (category === 'video') return ['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext);
    if (category === 'audio') return ['mp3', 'wav', 'ogg', 'flac'].includes(ext);
    if (category === 'zip') return ['zip', 'rar', 'tar', 'gz', '7z'].includes(ext);
    if (category === 'document') {
      const allMediaExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'mp4', 'webm', 'ogg', 'mov', 'avi', 'mp3', 'wav', 'ogg', 'flac', 'zip', 'rar', 'tar', 'gz', '7z'];
      return !allMediaExtensions.includes(ext);
    }
    return true;
  });

  const categoriesList: { name: string; value: CategoryType }[] = [
    { name: 'All Files', value: 'all' },
    { name: 'Images', value: 'image' },
    { name: 'Videos', value: 'video' },
    { name: 'Audio', value: 'audio' },
    { name: 'Archives', value: 'zip' },
    { name: 'Documents', value: 'document' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>My Files</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your hosted cloud storage, copy sharing links, or rename details.</p>
        </div>
        <Link href="/dashboard/upload" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
          Upload New Files
        </Link>
      </div>

      {/* Control Panels: Search + Category Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Search bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '44px' }}
            placeholder="Search by filename..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Categories filters */}
        <div className="filter-pills">
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`filter-pill ${category === cat.value ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Files List Display */}
      {loading ? (
        // Pulsing skeleton loading state
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: '68px', width: '100%' }}></div>
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '64px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FolderClosed size={24} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>No files match criteria</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              {search || category !== 'all' ? 'Try adjusting your search query or filters.' : 'Upload files to populate your inventory.'}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredFiles.map((file) => (
            <div 
              key={file.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '14px 20px', 
                backgroundColor: 'rgba(15, 15, 17, 0.45)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                {getFileIconContainer(file.original_name)}
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span
                    style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '320px' }}
                    title={file.original_name}
                  >
                    {file.original_name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {formatSize(file.size)} • {file.download_count} download{file.download_count !== 1 ? 's' : ''} • {new Date(file.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(file)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.75rem', minHeight: '32px' }}
                  title="Copy Share Link"
                >
                  <Copy size={13} />
                  <span className="desktop-only" style={{ marginLeft: '4px' }}>Copy Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => startRename(file)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.75rem', minHeight: '32px' }}
                  title="Rename File"
                >
                  <Edit2 size={13} />
                  <span className="desktop-only" style={{ marginLeft: '4px' }}>Rename</span>
                </button>
                <Link
                  href={file.short_code ? `/f/${file.short_code}` : `/download/${file.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.75rem', minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}
                  title="Open Portal Preview"
                >
                  <Eye size={13} />
                  <span className="desktop-only" style={{ marginLeft: '4px' }}>Preview</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setDeletingFile(file)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: '0.75rem', minHeight: '32px', color: 'var(--error-color)', borderColor: 'rgba(244, 63, 94, 0.2)' }}
                  title="Delete File"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          {/* Pagination panel */}
          {count > limit && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <button
                className="btn btn-secondary"
                disabled={offset === 0}
                onClick={() => setOffset(Math.max(0, offset - limit))}
              >
                Previous
              </button>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Showing {offset + 1} to {Math.min(count, offset + limit)} of {count} files
              </span>
              <button
                className="btn btn-secondary"
                disabled={offset + limit >= count}
                onClick={() => setOffset(offset + limit)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- RENAME FILE DIALOG OVERLAY --- */}
      {renamingFile && (
        <div className="modal-backdrop">
          <form 
            onSubmit={handleRename} 
            className="card animate-fade-in" 
            style={{ maxWidth: '420px', width: 'calc(100% - 32px)', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Rename File</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '16px', lineHeight: 1.4 }}>Provide a new name for your file below.</p>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  type="text"
                  className="form-input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  disabled={renaming}
                  autoFocus
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => setRenamingFile(null)} disabled={renaming}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} disabled={renaming}>
                {renaming ? <Loader2 className="animate-spin" size={14} /> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- DELETE FILE CONFIRMATION OVERLAY --- */}
      {deletingFile && (
        <div className="modal-backdrop">
          <div 
            className="card animate-fade-in" 
            style={{ maxWidth: '400px', width: 'calc(100% - 32px)', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--error-color)', marginBottom: '8px' }}>Delete File</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: 1.5 }}>
                Are you sure you want to permanently delete <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{deletingFile.original_name}</span>? This file will be wiped from our storage system. This action is irreversible.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => setDeletingFile(null)} disabled={deleting}>Cancel</button>
              <button type="button" className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={confirmDelete} disabled={deleting}>
                {deleting ? <Loader2 className="animate-spin" size={14} /> : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
