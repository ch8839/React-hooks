import { memo, useEffect, useState } from 'react'
import Exp1 from './exp1'
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

  const handleChange = (id: number, dataItem: ITodoItem) => {
    console.log('>>>handleChange', id, dataItem)
    const newList = list.map((item: ITodoItem, index: number) => {
      if (id === index) {
        return dataItem
      } else {
        return item
      }
    })

    console.log('>>>newList', newList)
    setList(newList)
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
            <TodoItemMemo
              dataItem={item}
              id={index}
              key={index}
              onChange={handleChange}
            ></TodoItemMemo>
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

  const handleAdd = () => {
    props.onChange &&
      props.onChange(
        props.id,
        Object.assign(dataItem, { age: dataItem.age + 1 })
      )
  }

  const handleReduce = () => {
    props.onChange &&
      props.onChange(
        props.id,
        Object.assign(dataItem, {
          age: dataItem.age > 0 ? dataItem.age - 1 : 0,
        })
      )
  }

  return (
    <div>
      <p>id: {props.id + 1}</p>
      <p>name: {dataItem.name}</p>
      <p>age: {dataItem.age}</p>
      <button onClick={handleReduce}>-</button>
      <button onClick={handleAdd}>+</button>
    </div>
  )
})

export default TodoList
