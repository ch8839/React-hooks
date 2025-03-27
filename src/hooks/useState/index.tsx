import { useEffect, useState } from 'react'
import Exp1 from './exp1'
import Exp2 from './exp2'
import Exp3 from './exp3'
import Exp4 from './exp4'
import Exp5 from './exp5'
import Exp6 from './exp6'
import Exp7 from './exp7'

/**
 调用 set 函数 不会 改变已经执行的代码中当前的 state
 它只影响 下一次 渲染中 useState 返回的内容。
 

 setState的处理机制，
 对于直接传入值是使用当前的state快照直接替换
 对于传入更新函数是基于当前的state（上一次更新函数的结果）做更新操作
 */
function getFinalState(baseState: any, queue: Array<any>) {
  let finalState = baseState

  for (let update of queue) {
    if (typeof update === 'function') {
      // 调用更新函数
      finalState = update(finalState)
    } else {
      // 替换下一个 state
      finalState = update
    }
  }

  return finalState
}

function UseEffectExp() {
  return (
    <div>
      <h2>Exp1</h2>
      <Exp1></Exp1>

      <h2>Exp2</h2>
      <Exp2></Exp2>

      <h2>更新对象</h2>
      <Exp3></Exp3>

      <h2>更新时序</h2>
      <Exp4></Exp4>

      <h2>批量更新</h2>
      <Exp5></Exp5>
    
      <h2>使用技巧</h2>
      <Exp6></Exp6>

      <h2>使用技巧</h2>
      <Exp7></Exp7>
    </div>
  )
}

export default UseEffectExp
