import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'

import CaptchaInput from './index'

export const CaptchaInputExp = (props: any)=> {
  const handleChange = (value: string)=> {
    console.log('value:', value)
  }
  return (
    <div className='captchaInput-exp'>
      <CaptchaInput value='' length={5} autoFocus={true} onChange={handleChange}></CaptchaInput>
    </div>
  )
}