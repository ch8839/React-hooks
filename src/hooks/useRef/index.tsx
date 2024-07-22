import { useEffect, useState, useRef } from 'react'
import Exp1 from './exp1'
import Exp2 from './exp2'
import Exp3 from './exp3'

/**
  通过使用 ref，你可以确保：

  你可以在重新渲染之间 存储信息（不像是普通对象，每次渲染都会重置）。
  改变它 不会触发重新渲染（不像是 state 变量，会触发重新渲染）。
  对于你的组件的每个副本来说，这些信息都是本地的（不像是外面的变量，是共享的）。
 */
const Intro = () => {
  let ref = useRef(0)
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    console.log('>>>useEffect')
  }, [flag])
  function handleClick() {
    // 修改 ref.current 不会触发重新渲染
    ref.current = ref.current + 1
    // setFlag(!flag) // 强制刷新
    console.log('You clicked ' + ref.current + ' times!')
  }
  console.log('Intro render')
  return <button onClick={handleClick}>Click me!{ref.current}</button>
}

function UseEffectExp() {
  return (
    <div>
      <h2>Intro</h2>
      <Intro></Intro>

      <h2>Exp1</h2>
      <Exp1></Exp1>

      <h2>Exp2</h2>
      <Exp2></Exp2>

      <h2>Exp3</h2>
      <Exp3></Exp3>
    </div>
  )
}

export default UseEffectExp
