import { useState } from 'react'
const Exp2 = () => {
  const [count, setCount] = useState(0)
  const handleClick = ()=> {
   
    // let startTime = performance.now()
    // while (performance.now() - startTime < 100) {
    //   // 500 毫秒内不执行任何操作来模拟极慢的代码
    //   console.log('runing')
    // }
    setTimeout(() => {
      console.log(count); // 0
      setCount(c => c + 1);
      setCount(c => c + 1);
      setCount(c => c + 1);
      console.log(count); // 0
    }, 1000)
  }

  return (
    <button onClick={handleClick}>click{count}</button>
  )
}

export default Exp2