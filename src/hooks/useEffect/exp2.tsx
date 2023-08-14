import { useEffect, useState, useRef } from 'react'
import { FadeInAnimation } from './animation'

const Welcome = () => {
  const ref = useRef(null)
  const [show, setShow] = useState(true)
  let animation: any

  useEffect(() => {
    animation = new FadeInAnimation(ref.current)
    animation.start(1000)
    return () => {
      animation.stop()
    }
  }, [])

  const handleClick = () => {
    animation = new FadeInAnimation(ref.current)

    if (show) {
      animation.stop()
    } else {
      animation.start(1000)
    }
    setShow(!show)
  }

  return (
    <>
      <button onClick={() => handleClick()}>{show ? 'Remove' : 'Show'}</button>
      <h1
        ref={ref}
        style={{
          opacity: 0,
          color: 'white',
          padding: 50,
          textAlign: 'center',
          fontSize: 50,
          backgroundImage:
            'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
        }}
      >
        Welcome
      </h1>
    </>
  )
}

function Exp2() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? 'Remove' : 'Show'}</button>
      <hr />
      {show && <Welcome />}
    </>
  )
}

export default Exp2
