import React, { useRef, useState } from 'react'

let globalCount = 0


const Exp3 = ()=> {
  /**
    你可以在重新渲染之间 存储信息（不像是普通对象，每次渲染都会重置）。
    改变它 不会触发重新渲染（不像是 state 变量，会触发重新渲染）。
    对于你的组件的每个副本来说，这些信息都是本地的（不像是外面的变量，是共享的）。
   */
  const count = useRef<number>(0)

  const [checked, setChecked] = useState(false)

  const handleClick = ()=> {
    // 改变 ref 不会触发重新渲染，但是
    // 所以可以改变它的 current 属性来存储信息，并在之后读取它
    // 在setChecked触发重新渲染后，count.current也被渲染成最新的值
    count.current++

    // 效果差不多,但是是全局共享的，而且被其它模块修改
    globalCount++
  }

  return (
    <div>
      <button onClick={handleClick}>add</button>
      <div>count.current: {count.current}</div>
      <div>globalCount: {globalCount}</div>
      <input type='checkbox' checked={checked} onChange={(e)=> setChecked(e.target.checked)}></input>
      
    </div>
  )
}

export default Exp3
