import { useEffect, useState } from 'react'

import Exp1 from './exp1'
import Exp2 from './exp2'
import Exp3 from './exp3'
import Exp4 from './exp4'

const UseEffectIntro = () => {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(10)

  const [time, setTime] = useState(1)

  /**
   首次添加到 DOM 之前，React 将运行 setup 函数
   每次依赖项变更重新渲染后，React 将首先使用旧值（旧的 props 和 state ）运行 cleanup 函数
   再使用新的 props 和 state 运行 setup 代码。
   在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数
   */
  useEffect(() => {
    console.log('>>>useEffect run, count:', count, 'page:', page)

    return () => {
      console.log('>>>useEffect return, count:', count, 'page:', page)
    }
  }, [count, page])


  // useEffect(() => {
  //   setInterval(() => setTime(time => time + 1), 1000)
  // }, [])

 

  const handleClick = () => {
    setCount(count + 1)
    setPage(page + 10)
    // setTimeout(() => setCount(count + 1), 500)
    // setTimeout(() => setPage(page + 10), 1000)
  }
  console.log('>>>UseEffectIntro render')
  return (
    <>
      <button onClick={handleClick}>
        {count}-{page}
      </button>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setPage(page + 1)}>{page}</button>
      <div>time: {time}</div>
    </>
  )
}

function UseEffectExp() {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <h2>Intro</h2>
      <button onClick={() => setVisible(!visible)}>toggle</button>
      {visible && <UseEffectIntro></UseEffectIntro>}

      {/* <h2>频繁请求处理</h2>
      <Exp1></Exp1>

      <h2>动画实现</h2>
      <Exp2></Exp2>

      <h2>自定义hooks</h2>
      <Exp3></Exp3>

      <h2>useQuery</h2>
      <Exp4></Exp4> */}
    </div>
  )
}

export default UseEffectExp
