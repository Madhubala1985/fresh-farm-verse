
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { PRODUCT_IMAGES } from '@/utils/productImages';

interface LandingSliderProps {
  className?: string;
}

// Using our uploaded agricultural images for the slider
const sliderImages = [
  {
    src: PRODUCT_IMAGES["Wheat"],
    alt: 'Fresh wheat crop'
  },
  {
    src: PRODUCT_IMAGES["Green Beans"],
    alt: 'Organic green beans'
  },
  {
    src: PRODUCT_IMAGES["Eggplant"],
    alt: 'Fresh eggplant harvest'
  },
  {
    src: PRODUCT_IMAGES["Cabbage"],
    alt: 'Organic cabbage'
  },
  {
    src: PRODUCT_IMAGES["Chili Peppers"],
    alt: 'Red chili peppers'
  },
  {
    src: PRODUCT_IMAGES["Cotton"],
    alt: 'Raw cotton'
  },
  {
    src: PRODUCT_IMAGES["Mung Beans"],
    alt: 'Green mung beans'
  },
  {
    src: PRODUCT_IMAGES["Peanuts"],
    alt: 'Fresh peanuts'
  },
  {
    src: PRODUCT_IMAGES["Corn"],
    alt: 'Fresh corn cobs'
  },
  {
    src: PRODUCT_IMAGES["Peaches"],
    alt: 'Ripe peaches'
  }
];

const LandingSlider: React.FC<LandingSliderProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-[60vh] overflow-hidden ${className}`}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex justify-center items-center">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback image if the main one fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingSlider;
