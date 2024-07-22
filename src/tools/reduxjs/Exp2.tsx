import { useEffect, useState, useMemo } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { Store } from './store/index'
import { incremented, decremented, updateValue } from './store/counterReducer2'
import type { RootState } from './store/index'

function Exp1() {
  const [count, setCount] = useState(0)
  const [article, setArticle] = useState<any>(null)

  const dispatch = useDispatch()

  const storeCount = useSelector((state: RootState) => {
    console.log('>>>useSelector', state)
    return state.counterReducer2.value
  })

  const hanldeIncrement = ()=> {
    setCount(count + 1)
    dispatch(incremented())
  }

  const hanldeDecrement = ()=> {
    setCount(count - 1)
    dispatch(decremented())
  }
  const hanldeUpdate = (e: React.ChangeEvent<HTMLInputElement>)=> {
    let value = parseInt(e.target.value)
    dispatch(updateValue(value))
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>)=> {
    let value = parseInt(e.target.value)
    dispatch(updateValue(isNaN(value) ? 0:value))
  }

  return (
    
      <div>
        <button onClick={hanldeIncrement}>+</button>
        <button onClick={hanldeDecrement}>-</button>
        <input type='number' value={storeCount} onInput={hanldeUpdate} onBlur={handleBlur} />
        <div>self state: {count}</div>
        <div>store state: {storeCount || 0}</div>
      </div>
  
  )
}

export default Exp1
