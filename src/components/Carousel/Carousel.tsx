import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css'; // 引入样式文件

const Carousel = ({ children, style }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const length = children.length;
  const timeoutRef = useRef<any>(null);

  // 设置轮播定时器
  useEffect(() => {
    resetTimeout();
    // timeoutRef.current = setTimeout(() => setActiveIndex((activeIndex + 1) % length), 3000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [activeIndex]);

  const resetTimeout = () => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  // 切换轮播图
  const handleNav = (newIndex: number) => {
    resetTimeout();
    setActiveIndex(newIndex);
  }

  return (
    <div className="carousel-container" style={{...style}}>
      <div className="carousel-wrapper" style={{ transform: `translate(-${activeIndex * 100}%)` }}>
        {children}
      </div>
      <div className="carousel-nav">
        {Array.from({ length }).map((_, index) => (
          <button key={index} onClick={() => handleNav(index)} className={index === activeIndex ? 'active' : ''}>
            
          </button>
        ))}
      </div>
      <button className="carousel-button carousel-button-prev" onClick={() => handleNav((activeIndex - 1 + length) % length)}>Prev</button>
      <button className="carousel-button carousel-button-next" onClick={() => handleNav((activeIndex + 1) % length)}>Next</button>
    </div>
  );
};

export default Carousel;
