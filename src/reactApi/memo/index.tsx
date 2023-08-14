import { memo, useEffect, useState } from 'react'
import Exp1 from './exp1'
import Exp2 from './exp2'
import Exp3 from './exp3'

const TodoList = () => {
  return (
    <div>
      <h2>Exp1</h2>
      {/* <Exp1></Exp1> */}
      <h2>Exp2</h2>
      <Exp2></Exp2>

      <h2>Exp3</h2>
      <Exp3></Exp3>
    </div>
  )
}

export default TodoList
