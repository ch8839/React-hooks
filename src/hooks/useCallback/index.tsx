import React, { useState, useEffect, useMemo, useCallback } from 'react'

const Exp1 = () => {
  const [count, setCount] = useState<number>(0)

  const handleChildren = () => {
    console.log('clicked ChildrenComponent')
  }

  // 缓存函数，在依赖参数不变的情况下，返回的回调函数是同一个引用地址，
	// 即使组件重新渲染也是同一个函数，传到子组件是memo会认为props没改变从而不会重新渲染
  const handleChildrenCallback = useCallback(() => {
    console.log('clicked ChildrenComponent')
  }, []) // 如果没有依赖项数组，每一次都返回一个新函数，从而每次都是新函数

  const handleParent = () => {
    console.log('clicked ParentComponent')
    setCount(count + 1)
  }

  console.log('ParentComponent rending')
  return (
    <div>
      <button onClick={handleParent}>add </button>
      <ChildrenComponent handleChildren={handleChildren} />
      <CallbackChildrenComponent handleChildren={handleChildrenCallback} />
			{/* 只要携带了count，无论子组件是否使用每次count改变都会重新渲染
			vue则不会，vue子组件只会在porps更新且使用到了props才会重新渲染 */}
      <CallbackChildrenComponent count={count} handleChildren={handleChildrenCallback} />

      {/* <CallbackChildrenComponent2 handleChildren={handleChildrenCallback} /> */}
    </div>
  )
}

const ChildrenComponent = (props: any) => {
  const { handleChildren } = props
  console.log('ChildrenComponent rending') // 父组件重新render时会触发子组件渲染
  return <div onClick={handleChildren}>ChildrenComponent </div>
}

//  React.memo相当于PureComponent
const CallbackChildrenComponent = React.memo((props: any) => {
  const { handleChildren } = props
  console.log('CallbackChildrenComponent rending', props.count) // 父组件重新render时不会触发子组件渲染
  return <div onClick={handleChildren}>CallbackChildrenComponent</div>
})

//  React.memo相当于PureComponent
const CallbackChildrenComponent2 = React.memo((props: any) => {
  const { handleChildren } = props
  const [count, setCount] = useState<number>(1)

  const handleClick = () => {
    setCount(count + 1)
    handleChildren()
  }
  console.log('CallbackChildrenComponent2 rending') // 父组件重新render时不会触发子组件渲染
  return <button onClick={handleClick}>add {count}</button>
})

const Exp2 = () => {
  const [count, setCount] = useState<number>(1)

  const handleClick = () => {
    setCount(count + 1)
  }

	
  const getCountDouble = useCallback(() => {
    console.log('>>>getCountDouble', count)
    return count * 2
  }, [count])

	useEffect(()=> {
		// getCountDouble不加useCallback的话每次组件渲染都会执行useEffect
		console.log('>>>useEffect')
		getCountDouble()
	}, [getCountDouble])

  return (
    <div>
      <button onClick={handleClick}>add-{count}</button>
      <button onClick={getCountDouble}>getCountDouble</button>
    </div>
  )
}

const useMyCallback = (fn: Function, dependencies: Array<any>) => {
	return useMemo(() => fn,  dependencies)
}

function useCallbackHook() {
  return (
    <div>
      <h2>Exp1</h2>
      <Exp1></Exp1>
      <h2>Exp2</h2>
      <Exp2></Exp2>
    </div>
  )
}

export default useCallbackHook
