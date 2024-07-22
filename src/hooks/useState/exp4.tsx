import React, { useState, useCallback } from 'react'

const Exp4 = () => {
  const initFormData = () => {
    return {
      name: '',
      age: ''
    }
  }
  const [formData, setFormData] = useState(initFormData)
  const [formData2, setFormData2] = useState(initFormData)

  const request = (data: any, delay = 0): any => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, delay)
    })
  }

  const handleClick = useCallback(() => {
    getName()
    getAge()
  }, [])

  /*
    它们都是基于同一渲染周期的状态，它们闭包中的formData都是同一个引用，即它们看到的formData都是点击按钮时刻的formData状态
  */
  const getName = useCallback(async () => {
    const name = await request('Tom', 1000)
    console.log('>>>formData1', formData)
    setFormData({
      ...formData,
      name,
    })
  }, [formData])

  const getAge = useCallback(async () => {
    const age = await request(18, 500)
    console.log('>>>formData2', formData)
    setFormData({
      ...formData,
      age,
    })
  }, [formData])

  const handleClick2 = useCallback(() => {
    getName2()
    getAge2()
  }, [])

  // 使用函数式更新setFormData，确保每次更新都基于最新的状态，而不是闭包中的旧状态
  const getName2 = useCallback(async () => {
    const name = await request('Tom', 1000)
    console.log('>>>formData1', formData2)
    setFormData2((formData) => {
      return {
        ...formData,
        name,
      }
    })
  }, [formData2])

  const getAge2 = useCallback(async () => {
    const age = await request(18, 500)
    console.log('>>>formData2', formData2)
    setFormData2((formData) => {
      return {
        ...formData,
        age,
      }
    })
  }, [formData2])

  return (
    <div>
      <button onClick={handleClick}>request</button>
      <p>
        My name is {formData.name}, age: {formData.age}
      </p>

      <button onClick={handleClick2}>request</button>
      <p>
        My name is {formData2.name}, age: {formData2.age}
      </p>
    </div>
  )
}

export default Exp4
