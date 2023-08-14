import React, { useRef, forwardRef, LegacyRef } from 'react'

// 通过 forwardRef 来将其暴露给父组件
const MyInput = forwardRef((props, ref: LegacyRef<HTMLInputElement> | undefined)=> {
  return <input {...props} ref={ref}></input>
})

const Exp2 = ()=> {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = ()=> {
    inputRef.current && inputRef.current.focus()
  }
  
  return (
    <div>
      <MyInput ref={inputRef}></MyInput>
      <button onClick={handleClick}>focus myInput</button>
    </div>
  )
}

export default Exp2
