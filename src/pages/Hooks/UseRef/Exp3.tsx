import { useState, useRef } from "react";
import { flushSync } from "react-dom";

export const TodoList = () => {
  const listRef = useRef<any>(null);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText("");
    setTodos([...todos, newTodo]);
    // setTodos 不会立即更新 DOM，所以不会滚动到新添加的事项
    listRef.current?.lastChild?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  function handleAddSync() {
    const newTodo = { id: nextId++, text: text };
    setText("");
    // 指示 React 当封装在 flushSync 中的代码执行后，立即同步更新 DOM
    flushSync(() => setTodos([...todos, newTodo]));
    listRef.current?.lastChild?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    <>
      <button onClick={handleAdd}>添加</button>
      <button onClick={handleAddSync}>同步更新添加</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ul ref={listRef} style={{ height: "300px", overflow: "auto" }}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
};

let nextId = 0;
let initialTodos: Array<{ id: number; text: string }> = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: "待办 #" + (i + 1),
  });
}
