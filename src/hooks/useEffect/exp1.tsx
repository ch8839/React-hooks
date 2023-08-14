import { useEffect, useState } from 'react'

function Exp1() {
  const [count, setCount] = useState(0)
  const [article, setArticle] = useState<any>(null)

  const fetchArticle = (id?: any) =>
    new Promise((reoslve) => {
      setTimeout(() => {
        reoslve('hh')
      }, 1000)
    })

  useEffect(() => {
    // 定义一个取消标识
    let didCancel = false
    console.log('>>>didCancel', count, didCancel)
    async function fetchData() {
      const article = await fetchArticle()
      console.log('>>>fetch', count, didCancel)
      // 由于下一次effect触发会把执行上一次的return，所以上一次请求过程中的didCancel标识在触发下一次请求时会被置为true。所以不执行setData操作
      if (!didCancel) {
        setArticle(article)
      }
    }

    fetchData()

    // 在下一次effect触发时会执行return
    return () => {
      console.log('>>>useEffect return')
      didCancel = true
    }
  }, [count])

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

export default Exp1
