import { memo, useEffect, useState } from 'react'

interface ITodoItem {
  name: string
  age: number
}

interface ITodoItemProps {
  dataItem: ITodoItem
  id: number
  onChange?: Function
}

const TodoList = memo(() => {
  const [count, setCount] = useState(0)
  const [list, setList] = useState<any>([])

  useEffect(() => {
    for (let i of Array(3)) {
      // 循环
      setList((list: any) => {
        const itemData: ITodoItem = {
          name: 'xx',
          age: 2,
        }
        return list.concat(itemData)
      })
    }
  }, [])

  const handleClick = () => {
    setCount(count + 1)
  }

  const add = () => {
    setList(
      list.concat({
        name: 'xx',
        age: 2,
      })
    )
  }

  return (
    <div>
      <button onClick={handleClick}>add count</button>
      <button onClick={add}>add TodoList</button>
      <button>remove</button>
      <button>add</button>
      <div>
        {list.map((item: ITodoItem, index: number) => {
          return <TodoItem dataItem={item} id={index} key={index}></TodoItem>
        })}
      </div>
      <h2>memo</h2>
      <div>
        {list.map((item: ITodoItem, index: number) => {
          return (
            <TodoItemMemo dataItem={item} id={index} key={index}></TodoItemMemo>
          )
        })}
      </div>
    </div>
  )
})

// 每次父组件重新渲染时for循环中的TodoItem都会重新渲染，影响性能开销
const TodoItem = (props: ITodoItemProps) => {
  console.log('>>>TodoItem render', props)

  const dataItem = props.dataItem || {}

  return (
    <div>
      <p>name: {dataItem.name}</p>
      <p>age: {dataItem.age}</p>
    </div>
  )
}

// props不变的情况下，父组件重新渲染时for循环中的TodoItemMemo不会重新渲染
const TodoItemMemo = memo((props: ITodoItemProps) => {
  console.log('>>>TodoItemMemo render', props)

  const dataItem = props.dataItem || {}

  return (
    <div>
      <p>id: {props.id + 1}</p>
      <p>name: {dataItem.name}</p>
      <p>age: {dataItem.age}</p>
    </div>
  )
})

export default TodoList
