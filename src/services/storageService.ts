
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'product-images';

// Upload a product image to storage
export async function uploadProductImage(file: File): Promise<string | null> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `products/${fileName}`;
    
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
    console.error('Error uploading product image:', error);
    return null;
  }
}

// Delete a product image from storage
export async function deleteProductImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const bucketName = pathParts[1];
    const filePath = pathParts.slice(2).join('/');
    
    if (bucketName !== BUCKET_NAME) return false;
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting product image:', error);
    return false;
  }
}
