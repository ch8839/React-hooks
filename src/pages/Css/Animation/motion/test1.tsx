import { useCallback } from "react"

export const MotionTest1 = ()=> {
  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event> )=> {
    const fallbackSrc = "https://loremflickr.com/320/240/cat?lock=0"
    e.currentTarget.onerror = null // 防止占位图加载失败时再次触发 onerror，避免递归循环
    e.currentTarget.src = fallbackSrc
  }, [])

  return (
    <img style={{width: "200px", height: "200px"}} src="www.123.com" alt="xx" onError={handleError}></img>
  )
}