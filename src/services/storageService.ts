
import { supabase } from "@/integrations/supabase/client";
import { StorageError } from "@supabase/storage-js";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = 'farm-images';

// Upload a file to storage
export async function uploadFile(file: File, folder: string = 'general'): Promise<string | null> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Check if bucket exists, if not, this will fail and we'll catch the error
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);
      
    if (error) throw error;
    
    // Get public URL for the uploaded file
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

// Delete a file from storage
export async function deleteFile(fileUrl: string): Promise<boolean> {
  try {
    // Extract path from URL
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts.slice(2).join('/');
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

// Get public URL for an already uploaded file
export function getPublicUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
    
  return data.publicUrl;
}
