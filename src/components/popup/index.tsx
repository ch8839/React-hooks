import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import './index.scss'

const Popup = (props: any) => {
  const handleChange = (value: string) => {
    console.log('value:', value)
  }

  return (
    <div className='popup-container'>
      <div className='container1'>
        <p>
          哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
        </p>
        <div className='container2'>
          <p>
            牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼
          </p>
          <p>
            牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼
          </p>
          <p>
            牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼
          </p>
          <p>
            牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼牛逼
          </p>
        </div>
        <div className='flex-container'>
          <div className='left'>left</div>
          <div className='right'>right</div>
        </div>
      </div>
    </div>
  )
}

export default Popup
