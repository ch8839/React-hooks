import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'

import Carousel from './Carousel'

const imageSrc = [
  {
    key: 1,
    color: '#3578e5',
  },
  {
    key: 2,
    color: '#54c7ec',
  },
  {
    key: 3,
    color: '#ffba00',
  },
  {
    key: 4,
    color: '#fa383e',
  },
  {
    key: 5,
    color: '#00a400',
  },
]

const CarouselDemo = () => {
  return (
    <Carousel style={{ width: 600, height: 240 }}>
      {imageSrc.slice(0, -2).map((item, index) => (
        <div key={index} style={{ width: '100%' }}>
          <div
            style={{ width: '100%', height: '100%', background: item.color }}
          >
            {item.key}
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselDemo
