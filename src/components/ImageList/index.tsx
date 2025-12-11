import React from 'react'
import ImageList from './ImageList'

export const ImageListDemo: React.FC = () => {
  // 示例数据
  const sampleImages = [
    {
      id: '1',
      src: 'https://picsum.photos/300/200?random=1',
      alt: '美丽风景 1',
      backgroundSrc: 'https://picsum.photos/1920/1080?random=11'
    },
    {
      id: '2',
      src: 'https://picsum.photos/300/200?random=2',
      alt: '美丽风景 2',
      backgroundSrc: 'https://picsum.photos/1920/1080?random=12'
    },
    {
      id: '3',
      src: 'https://picsum.photos/300/200?random=3',
      alt: '美丽风景 3',
      backgroundSrc: 'https://picsum.photos/1920/1080?random=13'
    },
    {
      id: '4',
      src: 'https://picsum.photos/300/200?random=4',
      alt: '美丽风景 4',
      backgroundSrc: 'https://picsum.photos/1920/1080?random=14'
    },
    {
      id: '5',
      src: 'https://picsum.photos/300/200?random=5',
      alt: '美丽风景 5',
      backgroundSrc: 'https://picsum.photos/1920/1080?random=15'
    },
    {
      id: '6',
      src: 'https://picsum.photos/300/200?random=6',
      alt: '美丽风景 6',
      backgroundSrc: 'https://picsum.photos/1920/1080?random=16'
    }
  ]

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
     

      <ImageList 
        images={sampleImages}
        spacing={30}
        baseImageHeight={200}
        scaledImageHeight={280}
        transitionDuration={5000}
      />
    </div>
  )
}