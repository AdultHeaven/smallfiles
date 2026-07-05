// repositories/file.repository.ts
import { createAdminClient } from '../lib/supabase/admin';

export interface FileMetadata {
  id: string;
  user_id: string | null;
  name: string;
  original_name: string;
  extension: string | null;
  size: number;
  mime_type: string;
  r2_key: string;
  download_count: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
  deleted_at: string | null;
  last_downloaded_at: string | null;
  short_code: string | null;
}

export class FileRepository {
  private supabase = createAdminClient();

  /**
   * Registers a new file in the database.
   */
  async createFile(file: Omit<FileMetadata, 'id' | 'download_count' | 'created_at' | 'updated_at' | 'expires_at' | 'deleted_at' | 'last_downloaded_at'>): Promise<FileMetadata | null> {
    const { data, error } = await this.supabase
      .from('files')
      .insert({
        ...file,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating file metadata:', error);
      return null;
    }

    return data as FileMetadata;
  }

  /**
   * Retrieves a file by its primary key ID.
   */
  async getFileById(id: string): Promise<FileMetadata | null> {
    const { data, error } = await this.supabase
      .from('files')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching file metadata for ID ${id}:`, error);
      return null;
    }

    return data as FileMetadata;
  }

  /**
   * Retrieves a file by its short code.
   */
  async getFileByShortCode(shortCode: string): Promise<FileMetadata | null> {
    const { data, error } = await this.supabase
      .from('files')
      .select('*')
      .eq('short_code', shortCode)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching file metadata for short code ${shortCode}:`, error);
      return null;
    }

    return data as FileMetadata;
  }

  /**
   * Retrieves files belonging to a user, with optional search and pagination.
   */
  async getFilesByUserId(
    userId: string,
    options: { search?: string; limit?: number; offset?: number } = {}
  ): Promise<{ files: FileMetadata[]; count: number }> {
    const { search = '', limit = 10, offset = 0 } = options;

    let query = this.supabase
      .from('files')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (search) {
      query = query.ilike('original_name', `%${search}%`);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching files for user:', error);
      return { files: [], count: 0 };
    }

    return {
      files: (data as FileMetadata[]) || [],
      count: count || 0,
    };
  }

  /**
   * Updates a file's public name.
   */
  async renameFile(id: string, userId: string, newName: string): Promise<FileMetadata | null> {
    const ext = newName.split('.').pop() || '';
    const { data, error } = await this.supabase
      .from('files')
      .update({
        original_name: newName,
        extension: ext || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error renaming file:', error);
      return null;
    }

    return data as FileMetadata;
  }

  /**
   * Deletes a file record.
   */
  async deleteFile(id: string, userId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('files')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting file record:', error);
      return false;
    }

    return true;
  }

  /**
   * Increments the download count of a file.
   */
  async incrementDownloadCount(id: string): Promise<void> {
    // In PostgreSQL we can perform direct updates
    const { error } = await this.supabase.rpc('increment_download_count', {
      file_id_param: id,
    });

    if (error) {
      // Fallback
      const file = await this.getFileById(id);
      if (file) {
        await this.supabase
          .from('files')
          .update({
            download_count: file.download_count + 1,
            last_downloaded_at: new Date().toISOString(),
          })
          .eq('id', id);
      }
    }
  }

  /**
   * Creates an abuse report entry for a file.
   */
  async submitAbuseReport(fileId: string, reason: string, reporterIp?: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('abuse_reports')
      .insert({
        file_id: fileId,
        reason,
        reporter_ip: reporterIp || null,
      });

    if (error) {
      console.error('Error submitting abuse report:', error);
      return false;
    }

    return true;
  }
}
