import React, { useRef, useState, useEffect } from 'react'
import * as yodaCommon from './yoda.js'
import './index.scss'

const Exp1 = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [needVerify, setNeedVerify] = useState(false)
  const [yodaStatus, setYodaStatus] = useState('')

  const yodaSucc = (options) => {
    console.log('success')
    // setYodaStatus('success')
    setNeedVerify(false)
    setYodaStatus(JSON.stringify(options))
  }

  const yodaFail = () => {
    console.log('fail')
    setYodaStatus('fail')
    
  }
  const handleSucc = (options)=> {
    console.log('>>>options', options)
  }

  useEffect(() => {
    yodaCommon.loadSeedJs()
    window.yodaSucc = yodaSucc
    window.yodaFail = yodaFail
  }, [])

  const initYoda = () => {
    setNeedVerify(true)
    // 请求后端接口获取requestCode
    yodaCommon.getRequestCode(4, 'test', (code: any) => {
      console.log('>>>code', code)
      const options = {
        requestCode: code,
        root: 'yoda-root',
        succCallbackFun: 'yodaSucc',
        failCallbackFun: 'yodaFail',
        display: 'modal',
        font: { 
          sms: {
            titleText: '你有问题',
        		btnText: '校验' // 设置button文案
        	}
        }, 
      }
      // 注意调用前需要确保options.root dom节点存在
      window.YodaSeed(options, 'test')
    })
  }
  const handleClick = () => {
    // inputRef.current && inputRef.current.focus()
    initYoda()
  }

  return (
    <div>
      {needVerify && <div className='yoda-root' id='yoda-root'></div>}
      <button onClick={handleClick}>open</button>
      <div>{yodaStatus}</div>
    </div>
  )
}

export default Exp1
