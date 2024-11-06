import { useState, useEffect, useCallback} from 'react'

export const Exp1 = ()=> {
  const [count, setCount] = useState(0)
  
  // count输出0，因为handleAsyncAdd 的闭包捕获了初始值 0
  const handleAsyncCount = useCallback(async()=> {
    const request = ()=> new Promise(resolve => setTimeout(resolve, 1000))
    await request()
    console.log('>>>handleAsyncAdd', count) // 0
  }, [count])

  // 调用 setCount，以 prev 的方式访问最新的 count
  const handleAsyncCount2 = useCallback(async()=> {
    const request = ()=> new Promise(resolve => setTimeout(resolve, 1000))
    await request()
    setCount(prev => {
      console.log('>>>handleAsyncAdd2', prev) // 2
      return prev
    })
   
  }, [])

  useEffect(()=> {
    setCount(1)
    setCount(prev => {
      console.log('prev1:', prev) // 1
      return prev+1
    })
    console.log('>>useEffect', count) // 0
    handleAsyncCount()
    handleAsyncCount2()

  }, [])
  return (
    <div className="PageLayout">
      {count}
    </div>
  )
}