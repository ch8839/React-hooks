import React, { useRef } from 'react'

const Exp1 = ()=> {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = ()=> {
    inputRef.current && inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef}></input>
      <button onClick={handleClick}>focus</button>
    </div>
  )
}

export default Exp1
