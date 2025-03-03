import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import styles from './style/tabs.module.less'

export const Tabs = (props: any) => {
  const [activeTab, setActiveTab] = useState<HTMLElement|null>(null)
  const tabsList = [{
    text: "tab1"
  },
  {
    text: "tab2"
  },
  {
    text: "tab3"
  }]
  const handleClick = ()=> {
    console.log("activeTab", activeTab?.offsetLeft)
  }
  return (
    <>
    <div className={styles.nav}>
      <div className={styles['nav-wrap']}>
        {
          tabsList.map(item=> {
            return (
              <div className={styles['nav-item']} key={item.text} ref={ref=> {
                setActiveTab(ref);
              }} onClick={handleClick}>{item.text}</div>
            )
          })
        }
       
      </div>
     
    </div>
    </>
  )
}
