import React, { useState } from 'react'
import styles from "./index.module.less"

export const CssModule = (props: any) => {
  console.log('>>>styles', styles)
  return (
    <div className={styles.container}>
      <div className={styles["header"]}><span>Header</span></div>
      <div className={styles["content"]}>Content</div>
      <div className={styles["footer"]}>Footer</div>
    </div>
  )
}
