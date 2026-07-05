// app/dashboard/page.tsx
import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSideClient } from '../../lib/supabase/server';
import { ProfileRepository } from '../../repositories/profile.repository';
import { FileRepository } from '../../repositories/file.repository';
import { 
  ShieldCheck, 
  HardDrive, 
  File, 
  History, 
  ArrowRight, 
  FolderClosed,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileText
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profileRepo = new ProfileRepository();
  const fileRepo = new FileRepository();

  const profile = await profileRepo.getProfileWithPlan(user.id);
  if (!profile) {
    redirect('/login?error=profile-not-found');
  }

  const totalFiles = await profileRepo.getTotalFileCount(user.id);
  const { files: recentFiles } = await fileRepo.getFilesByUserId(user.id, { limit: 5 });

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
    let icon = <FileText size={16} style={{ color: 'var(--text-secondary)' }} />;

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      bg = 'rgba(59, 130, 246, 0.1)';
      border = 'rgba(59, 130, 246, 0.2)';
      icon = <FileImage size={16} style={{ color: '#60a5fa' }} />;
    } else if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext || '')) {
      bg = 'rgba(139, 92, 246, 0.1)';
      border = 'rgba(139, 92, 246, 0.2)';
      icon = <FileVideo size={16} style={{ color: '#a78bfa' }} />;
    } else if (['mp3', 'wav', 'ogg', 'flac'].includes(ext || '')) {
      bg = 'rgba(245, 158, 11, 0.1)';
      border = 'rgba(245, 158, 11, 0.2)';
      icon = <FileAudio size={16} style={{ color: '#fbbf24' }} />;
    } else if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext || '')) {
      bg = 'rgba(16, 185, 129, 0.1)';
      border = 'rgba(16, 185, 129, 0.2)';
      icon = <FileArchive size={16} style={{ color: '#34d399' }} />;
    }

    return (
      <div style={{
        padding: '8px',
        borderRadius: 'var(--radius-sm)',
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

  const percentUsed = Math.min(100, Math.round((Number(profile.storage_used) / Number(profile.plan.storage_limit)) * 100)) || 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>Overview</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Welcome back, <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{profile.email}</span>.</p>
      </div>

      {/* Overview Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Storage card */}
        <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(59, 130, 246, 0.05)', color: 'var(--accent-color)', border: '1px solid rgba(59,130,246,0.1)' }}>
            <HardDrive size={22} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Storage capacity</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {formatSize(Number(profile.storage_used))}
            </div>
            
            {/* Embedded glowing mini storage indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div className="progress-container" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <div className="progress-fill" style={{ width: `${percentUsed}%`, background: 'var(--accent-gradient)' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>{percentUsed}% capacity used</span>
                <span>Limit {formatSize(Number(profile.plan.storage_limit))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Files card */}
        <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.05)', color: 'var(--success-color)', border: '1px solid rgba(16,185,129,0.1)' }}>
            <File size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Files hosted</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {totalFiles}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              No count limits (storage-based only)
            </p>
          </div>
        </div>

        {/* Active plan card */}
        <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(245, 158, 11, 0.05)', color: 'var(--warning-color)', border: '1px solid rgba(245,158,11,0.1)' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Account tier</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {profile.plan.name} Tier
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Expires: Never (Early access free plan)
            </p>
          </div>
        </div>
      </div>

      {/* Recent Files Section (Clean List Card Overhaul) */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={18} style={{ color: 'var(--text-muted)' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Recent Uploads</h2>
          </div>
          {recentFiles.length > 0 && (
            <Link href="/dashboard/files" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <span>View all files</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {recentFiles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderClosed size={24} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>No uploads registered</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', maxWidth: '320px', margin: '0 auto', lineHeight: 1.5 }}>
                Your storage partition is completely empty. Drop or upload items to generate sharing links.
              </p>
            </div>
            <Link href="/dashboard/upload" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Upload First File
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentFiles.map((file) => (
              <div 
                key={file.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px 16px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  {getFileIconContainer(file.original_name)}
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <Link 
                      href={`/download/${file.id}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        fontWeight: 600, 
                        fontSize: '0.875rem', 
                        color: 'var(--text-primary)', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        maxWidth: '280px'
                      }}
                    >
                      {file.original_name}
                    </Link>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {formatSize(file.size)} • {file.download_count} download{file.download_count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
 
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'none' }} className="desktop-only">
                    {new Date(file.created_at).toLocaleDateString()}
                  </span>
                  <Link 
                    href={`/download/${file.id}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary" 
                    style={{ padding: '6px 12px', fontSize: '0.75rem', minHeight: '30px' }}
                  >
                    View File
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
