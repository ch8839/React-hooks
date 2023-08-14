import { useEffect, useState, useRef } from 'react'

function Exp3_1() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleMove = (e: PointerEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    window.addEventListener('pointermove', handleMove)
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [])
  return (
    <div>
      <span>
        x: {position.x}, y: {position.y}
      </span>
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          position: 'absolute',
          background: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      ></div>
    </div>
  )
}

const usePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleMove = (e: PointerEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    window.addEventListener('pointermove', handleMove)
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [])

  return position
}

const useWindowListener = (eventType: string, listener: any)=> {
  useEffect(()=> {
    window.addEventListener(eventType, listener)
    return () => {
      window.removeEventListener(eventType, listener)
    }
  }, [])
}

function Exp3() {
  const position = usePosition()
  return (
    <div>
      <span>
        x: {position.x}, y: {position.y}
      </span>
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          position: 'absolute',
          background: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      ></div>
    </div>
  )
}

export default Exp3
