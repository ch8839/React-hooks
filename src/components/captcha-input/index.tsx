import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import './index.scss'

interface ICaptchaInputProps {
  value?: string
  length?: number
  autoFocus?: boolean
  onChange?: Function
}

const CaptchaInput = (props: ICaptchaInputProps) => {
  const length = props.length || 5
  const [inputValue, setInputValue] = useState('')
  const [focusStatus, setFocusStatus] = useState(props.autoFocus)
  // const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const formatInputValue = useCallback((str: string, cb?: Function)=> {
    let formatValue = str.replace(/[^0-9]/g, '').slice(0, length)
    setInputValue(value => {
      cb && cb(formatValue)
      return formatValue
    })
  }, [props.value, length])

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current && inputRef.current.focus()
    }
  }, [])

  useEffect(()=> {
    formatInputValue(props.value || '')
  }, [formatInputValue])

  const codeArray = useMemo(() => {
    return Array(length)
      .fill('')
      .map((item, index) => inputValue[index] || '')
  }, [inputValue, length])
  console.log('>>>codeArray', codeArray)

  const activeIndex = useMemo(() => {
    if (!codeArray[0]) return 0
    // if (codeArray[codeArray.length - 1]) return codeArray.length - 1
    for (let i = 0; i < codeArray.length; i++) {
      if (codeArray[i - 1] && !codeArray[i]) return i
    }
  }, [codeArray])

  const captchaItemStyle = useMemo(()=> {
    return {
      marginLeft: (50/length) + 'px'
    }
  }, [length])

  const handleFocus = (e: any) => {
    console.log('>>>focus')
    e.preventDefault()
    inputRef.current && inputRef.current.focus()
    setFocusStatus(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formatInputValue(e.target.value, (data)=> props.onChange && props.onChange(data))
    
  }

  return (
    <div className='captchaInput-container' onClick={handleFocus}>
      <div className='captcha-list'>
        {codeArray.map((code, index) => {
          return (
            <div
              style={captchaItemStyle}
              className={`captcha-item ${
                index == activeIndex && focusStatus ? 'captcha-item-active' : ''
              }`}
              key={index}
            >
              <span>{code}</span>
            </div>
          )
        })}
      </div>
      <div>
        <input
          className='input-container'
          ref={inputRef}
          value={inputValue}
          onBlur={()=> setFocusStatus(false)}
          onFocus={()=> setFocusStatus(true)}
          onChange={handleInputChange}
        ></input>
        <p>{inputValue}</p>
      </div>
    </div>
  )
}

export default CaptchaInput
