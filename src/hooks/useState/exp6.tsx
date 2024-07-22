import React, { useState, useEffect, useCallback } from 'react'


const Exp6 = () => {
  return (
    <div>
     <Item></Item>
     
    </div>
  )
}

const DEFAULT_OBJECT = Object.freeze({count: 6})

const Item = (props: any)=>{
  const data = props.data || {count: 1}
  const data_freeze =  props.data || DEFAULT_OBJECT
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // 如果data默认兜底是个自定义对象，每次组件重新渲染时都会创建一个新的对象，导致data变更，触发useState
    console.log('data', data)
  }, [data])

  useEffect(() => {
    // 外层创建一个默认自定义对象，，每次组件重新渲染时都复用这个对象，不会重新创建
    console.log('data_freeze', data_freeze)
  }, [data_freeze])

  useEffect(() => {
    window.onerror = (message, source, lineno, colno, error)=> {
      console.log('捕捉到错误:', message,);
    }
    window.onunhandledrejection = function (event) {
      // 这里可以处理错误并上报
      console.error('捕捉到未处理的Promise拒绝:', event.reason);
    };
  })

  const handleClick = useCallback(() => {
    setIsEditing(val =>!val)
    // new Promise((resolve, reject)=> {
    //   reject(new Error('hh'))
    // })
    // try {
    //   a = a+1
    // }catch(e) {
    //   console.log('e', e)
    //   throw e
    // }
  }, [])

 
  return(
    <div>
      {data?.count}
      <button onClick={handleClick}>click</button>
    </div>
  )
}




export default Exp6
