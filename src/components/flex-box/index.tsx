import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import './index.scss'

const FlexBox = (props: any) => {
  // flex1计算：
  // left 元素的初始大小是 50px（flex-basis: 50px）。right 元素的初始大小是 200px（flex-basis: 200px）
  // 剩余空间是 300px - 250px = 50px
  // 剩余的 50px 将按 flex-grow 的比例分配：left 元素将得到 (1/3) * 50px ≈ 16.67px。right 元素将得到 (2/3) * 50px ≈ 33.33px
  
  return (
    <div>
      <div className='flex-container'>
        <div className='left1'>left</div>
        <div className='right1'>right</div>
      </div>

      <div className='flex-container'>
        <div className='left2'>left</div>
        <div className='right2'>right</div>
      </div>
    </div>
  )
}

export default FlexBox
