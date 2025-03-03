import React, { useEffect, useState } from 'react'

const CssModule = (props: any) => {
  const [styles, setStyles] = useState<any>(null)
  useEffect(()=> {
    import("./index.module.less").then(module => {
      console.log('>>>module.default', module.default)
      setStyles(module.default)
    })
  }, [])
  if (!styles) return null; // 样式未加载前不渲染

  return (
    <div className={styles.container}>
      <div className={styles["header"]}><span>Header</span></div>
      <div className={styles["content"]}>Content</div>
      <div className={styles["footer"]}>Footer</div>
    </div>
  )
}
export default CssModule