import { Carousel, Image } from 'antd';
import React from 'react';
import banner1 from '@/assets/images/banner1.webp';
import banner2 from '@/assets/images/banner4.webp';
import banner3 from '@/assets/images/banner5.webp';

type BannerProps = {
  height?: number;
  autoplay?: boolean;
};

const banners = [banner1, banner2, banner3];

const Banner: React.FC<BannerProps> = ({ height = 400, autoplay = true }) => {
  return (
    <div className="w-full h-full">
      <Carousel autoplay={autoplay} dots arrows>
        {banners.map((src, idx) => (
          <div key={idx}>
            <Image
              src={src}
              alt={`banner-${idx + 1}`}
              preview={false}
              height={330}
              width="100%"
              style={{ objectFit: 'cover', borderRadius: 8 }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
