import React, { useState } from 'react'

const Exp3 = () => {
  const [count, setCount] = useState<number>(0)

  const handleParent = () => {
    console.log('clicked ParentComponent')
    setCount(count + 1)
  }

  console.log('ParentComponent rending')

  return (
    <div>
      <button onClick={handleParent}>add </button>
      <SimpleComponent></SimpleComponent>
      <SimpleMemoComponent></SimpleMemoComponent>
    </div>
  )
}

const SimpleComponent = (props: any) => {
  console.log('SimpleComponent rending') // 父组件重新render时会触发子组件渲染
  return <div>SimpleComponent </div>
}

const SimpleMemoComponent = React.memo((props: any) => {
  console.log('SimpleMemoComponent rending') // 父组件重新render时不会触发子组件渲染
  return <div>SimpleComponent </div>
})




export default Exp3
