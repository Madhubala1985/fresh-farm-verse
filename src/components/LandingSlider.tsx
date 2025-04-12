
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface LandingSliderProps {
  className?: string;
}

// Updated with absolute URLs that will work regardless of deployment environment
const sliderImages = [
  {
    src: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
    alt: 'Indian farmer harvesting crops'
  },
  {
    src: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    alt: 'Organic vegetables from Indian farms'
  },
  {
    src: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    alt: 'Agricultural fields in rural India'
  },
  {
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    alt: 'Fresh produce at an Indian farm market'
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
