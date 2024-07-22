import React, { useState, useEffect, useRef } from 'react'
import './Carousel.css'

const Carousel = ({ children, style, autoPlay }) => {
  const [activeIndex, setActiveIndex] = useState(1)
  const length = children.length

  const timeoutRef = useRef<any>(null)
  const transitionStopRef = useRef(false)

  useEffect(() => {
    resetTimeout()
    if (autoPlay) {
      const index = (activeIndex + 1) % (length + 2)
      console.log('index', index)
      timeoutRef.current = setTimeout(() => setActiveIndex(index), 3000)
    }
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [activeIndex])

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleNav = (type: string) => {
    resetTimeout()
    transitionStopRef.current = false
    const newIndex =
      type == 'next'
        ? (activeIndex + 1) % (length + 2)
        : (activeIndex - 1) % (length + 2)
    console.log('>>newIndex', newIndex)
    setActiveIndex(newIndex)
  }

  const handleToIndex = (newIndex: number)=> {
    setActiveIndex(newIndex)
  }

  const handleTransitionEnd = () => {
    if (activeIndex === 0) {
      setTimeout(() => {
        transitionStopRef.current = true
        setActiveIndex(length)
      }, 600)
    } else if (activeIndex === length + 1) {
      setTimeout(() => {
        transitionStopRef.current = true
        setActiveIndex(1)
      }, 600)
    }
  }

  return (
    <div
      className='carousel-container'
      style={{ ...style }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className='carousel-wrapper'
        style={{
          transform: `translate(-${activeIndex * 100}%)`,
          transition: transitionStopRef.current ? 'none' : '',
        }}
      >
        {[children[length - 1], ...children, children[0]].map((item, index) => {
          return (
            <div key={index} style={{ width: '100%', height: '100%' }}>
              {item}
            </div>
          )
        })}
      </div>
      <div className='carousel-nav'>
        {Array.from({ length }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleToIndex(index+1)}
            className={index + 1 === activeIndex ? 'active' : ''}
          ></button>
        ))}
      </div>
      <button
        className='carousel-button carousel-button-prev'
        onClick={() => handleNav('prev')}
      >
        Prev
      </button>
      <button
        className='carousel-button carousel-button-next'
        onClick={() => handleNav('next')}
      >
        Next
      </button>
    </div>
  )
}

export default Carousel
