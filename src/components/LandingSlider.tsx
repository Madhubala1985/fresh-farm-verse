
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface LandingSliderProps {
  className?: string;
}

// Generic farming related images for the slider
const sliderImages = [
  {
    src: '/placeholder.svg',
    alt: 'Fresh wheat crop'
  },
  {
    src: '/placeholder.svg',
    alt: 'Organic green beans'
  },
  {
    src: '/placeholder.svg',
    alt: 'Fresh eggplant harvest'
  },
  {
    src: '/placeholder.svg',
    alt: 'Organic cabbage'
  },
  {
    src: '/placeholder.svg',
    alt: 'Farm produce'
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
