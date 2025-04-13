
// Mapping of product types to their respective image URLs
export const PRODUCT_IMAGES = {
  // Add a fallback image if a product doesn't have a specific image
  "default": "/placeholder.svg"
};

// Helper function to get image URL by product name
export const getProductImageByName = (productName: string): string => {
  // Return default image if no match found
  return PRODUCT_IMAGES.default;
};
