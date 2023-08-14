import React, { useState } from 'react'

const Exp1 = () => {
  const [items, setItems] = useState([
    { id: '001', name: 'Item 1' },
    { id: '002', name: 'Item 2' },
    { id: '008', name: 'Item 3' }
  ])

  // 不要直接修改原数组：在 React 中，应该避免直接修改原数组，因为这会破坏 React 的状态更新机制。
  // 如果你需要修改数组中的某个元素，应该先创建一个新的数组，然后将修改后的元素插入到新数组中，最后使用 useState 更新状态。
  const updateItem1 = (id: string, newName: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName }
      } else {
        return item
      }
    })
    setItems(newItems)
  }

  const updateItem2 = (id: string, newName: string) => {
    const index = items.findIndex((item) => item.id === id)
    items[index].name = newName
    const newItems = [
      ...items.slice(0, index),
      { ...items[index], name: newName },
      ...items.slice(index + 1),
    ]
    setItems(newItems)
  }

  return (
    <div>
     <ul>
      {items.map((item, index) => 
         <li key={item.id}>
          <Item index={index} data={item} onChange={updateItem2}></Item>
         </li>
      )}
     
     </ul>
     
    </div>
  )
}

const Item = (props: any)=>{
  const item = props.data || {}
  const [isEditing, setIsEditing] = useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=> {
    props.onChange(item.id, e.target.value)
  }

  let itemContent
  if(isEditing) {
    itemContent = (
      <>
        <input value={item.name} onInput={handleInput} onBlur={()=> setIsEditing(false)} autoFocus></input>
      </>
    )
  }else {
    itemContent = (
      <>
        <span onClick={()=> setIsEditing(true)}>{item.name}</span>
      </>
    )
  }
  return(
    <div>
      No.<span>{item.id}:  </span>
      {itemContent}
    </div>
  )
}




export default Exp1
