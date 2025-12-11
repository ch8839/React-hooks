import React, { useState, useCallback, useMemo, useRef } from 'react'
import './ImageList.css'

interface ImageItem {
  id: string
  src: string
  alt: string
  backgroundSrc: string
}

interface ImageListProps {
  images: ImageItem[]
  spacing?: number // 图片间距，默认24px
  baseImageHeight?: number // 基础图片高度，默认200px
  scaledImageHeight?: number // 放大后图片高度，默认280px
  transitionDuration?: number // 动效时长(ms)，默认400
}

const ImageList: React.FC<ImageListProps> = ({ 
  images, 
  spacing = 24, 
  baseImageHeight = 200,
  scaledImageHeight = 280,
  transitionDuration = 400
}) => {
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(images[0]?.id || null)
  const [backgroundImage, setBackgroundImage] = useState<string>(images[0]?.backgroundSrc || '')
  const prevIndexRef = useRef(0)

  // 计算固定的容器高度
  const containerHeight = useMemo(() => {
    const totalSpacing = (images.length - 1) * spacing
    const totalBaseHeight = images.length * baseImageHeight
    const extraHeight = scaledImageHeight - baseImageHeight
    return totalSpacing + totalBaseHeight + extraHeight
  }, [images.length, spacing, baseImageHeight, scaledImageHeight])

  // 计算每个图片的位置
  const getImagePosition = useCallback((index: number) => {
    const hoveredIndex = images.findIndex(img => img.id === hoveredImageId)
    const spacingOffset = index * spacing
    const baseHeightOffset = index * baseImageHeight
    
    // 如果当前图片在悬浮图片之后，需要额外偏移
    const extraOffset = hoveredIndex !== -1 && index > hoveredIndex 
      ? scaledImageHeight - baseImageHeight 
      : 0
    
    return spacingOffset + baseHeightOffset + extraOffset
  }, [hoveredImageId, images, spacing, baseImageHeight, scaledImageHeight])

  // 获取图片高度
  const getImageHeight = useCallback((imageId: string) => {
    return imageId === hoveredImageId ? scaledImageHeight : baseImageHeight
  }, [hoveredImageId, baseImageHeight, scaledImageHeight])

  const handleMouseEnter = useCallback((image: ImageItem) => {
    setHoveredImageId(image.id)
    setBackgroundImage(image.backgroundSrc)
    // prevIndexRef.current = images.findIndex(img => img.id === image.id)
  }, [])

  const containerStyle: React.CSSProperties = {
    '--transition-duration': `${transitionDuration}ms`,
    '--background-image': backgroundImage ? `url(${backgroundImage})` : 'none',
    // height: `${containerHeight}px`,
    height: '80vh',
    overflow: 'auto'
  } as React.CSSProperties

  return (
    <div 
      className="image-list-container" 
      style={containerStyle}
    >
      {/* 背景层 */}
      <div className="background-layer" />
      
      {/* 图片列表 */}
      <div className="image-list">
        {images.map((image, index) => {
          const position = getImagePosition(index)
          const height = getImageHeight(image.id)
          const isHovered = hoveredImageId === image.id
          
          return (
            <div 
              key={image.id}
              className={`image-item ${isHovered ? 'hovered' : ''}`}
              style={{
                position: 'absolute',
                top: `${position}px`,
                left: '20%',
                // transform: 'translateX(-50%)',
                height: `${height}px`,
                // width: '300px',
                // height: `${baseImageHeight}px`,
                // transform: isHovered ? `scale(1.4)` : 'scale(1)',
                // transformOrigin: 'left top',
                transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                zIndex: isHovered ? 10 : 1
              }}
              onMouseEnter={() => handleMouseEnter(image)}
            >
              <div className="image-wrapper" style={{ height: '100%' }}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageList 