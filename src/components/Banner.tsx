import { Carousel } from 'antd'
import React from 'react'

export interface BannerItem {
  url: string
  title: string
  description: string
}

interface BannerProps {
  items?: BannerItem[]
  height?: number | string
  autoplay?: boolean
  effect?: 'scrollx' | 'fade'
  className?: string
}

const defaultBannerItems: BannerItem[] = [
  {
    url: 'https://bizweb.dktcdn.net/100/011/344/themes/958827/assets/section_hot_banner_2_1.jpg?1765131539790',
    title: 'Whey Protein Premium',
    description: 'Bổ sung protein chất lượng cao cho cơ bắp',
  },
  {
    url: 'https://bizweb.dktcdn.net/100/011/344/themes/958827/assets/section_hot_banner_3_1.jpg?1765131539790',
    title: 'BCAA & EAA',
    description: 'Hỗ trợ phục hồi và phát triển cơ bắp',
  },
  {
    url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=600&fit=crop',
    title: 'Creatine Monohydrate',
    description: 'Tăng sức mạnh và hiệu suất tập luyện',
  },
  {
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&h=600&fit=crop',
    title: 'Mass Gainer',
    description: 'Tăng cân lành mạnh cho người tập gym',
  },
]

const Banner: React.FC<BannerProps> = ({
  items = defaultBannerItems,
  height = 500,
  autoplay = true,
  effect = 'fade',
  className = '',
}) => {
  const contentStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    color: '#fff',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  }

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
  }

  const textStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    padding: '0 20px',
  }

  return (
    <Carousel
      autoplay={autoplay}
      effect={effect}
      className={`mb-8 ${className}`}
      arrows
      autoplaySpeed={3000}
      dots
    >
      {items.map((item, index) => (
        <div key={index}>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(${item.url})`,
            }}
          >
            <div style={overlayStyle}></div>
            <div style={textStyle}>
              <h2
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  fontSize: '1.5rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default Banner

