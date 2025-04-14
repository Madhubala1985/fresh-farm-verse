
// Mapping of product types to their respective image URLs
export const PRODUCT_IMAGES = {
  "Yellow Split Peas": "/lovable-uploads/b7ec2f52-18d2-473b-acd7-77723c1f00e2.png",
  "Wheat": "/lovable-uploads/d7269bc1-e122-480e-95d4-971d87dad521.png",
  "Green Beans": "/lovable-uploads/9f500d45-5e07-4c3f-a0f4-ffba15d5be4a.png",
  "Bottle Gourd": "/lovable-uploads/a5842f04-6040-4ff4-b9ec-947380149bc6.png",
  "Eggplant": "/lovable-uploads/f095aa14-5080-4b39-a442-e6fe804d3d59.png",
  "Cabbage": "/lovable-uploads/a549772f-9fd2-4ada-b29c-0270425c6489.png",
  "Chili Peppers": "/lovable-uploads/5aab80fd-ef82-4cb7-ae79-6fa2ba21e6d4.png",
  "Cotton": "/lovable-uploads/97a3742d-6480-4275-9d61-552a128c0b0b.png",
  "Mung Beans": "/lovable-uploads/41ce29c8-9fe7-4ea9-a619-f91fafdb8802.png",
  "Peanuts": "/lovable-uploads/9b267196-f7d8-4420-88ec-c612f697079a.png",
  "Corn": "/lovable-uploads/32a67994-d231-439f-b44f-d527b309665d.png",
  "Peaches": "/lovable-uploads/dee57671-e9c7-46c9-9248-29474000779c.png",
  
  // Add a fallback image if a product doesn't have a specific image
  "default": "/placeholder.svg"
};

// Helper function to get image URL by product name
export const getProductImageByName = (productName: string): string => {
  // Return default image if no match found
  return PRODUCT_IMAGES[productName] || PRODUCT_IMAGES.default;
};
