import { useState, useReducer } from "react"
import { reducer } from "./reducer"

const getInitialState = (length: number) => {
  let data = []
  for (let i = 0; i < length; i++) {
    data.push({ id: i, text: `#todo ${i}` })
  }
  return data
}

export const Exp1 = () => {
  const [todos, dispatch] = useReducer(reducer, 10, getInitialState)
  const [text, setText] = useState('')
  const handleAdd = () => {
    dispatch({ type: 'add', text: text })
    setText('')
  }
  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>add</button>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch({ type: 'delete', id: todo.id })}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}