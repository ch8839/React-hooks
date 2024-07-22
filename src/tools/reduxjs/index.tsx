import { useEffect, useState, useMemo } from 'react'
import { Store } from './store/index'
import { incremented, decremented } from './store/counterReducer'

function Exp1() {
  const [count, setCount] = useState(0)
  const [storeCount, setStoreCount] = useState(0)
  const [article, setArticle] = useState<any>(null)

  useEffect(() => {
    // 只有包裹在Store.subscribe才能订阅到数据的更新
    const unsubscribe = Store.subscribe(() => {
      // 如果只有一个Reducer则直接Store.getState()就能取到对应的state
      const state = Store.getState().counterReducer
      console.log('>>>state:', state)
      setStoreCount(state.value)
    })

    return ()=> unsubscribe()
  }, [Store])
  // const storeState = useMemo(()=> {
    
  //   return Store.getState()
  // }, [Store])

  const hanldeIncrement = ()=> {
    setCount(count + 1)
    Store.dispatch(incremented())
  }

  const hanldeDecrement = ()=> {
    setCount(count - 1)
    Store.dispatch(decremented())
  }


  return (
    <div>
      <button onClick={hanldeIncrement}>+</button>
      <button onClick={hanldeDecrement}>-</button>
      <div>self state: {count}</div>
      <div>store state: {storeCount}</div>
    </div>
  )
}

export default Exp1
