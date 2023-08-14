const Exp2 = () => {
  const handleClick = ()=> {
   
    let startTime = performance.now()
    while (performance.now() - startTime < 100) {
      // 500 毫秒内不执行任何操作来模拟极慢的代码
      console.log('runing')
    }
  }

  return (
    <button onClick={handleClick}>click</button>
  )
}

export default Exp2