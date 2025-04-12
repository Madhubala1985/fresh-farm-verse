
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface LandingSliderProps {
  className?: string;
}

// Updated with more reliable agriculture-related images using absolute URLs
const sliderImages = [
  {
    src: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
    alt: 'Green farm field with crops'
  },
  {
    src: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg',
    alt: 'Farmer working in vegetable garden'
  },
  {
    src: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg',
    alt: 'Fresh organic vegetables harvest'
  },
  {
    src: 'https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg',
    alt: 'Terraced rice fields'
  },
  {
    src: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
    alt: 'Colorful organic produce at farmers market'
  },
  {
    src: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg',
    alt: 'Person holding freshly harvested vegetables'
  },
  {
    src: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg',
    alt: 'Farmer inspecting crops in field'
  },
  {
    src: 'https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg',
    alt: 'Rural landscape with agricultural fields'
  },
  {
    src: 'https://images.pexels.com/photos/3629537/pexels-photo-3629537.jpeg',
    alt: 'Close-up of hands planting seedling'
  },
  {
    src: 'https://images.pexels.com/photos/2286901/pexels-photo-2286901.jpeg',
    alt: 'Harvested vegetables in wooden crate'
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
